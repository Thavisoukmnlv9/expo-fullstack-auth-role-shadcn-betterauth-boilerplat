import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Settings } from 'lucide-react-native'
import { Image } from 'expo-image'

interface TopBarProps {
  userName: string
  onSettings?: () => void
}

export default function TopBar({ userName, onSettings }: TopBarProps) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center space-x-3">
        <View className="w-8 h-8 rounded-full bg-sky-100 items-center justify-center">
          <Text className="text-sky-600 font-semibold text-sm">
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="text-zinc-800 font-semibold text-lg">Home</Text>
      </View>
      
      <Pressable
        onPress={onSettings}
        className="p-2"
        accessibilityRole="button"
        accessibilityLabel="Settings"
      >
        <Settings size={20} color="#71717a" />
      </Pressable>
    </View>
  )
}
