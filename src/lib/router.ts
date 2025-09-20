import { Platform } from "react-native";
import { router } from "expo-router";

export function goLogin() {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    } else {
      router.replace("/(public)/login");
    }
  } else {
    router.replace("/(public)/login");
  }
}
