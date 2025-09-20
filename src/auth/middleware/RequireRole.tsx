import { ReactNode } from "react";
import { useRole } from "../hooks";
import { Redirect } from "expo-router";
import type { Role } from "../session";

export default function RequireRole({ allow, children }: { allow: Role[]; children: ReactNode; }) {
  const { ok } = useRole(allow);
  if (!ok) return <Redirect href="/(public)/unauthorized" />;
  return <>{children}</>;
}
