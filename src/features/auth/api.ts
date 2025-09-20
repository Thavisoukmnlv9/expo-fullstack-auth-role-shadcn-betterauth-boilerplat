import { fetcher } from "@/src/lib/fetcher";
import type { UpdateMeInput, UpdateRoleInput, UpdateUserInput } from "./schemas";

export const apiGetMe   = () => fetcher.get<{ user: any }>("/me");
export const apiGetUser = (id: string) => fetcher.get<{ user: any }>(`/users/${id}`);
export const apiGetRole = (id: string) => fetcher.get<{ item: any }>(`/rbac/roles/${id}`);

export const apiPutMe = (data: UpdateMeInput) => {
  const f = new FormData(); Object.entries(data).forEach(([k, v]) => { if (v!=null) f.append(k, v as any); });
  return fetcher.putForm<{ user: any }>("/me", f);
};
export const apiPutUser = (userId: string, data: UpdateUserInput) => {
  const f = new FormData(); Object.entries(data).forEach(([k, v]) => { if (v!=null) f.append(k, v as any); });
  return fetcher.putForm<{ user: any }>(`/users/${userId}`, f);
};
export const apiPatchRole = (roleId: string, data: UpdateRoleInput) =>
  fetcher.patch<{ item: any }>(`/rbac/roles/${roleId}`, data);
