import { ReactNode } from "react";
import { useRequireAuth } from "../hooks";
import { View, ActivityIndicator } from "react-native";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { session, isLoading } = useRequireAuth();
  if (isLoading) return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
  if (!session) return null;
  return <>{children}</>;
}
