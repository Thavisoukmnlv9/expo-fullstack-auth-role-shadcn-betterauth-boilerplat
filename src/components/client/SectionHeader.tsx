import React from 'react'
import { View, Text, Pressable } from 'react-native'

interface SectionHeaderProps {
  title: string
  actionText?: string
  onAction?: () => void
}

export default function SectionHeader({ title, actionText, onAction }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 mb-3">
      <Text className="text-gray-900 font-bold text-lg">{title}</Text>
      {actionText && onAction && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={`${actionText} for ${title}`}
        >
          <Text className="text-orange-500 font-medium text-sm">
            {actionText}
          </Text>
        </Pressable>
      )}
    </View>
  )
}
