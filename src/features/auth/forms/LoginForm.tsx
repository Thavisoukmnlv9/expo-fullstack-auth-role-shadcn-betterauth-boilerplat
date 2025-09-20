import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, Text } from "react-native";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { auth } from "@/src/auth/auth";
import { useRouter } from "expo-router";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const { handleSubmit, setValue, register, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await auth.signIn?.email({ email: data.email, password: data.password });
    router.replace("/(protected)");
  };

  return (
    <View className="gap-4">
      <Input 
        placeholder="Email" 
        onChangeText={(t: string) => setValue("email", t)} 
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        autoCorrect={false}
        {...register("email")} 
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
      <Input 
        placeholder="Password" 
        secureTextEntry 
        onChangeText={(t: string) => setValue("password", t)} 
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onSubmit)}
        {...register("password")} 
      />
      {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
      <Button disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        <Text className="text-white">{isSubmitting ? "Signing in..." : "Sign In"}</Text>
      </Button>
    </View>
  );
}
