import { Platform } from "react-native";
import { router } from "expo-router";

export function goLogin() {
  if (Platform.OS === "web") {
    if (typeof (globalThis as any).window !== "undefined") {
      (globalThis as any).window.location.href = "/auth/login";
    } else {
      router.replace("/(public)/login");
    }
  } else {
    router.replace("/(public)/login");
  }
}
