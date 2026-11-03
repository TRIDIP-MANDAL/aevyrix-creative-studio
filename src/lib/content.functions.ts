import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { resolveContent } from './content-model';

export const getPublicContent = createServerFn({method:'GET'}).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
  const client = createClient<Database>(process.env['SUPABASE_URL']!,key,{
    auth:{persistSession:false,autoRefreshToken:false},
    global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(h.get('Authorization')===`Bearer ${key}`)h.delete('Authorization');h.set('apikey',key);return fetch(input,{...init,headers:h});}},
  });
  const {data,error}=await client.from('site_content').select('id,kind,key,title,description,image,category,items,published,sort_order').eq('published',true).order('sort_order');
  if(error) throw new Error('Site content could not be loaded.');
  return resolveContent(data ?? []);
});