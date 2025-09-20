import React from 'react'
import { View, Pressable, Text } from 'react-native'

interface InlineButtonsProps {
  leftLabel: string
  rightLabel: string
  onLeft?: () => void
  onRight?: () => void
}

export default function InlineButtons({ 
  leftLabel, 
  rightLabel, 
  onLeft, 
  onRight 
}: InlineButtonsProps) {
  return (
    <View className="flex-row gap-3 mt-3">
      <Pressable
        onPress={onLeft}
        className="flex-1 bg-sky-50 rounded-xl py-3"
        accessibilityRole="button"
        accessibilityLabel={leftLabel}
      >
        <Text className="text-center text-sky-700 font-medium">
          {leftLabel}
        </Text>
      </Pressable>
      <Pressable
        onPress={onRight}
        className="flex-1 bg-sky-500 rounded-xl py-3"
        accessibilityRole="button"
        accessibilityLabel={rightLabel}
      >
        <Text className="text-center text-white font-medium">
          {rightLabel}
        </Text>
      </Pressable>
    </View>
  )
}
