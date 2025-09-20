import { Stack } from "expo-router";
import RequireRole from "@/src/auth/middleware/RequireRole";

export default function AdminLayout() {
  return (
    <RequireRole allow={["admin"]}>
      <Stack screenOptions={{ headerShown: false }} />
    </RequireRole>
  );
}
