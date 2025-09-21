import { useSession } from "@/src/auth/session";
import { View, Text, StatusBar, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { } from "expo-status-bar";
import { LoadingSpinner, PulsingDots } from "@/src/components/ui/loading-spinner";

export default function Home() {
  const { roleNames, isLoading: sessionLoading } = useSession();
  const router = useRouter();
  const [navigationReady, setNavigationReady] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Wait for navigation to be ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavigationReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animate in when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, slideAnim]);

  useEffect(() => {
    if (navigationReady && !sessionLoading && roleNames.length > 0) {
      // Add a small delay for better UX
      const redirectTimer = setTimeout(() => {
        const userRole = roleNames[0];
        switch (userRole) {
          case "admin":
            router.replace("/(client)/" as any);
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
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [navigationReady, sessionLoading, roleNames, router]);

  if (sessionLoading || !navigationReady) {
    return (
      <View className="flex-1 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }}
          className="flex-1 items-center justify-center px-8"
        >
          <View className="items-center space-y-6">
            {/* Logo/Brand area */}
            <View className="w-20 h-20 bg-orange-500 rounded-2xl items-center justify-center shadow-lg">
              <Text className="text-white text-2xl font-bold">TB</Text>
            </View>

            {/* Loading spinner */}
            <LoadingSpinner size={50} color="#FF6B00" strokeWidth={5} />

            {/* Loading text with animation */}
            <View className="items-center space-y-2">
              <Text className="text-2xl font-semibold text-gray-800 dark:text-white">
                Loading
              </Text>
              <PulsingDots color="#FF6B00" size={6} />
            </View>

            {/* Subtitle */}
            <Text className="text-gray-600 dark:text-gray-300 text-center text-base">
              Preparing your experience...
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: slideAnim }
          ]
        }}
        className="flex-1 items-center justify-center px-8"
      >
        <View className="items-center space-y-6">
          {/* Logo/Brand area */}
          <View className="w-20 h-20 bg-orange-500 rounded-2xl items-center justify-center shadow-lg">
            <Text className="text-white text-2xl font-bold">TB</Text>
          </View>

          {/* Redirecting animation */}
          <View className="items-center space-y-4">
            <View className="relative">
              <LoadingSpinner size={50} color="#FF6B00" strokeWidth={5} />
              <View className="absolute inset-0 items-center justify-center">
                <View className="w-6 h-6 bg-orange-500 rounded-full" />
              </View>
            </View>

            <View className="items-center space-y-2">
              <Text className="text-2xl font-semibold text-gray-800 dark:text-white">
                Redirecting
              </Text>
              <PulsingDots color="#FF6B00" size={6} />
            </View>

            {/* Subtitle */}
            <Text className="text-gray-600 dark:text-gray-300 text-center text-base">
              Taking you to your dashboard...
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
