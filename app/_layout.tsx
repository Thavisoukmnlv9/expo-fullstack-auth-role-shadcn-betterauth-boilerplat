import { useTheme } from "@/src/lib/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProviders } from "@/src/auth/provider";
import "../global.css";

export default function RootLayout() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (Platform.OS === "web") {
      const doc = (globalThis as any).document;
      if (doc) {
        const root = doc.documentElement;
        if (colorScheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    }
  }, [colorScheme]);

  return (
    <AppProviders>
      <GestureHandlerRootView>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack
          screenOptions={{
            title: "Expo Starter",
            headerShown: false,
            contentStyle: { backgroundColor: theme.background },
            headerTitleStyle: { color: theme.foreground },
            headerStyle: { backgroundColor: theme.background },
          }}
        />
      </GestureHandlerRootView>
    </AppProviders>
  );
}