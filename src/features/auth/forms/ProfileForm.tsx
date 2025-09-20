import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateMeSchema, UpdateMeInput } from "../schemas";
import { useMeQuery, useUpdateMeMutation } from "../hooks.query";
import { View, Text } from "react-native";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function ProfileForm() {
  const { data } = useMeQuery();
  const { mutateAsync, isPending, error } = useUpdateMeMutation();

  const { handleSubmit, setValue, register, formState: { errors } } =
    useForm<UpdateMeInput>({
      resolver: zodResolver(UpdateMeSchema),
      defaultValues: { name: data?.user?.name ?? "", email: data?.user?.email ?? "" },
    });

  const onSubmit = async (values: UpdateMeInput) => { await mutateAsync(values); };

  return (
    <View className="gap-4">
      <Input 
        placeholder="Name" 
        onChangeText={(t: string) => setValue("name", t)} 
        returnKeyType="next"
        autoCapitalize="words"
        {...register("name")} 
      />
      {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
      <Input 
        placeholder="Email" 
        onChangeText={(t: string) => setValue("email", t)} 
        keyboardType="email-address"
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={handleSubmit(onSubmit)}
        {...register("email")} 
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
      {!!error && <Text className="text-red-500">{String((error as Error).message)}</Text>}
      <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
        <Text className="text-white">{isPending ? "Saving..." : "Save"}</Text>
      </Button>
    </View>
  );
}
