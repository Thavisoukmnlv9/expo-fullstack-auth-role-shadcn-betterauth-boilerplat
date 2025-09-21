import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Settings } from 'lucide-react-native';

interface ProfileHeaderCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onSettingsPress: () => void;
}

export default function ProfileHeaderCard({ 
  name, 
  email, 
  avatarUrl, 
  onSettingsPress 
}: ProfileHeaderCardProps) {
  return (
    <View className="bg-white rounded-3xl  border border-gray-100 p-6 mb-6">
      {/* Header with title and settings icon */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-gray-900">Account</Text>
        <Pressable
          onPress={onSettingsPress}
          className="p-2 rounded-full bg-gray-50"
          accessibilityRole="button"
          accessibilityLabel="Profile Settings"
        >
          <Settings size={20} color="#6B7280" />
        </Pressable>
      </View>

      {/* Profile section */}
      <View className="flex-row items-center">
        <View className="w-16 h-16 rounded-full overflow-hidden mr-4">
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-orange-100 items-center justify-center">
              <Text className="text-2xl font-bold text-orange-600">
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-1">{name}</Text>
          <Text className="text-sm text-gray-500">{email}</Text>
        </View>
      </View>
    </View>
  );
}
