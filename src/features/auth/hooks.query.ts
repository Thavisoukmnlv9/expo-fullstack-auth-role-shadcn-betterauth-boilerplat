import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authKeys } from "./keys";
import { apiGetMe, apiGetRole, apiGetUser, apiPatchRole, apiPutMe, apiPutUser } from "./api";
import type { UpdateMeInput, UpdateRoleInput, UpdateUserInput } from "./schemas";

export function useMeQuery(enabled = true) {
  return useQuery({ queryKey: authKeys.me(), queryFn: apiGetMe, enabled });
}
export function useUserQuery(id: string, enabled = true) {
  return useQuery({ queryKey: authKeys.user(id), queryFn: () => apiGetUser(id), enabled: !!id && enabled });
}
export function useRoleQuery(id: string, enabled = true) {
  return useQuery({ queryKey: authKeys.role(id), queryFn: () => apiGetRole(id), enabled: !!id && enabled });
}

export function useUpdateMeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMeInput) => apiPutMe(data),
    onSuccess: (res) => qc.setQueryData(authKeys.me(), res),
  });
}
export function useUpdateUserMutation(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserInput) => apiPutUser(userId, data),
    onSuccess: (res) => { qc.setQueryData(authKeys.user(userId), res); qc.invalidateQueries({ queryKey: authKeys.me() }); },
  });
}
export function useUpdateRoleMutation(roleId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateRoleInput) => apiPatchRole(roleId, data),
    onSuccess: (res) => qc.setQueryData(authKeys.role(roleId), res),
  });
}
