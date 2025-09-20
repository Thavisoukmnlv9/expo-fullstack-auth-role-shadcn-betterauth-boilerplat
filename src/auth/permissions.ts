import type { Role } from "./session";

export type PermissionId = string;

export const ROLE_PERMISSIONS: Record<Role, PermissionId[]> = {
  admin: ["users:read","users:update","roles:update","me:update"],
  staff: ["users:read","me:update"],
  client: ["me:update"],
};

export function hasPermissions(userPermissions: PermissionId[] = [], required: PermissionId[] = []) {
  if (!required.length) return true;
  const set = new Set(userPermissions);
  return required.every(p => set.has(p));
}
