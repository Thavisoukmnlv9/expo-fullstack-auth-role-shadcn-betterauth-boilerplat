import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, UpdateUserInput } from "../schemas";
import { useUpdateUserMutation, useUserQuery } from "../hooks.query";
import { View, Text } from "react-native";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function AdminUserForm({ userId }: { userId: string }) {
  const { data, isFetching } = useUserQuery(userId);
  const { mutateAsync, isPending, error } = useUpdateUserMutation(userId);

  const { handleSubmit, setValue, register, reset, formState: { errors } } =
    useForm<UpdateUserInput>({ resolver: zodResolver(UpdateUserSchema) });

  React.useEffect(() => {
    if (data?.user) {
      reset({ name: data.user.name ?? "", email: data.user.email ?? "", roleId: data.user.roleIds?.[0] ?? "" });
    }
  }, [data?.user, reset]);

  const onSubmit = async (values: UpdateUserInput) => { await mutateAsync(values); };

  return (
    <View className="gap-4">
      {isFetching && <Text>Loading user…</Text>}
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
        returnKeyType="next"
        autoCapitalize="none"
        autoCorrect={false}
        {...register("email")} 
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
      <Input 
        placeholder="Role ID" 
        onChangeText={(t: string) => setValue("roleId", t)} 
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={handleSubmit(onSubmit)}
        {...register("roleId")} 
      />
      {!!error && <Text className="text-red-500">{String((error as Error).message)}</Text>}
      <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
        <Text className="text-white">{isPending ? "Updating..." : "Update User"}</Text>
      </Button>
    </View>
  );
}
