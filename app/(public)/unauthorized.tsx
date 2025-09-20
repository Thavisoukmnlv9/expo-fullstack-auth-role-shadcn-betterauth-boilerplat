import { View, Text } from "react-native";
export default function Unauthorized() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <Text className="text-xl">You do not have access to this area.</Text>
    </View>
  );
}
