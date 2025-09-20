import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { Settings } from 'lucide-react-native'

interface TopBarProps {
  userName: string
  onSettings?: () => void
}

const userImage = "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"

export default function TopBar({ userName, onSettings }: TopBarProps) {
  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <View className="flex-row items-center gap-3">
        <Image source={{ uri: userImage }} className="w-10 h-10 rounded-full" />
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
