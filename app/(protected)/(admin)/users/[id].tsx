import { useLocalSearchParams } from "expo-router";
import AdminUserForm from "@/src/features/auth/forms/AdminUserForm";
import { View, Text } from "react-native";

export default function AdminUserEdit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl mb-4">Edit User</Text>
      <AdminUserForm userId={String(id)} />
    </View>
  );
}
