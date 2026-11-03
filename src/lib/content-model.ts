import { services, portfolio, type Service } from './site-data';
import type { Tables } from '@/integrations/supabase/types';

export function resolveContent(rows: Tables<'site_content'>[]) {
  const published = rows.filter(r => r.published);
  const stringItems = (value: unknown): string[] => Array.isArray(value) ? value.filter((s): s is string => typeof s === 'string') : [];
  const customServices = published.filter(r => r.kind === 'service');
  return {
    services: [...services.map(s => {
      const r = customServices.find(r => r.key === s.slug);
      return r ? { ...s, name: r.title, short: r.description, image: r.image || s.image, items: stringItems(r.items) } : s;
    }), ...customServices.filter(r => !services.some(s => s.slug === r.key)).map((r): Service => ({slug:r.key,name:r.title,short:r.description,image:r.image || services[0]?.image || '',items:stringItems(r.items)}))],
    portfolio: [...portfolio, ...published.filter(r => r.kind === 'portfolio').map(r => ({title:r.title,category:r.category,image:r.image || portfolio[0]?.image || ''}))],
    team: published.filter(r => r.kind === 'team'),
  };
}