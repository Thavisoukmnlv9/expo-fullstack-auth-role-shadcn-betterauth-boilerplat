import { Alert, Platform } from "react-native";

export async function confirm(opts: {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive";
}): Promise<boolean> {
  if (Platform.OS === "web") {
    // Check if window.confirm is available (for web platform)
    if (typeof window !== "undefined" && window.confirm) {
      return window.confirm(`${opts.title}\n\n${opts.description ?? ""}`);
    }
    // Fallback if window.confirm is not available
    return true; // Default to true for web fallback
  }
  return new Promise((resolve) => {
    Alert.alert(
      opts.title,
      opts.description,
      [
        { text: opts.cancelText ?? "Cancel", style: "cancel", onPress: () => resolve(false) },
        { text: opts.confirmText ?? "OK", style: opts.confirmVariant === "destructive" ? "destructive" : "default", onPress: () => resolve(true) }
      ],
      { cancelable: true }
    );
  });
}

function showToast(type: "success" | "error" | "info", title: string, description?: string) {
  if (Platform.OS === "web") {
    // Silent on web platform
  } else {
    Alert.alert(title, description ?? "");
  }
}

export const toast = {
  success: (title: string, opts?: { description?: string }) => showToast("success", title, opts?.description),
  error: (title: string, opts?: { description?: string }) => showToast("error", title, opts?.description),
  info: (title: string, opts?: { description?: string }) => showToast("info", title, opts?.description),
};
