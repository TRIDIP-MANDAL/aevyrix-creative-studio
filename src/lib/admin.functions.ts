import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { contentSchema, quotationSchema, statusSchema } from './admin-schemas';
import { z } from 'zod';

async function isAdmin(client:SupabaseClient<Database>, userId:string) {
  const {data,error}=await client.rpc('has_role',{_user_id:userId,_role:'admin'});
  if(error) throw new Error('Your access could not be checked.');
  return data === true;
}
async function authorize(client:SupabaseClient<Database>,userId:string){if(!await isAdmin(client,userId))throw new Error('Administrator access required.');}
export const getWorkspace = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
  if(!await isAdmin(context.supabase,context.userId))return {allowed:false as const,inquiries:[],messages:[],quotations:[],content:[]};
  const [inquiries,messages,quotations,content]=await Promise.all([
    context.supabase.from('inquiries').select('*').order('created_at',{ascending:false}),
    context.supabase.from('contact_messages').select('*').order('created_at',{ascending:false}),
    context.supabase.from('quotations').select('*').order('created_at',{ascending:false}),
    context.supabase.from('site_content').select('*').order('sort_order'),
  ]);
  if(inquiries.error||messages.error||quotations.error||content.error)throw new Error('The workspace could not be loaded.');
  return {allowed:true as const,inquiries:inquiries.data??[],messages:messages.data??[],quotations:quotations.data??[],content:content.data??[]};
});
export const updateInquiry = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((d:unknown)=>statusSchema.parse(d)).handler(async({data,context})=>{
  await authorize(context.supabase,context.userId);
  const {data:row,error}=await context.supabase.from('inquiries').update({status:data.status}).eq('id',data.id).select('id').single();
  if(error||!row)throw new Error('Status could not be saved.');return {ok:true};
});
export const createQuotation = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((d:unknown)=>quotationSchema.parse(d)).handler(async({data,context})=>{
  await authorize(context.supabase,context.userId);
  const {error}=await context.supabase.from('quotations').insert({...data,created_by:context.userId});
  if(error)throw new Error('Quotation could not be saved.');return {ok:true};
});
export const saveContent = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((d:unknown)=>contentSchema.parse(d)).handler(async({data,context})=>{
  await authorize(context.supabase,context.userId);
  const {error}=await context.supabase.from('site_content').upsert(data,{onConflict:'kind,key'});
  if(error)throw new Error('Content could not be saved.');return {ok:true};
});
export const deleteContent = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((d:unknown)=>z.string().uuid().parse(d)).handler(async({data,context})=>{
  await authorize(context.supabase,context.userId);
  const {error}=await context.supabase.from('site_content').delete().eq('id',data);
  if(error)throw new Error('Content could not be removed.');return {ok:true};
});