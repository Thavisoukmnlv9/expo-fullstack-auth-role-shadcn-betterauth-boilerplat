import { useSession } from "@/src/auth/session";
import { View, Text, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { } from "expo-status-bar";

export default function Home() {
  const { roleNames, isLoading: sessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionLoading && roleNames.length > 0) {
      const userRole = roleNames[0];
      switch (userRole) {
        case "admin":
          router.replace("/(admin)/" as any);
          break;
        case "staff":
          router.replace("/(staff)/" as any);
          break;
        case "client":
          router.replace("/(client)/" as any);
          break;
        default:
          router.replace("/(public)/unauthorized" as any);
          break;
      }
    }
  }, [sessionLoading, roleNames, router]);
  if (sessionLoading) return <Text>Loading...</Text>;
  return (
    <View className="flex-1 p-6">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent className="mt-64" />
      <Text className="text-2xl mb-4">Redirecting...</Text>
    </View>
  );
}
