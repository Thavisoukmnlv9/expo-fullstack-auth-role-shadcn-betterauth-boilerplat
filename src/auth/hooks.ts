import { useSession } from "./session";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ROLE_PERMISSIONS, hasPermissions } from "./permissions";
import type { Role } from "./session";

export function useRequireAuth() {
  const { session, isLoading } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !session) router.replace("/(public)/login");
  }, [isLoading, router, session]);
  return { session, isLoading };
}

export function useRole(required: Role[]) {
  const { roleNames } = useSession();
  return { ok: required.some(r => roleNames.includes(r)), roleNames };
}

export function useHasPermissions(required: string[]) {
  const { permissions, roleNames } = useSession();
  const userPermissions = permissions.length > 0
    ? permissions
    : roleNames.flatMap(r => ROLE_PERMISSIONS[r as Role] ?? []);
  return hasPermissions(userPermissions, required);
}
