import { z } from 'zod';

export const inquiryStatuses = ['new_inquiry', 'reviewing', 'quoted', 'in_progress', 'completed', 'closed'] as const;
export const statusSchema = z.object({ id: z.string().uuid(), status: z.enum(inquiryStatuses) });
export const quotationSchema = z.object({
  inquiry_id: z.string().uuid(), amount: z.coerce.number().positive().max(100000000),
  scope: z.string().trim().min(10).max(6000), timeline: z.string().trim().min(2).max(200),
  terms: z.string().trim().max(3000),
});
export const contentSchema = z.object({
  kind: z.enum(['service', 'portfolio', 'team']), key: z.string().trim().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(2).max(150), description: z.string().trim().max(3000),
  image: z.string().max(2000).refine(v => !v || /^https:\/\//.test(v) || /^\/assets\//.test(v), 'Use an HTTPS image URL'),
  category: z.string().trim().max(150), items: z.array(z.string().trim().max(200)).max(30),
  published: z.boolean(), sort_order: z.coerce.number().int().min(0).max(1000),
});