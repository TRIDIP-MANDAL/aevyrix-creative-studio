import { createFileRoute } from '@tanstack/react-router';
import { workspaceOptions } from '@/lib/admin-query';
import { AdminWorkspace } from '@/components/site/AdminWorkspace';
export const Route=createFileRoute('/_authenticated/admin')({
  loader:({context})=>context.queryClient.ensureQueryData(workspaceOptions),
  head:()=>({meta:[{title:'Admin Workspace — Aevyrix Creation Hub'},{name:'description',content:'Manage Aevyrix inquiries, draft quotations and published content.'},{property:'og:title',content:'Aevyrix Admin Workspace'},{property:'og:description',content:'Private agency management workspace.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex'}]}),
  component:AdminWorkspace,
});