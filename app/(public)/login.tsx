import { View, Text, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DotPattern } from "@/src/components/ui/dot-pattern";
import EnhancedLoginForm from "@/src/features/auth/forms/EnhancedLoginForm";

export default function LoginPage() {
  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#FF6B00', '#FF8C42', '#FFA726']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
        className="flex-1"
      >
        <DotPattern color="#ffffff" size={1} spacing={15} opacity={0.2} />
        <View className="pt-20 pb-6 items-center">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 bg-white rounded-lg items-center justify-center">
              <Text className="text-orange-500 text-lg font-bold">★</Text>
            </View>
            <Text className="text-white text-xl font-semibold">TripBuddy</Text>
          </View>
        </View>
        <View className="flex-1 px-6 pb-8">
          <View className="bg-white rounded-2xl p-6 shadow-lg" style={{ minHeight: 500 }}>
            <Text className="text-gray-900 text-3xl text-center font-bold mb-2">Login</Text>
            <View className="flex-row items-center mb-6 justify-center">
              <Text className="text-gray-500 text-sm">Don&apos;t have an account? </Text>
              <Text className="text-orange-500 text-sm font-medium">Sign Up</Text>
            </View>
            <EnhancedLoginForm />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
