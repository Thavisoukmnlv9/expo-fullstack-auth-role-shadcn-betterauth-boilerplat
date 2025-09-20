import { Stack } from "expo-router";
import RequireAuth from "@/src/auth/middleware/RequireAuth";

export default function ProtectedLayout() {
  return (
    <RequireAuth>
      <Stack screenOptions={{ headerShown: false }} />
    </RequireAuth>
  );
}
