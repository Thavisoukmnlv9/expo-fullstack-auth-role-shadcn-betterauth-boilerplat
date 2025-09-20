import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'

interface PackagesHeaderProps {
  title?: string
  onBack?: () => void
}

export default function PackagesHeader({ 
  title = 'Packages', 
  onBack 
}: PackagesHeaderProps) {
  return (
    <View className="px-4 pt-4 pb-2 bg-zinc-100">
      <View className="flex-row items-center">
        <Pressable
          onPress={onBack}
          className="w-10 h-10 items-center justify-center -ml-2"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={24} color="#27272a" />
        </Pressable>
        <Text className="flex-1 text-center text-xl font-semibold text-zinc-800">
          {title}
        </Text>
        <View className="w-10" />
      </View>
    </View>
  )
}
