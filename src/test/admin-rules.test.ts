import { describe, it, expect } from 'vitest';
import { contentSchema, quotationSchema, statusSchema } from '@/lib/admin-schemas';
import { resolveContent } from '@/lib/content-model';
const id='00000000-0000-4000-8000-000000000001';
describe('Admin rules',()=>{
  it('accepts inquiry statuses but rejects an implied paid status',()=>{
    expect(statusSchema.safeParse({id,status:'reviewing'}).success).toBe(true);
    expect(statusSchema.safeParse({id,status:'paid'}).success).toBe(false);
  });
  it('requires a positive rupee quotation amount',()=>{
    const base={inquiry_id:id,scope:'Create a product video',timeline:'Two weeks',terms:''};
    expect(quotationSchema.parse({...base,amount:4999}).amount).toBe(4999);
    expect(quotationSchema.safeParse({...base,amount:0}).success).toBe(false);
  });
  it('keeps unpublished team profiles out of public content',()=>{
    const row={id,...contentSchema.parse({kind:'team',key:'test-person',title:'Test profile',description:'Test bio',image:'',category:'Editor',items:[],published:false,sort_order:0})};
    expect(resolveContent([row]).team).toHaveLength(0);
    expect(resolveContent([{...row,published:true}]).team[0]?.title).toBe('Test profile');
  });
});