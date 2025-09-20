import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Settings } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface TopBarProps {
  userName: string
  onSettings?: () => void
}

export default function TopBar({ userName, onSettings }: TopBarProps) {
  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <View className="flex-row items-center">
        <LinearGradient
          colors={['#0ea5e9', '#0284c7']}
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
        >
          <Text className="text-white font-bold text-base">
            {userName.charAt(0).toUpperCase()}
          </Text>
        </LinearGradient>
        <Text className="text-zinc-800 font-bold text-xl">Home</Text>
      </View>
      
      <Pressable
        onPress={onSettings}
        className="p-2"
        accessibilityRole="button"
        accessibilityLabel="Settings"
      >
        <Settings size={22} color="#71717a" />
      </Pressable>
    </View>
  )
}
