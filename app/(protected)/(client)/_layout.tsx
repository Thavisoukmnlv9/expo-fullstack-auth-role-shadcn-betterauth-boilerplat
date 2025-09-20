import { Stack } from "expo-router";
import RequireRole from "@/src/auth/middleware/RequireRole";

export default function ClientLayout() {
  return (
    <RequireRole allow={["client"]}>
      <Stack screenOptions={{ headerShown: false }} />
    </RequireRole>
  );
}
