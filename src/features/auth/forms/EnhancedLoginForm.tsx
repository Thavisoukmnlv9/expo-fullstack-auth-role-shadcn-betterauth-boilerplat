import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, Text, Pressable, Image } from "react-native";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Separator } from "@/src/components/ui/separator";
import { auth } from "@/src/auth/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { authApi } from "@/src/lib/fetcher";
const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 8 characters")
});
type FormData = z.infer<typeof schema>;
export default function EnhancedLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { handleSubmit, setValue, register, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: "admin@admin.com", password: "123456" } });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: FormData) => {
    try {
      setLoginError(null);
      setIsLoading(true);

      const response = await auth.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        throw new Error(response.error.message || "Login failed");
      }

      if (response.data) {
        try {
          await authApi.getSession();
        } catch (error) {
          console.error("❌ get-session API call failed:", error);
        }

        router.replace("/(protected)");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      setLoginError(null);
      setIsLoading(true);

      const response = await auth.signIn.social({
        provider: "google",
      });

      if (response.error) {
        throw new Error(response.error.message || "Google login failed");
      }

      if (response.data) {
        router.replace("/(protected)");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setLoginError(error instanceof Error ? error.message : "Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoginError(null);
      setIsLoading(true);

      const response = await auth.signIn.social({
        provider: "facebook",
      });

      if (response.error) {
        throw new Error(response.error.message || "Facebook login failed");
      }

      if (response.data) {
        router.replace("/(protected)");
      }
    } catch (error) {
      console.error("Facebook login error:", error);
      setLoginError(error instanceof Error ? error.message : "Facebook login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="gap-6">
      {/* Email Field */}
      <View className="gap-2">
        <Text className="text-sm font-medium text-foreground">Email</Text>
        <Input
          placeholder="Enter your email"
          onChangeText={(t: string) => setValue("email", t)}
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          {...register("email")}
          className="h-12"
        />
        {errors.email && <Text className="text-red-500 text-sm">{errors.email.message}</Text>}
      </View>
      {/* Password Field */}
      <View className="gap-2">
        <Text className="text-sm font-medium text-foreground">Password</Text>
        <View className="relative">
          <Input
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            onChangeText={(t: string) => setValue("password", t)}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmit)}
            {...register("password")}
            className="h-12 pr-12"
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            <Text className="text-muted-foreground text-lg">
              {showPassword ? "🙈" : "👁️"}
            </Text>
          </Pressable>
        </View>
        {errors.password && <Text className="text-red-500 text-sm">{errors.password.message}</Text>}
      </View>
      {/* Login Error Display */}
      {loginError && (
        <View className="bg-red-50 border border-red-200 rounded-md p-3">
          <Text className="text-red-600 text-sm">{loginError}</Text>
        </View>
      )}
      {/* Remember Me & Forgot Password */}
      <View className="flex-row justify-between items-center gap-x-2">
        <Checkbox
          checked={rememberMe}
          onCheckedChange={setRememberMe}
        >
          Remember me
        </Checkbox>
        <Pressable>
          <Text className="text-orange-500 text-sm font-medium">Forgot Password?</Text>
        </Pressable>
      </View>
      {/* Login Button */}
      <Button
        disabled={isSubmitting || isLoading}
        onPress={handleSubmit(onSubmit)}
        className="h-12 bg-orange-500"
      >
        <Text className="text-white font-semibold text-base ">
          {isSubmitting || isLoading ? "Signing in..." : "Log In"}
        </Text>
      </Button>
      {/* Separator */}
      <Separator>Or</Separator>
      {/* Social Login Buttons */}
      <View className="gap-3">
        <Button
          variant="outline"
          onPress={handleGoogleLogin}
          className="h-12 border-gray-200 bg-white"
        >
          <View className="flex-row items-center gap-3">
            <Image
              source={require("@/assets/logo/google.svg.png")}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-gray-900 font-medium">Continue with Google</Text>
          </View>
        </Button>

        <Button
          variant="outline"
          onPress={handleFacebookLogin}
          className="h-12 border-gray-200 bg-white"
        >
          <View className="flex-row items-center gap-3">
            <Image
              source={require("@/assets/logo/facebook.png")}
              className="w-10 h-10"
              resizeMode="contain"
            />
            <Text className="text-gray-900 font-medium">Continue with Facebook</Text>
          </View>
        </Button>
      </View>
    </View>
  );
}