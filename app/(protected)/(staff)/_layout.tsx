  import { Stack } from "expo-router";
  import RequireRole from "@/src/auth/middleware/RequireRole";

export default function StaffLayout() {
  return (
    <RequireRole allow={["staff"]}>
      <Stack screenOptions={{ headerShown: false }} />
    </RequireRole>
  );
}
