import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Bell, User } from 'lucide-react-native'

interface NewTopBarProps {
  onNotificationPress?: () => void
  onProfilePress?: () => void
}

export default function NewTopBar({ onNotificationPress, onProfilePress }: NewTopBarProps) {
  return (
    <View className="px-4 py-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-gray-900 font-bold text-xl">TripBuddy</Text>
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={onNotificationPress}
            className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Bell size={20} color="#6B7280" />
          </Pressable>
          <Pressable
            onPress={onProfilePress}
            className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Profile"
          >
            <User size={20} color="#6B7280" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}
