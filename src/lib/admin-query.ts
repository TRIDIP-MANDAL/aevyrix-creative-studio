import { queryOptions } from '@tanstack/react-query';
import { getWorkspace } from './admin.functions';
export const workspaceOptions = queryOptions({queryKey:['admin-workspace'],queryFn:()=>getWorkspace(),staleTime:0});