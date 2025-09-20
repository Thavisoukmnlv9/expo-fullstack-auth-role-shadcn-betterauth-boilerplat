import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'

interface PromoBannerProps {
  title: string
  body: string
  imageUrl: string
  onPress?: () => void
}

export default function PromoBanner({ title, body, imageUrl, onPress }: PromoBannerProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl shadow-sm overflow-hidden mx-4 mb-4"
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${body}`}
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-32"
        contentFit="cover"
      />
      <View className="p-4">
        <Text className="text-zinc-800 font-semibold text-base mb-1">
          {title}
        </Text>
        <Text className="text-zinc-500 text-xs">
          {body}
        </Text>
      </View>
    </Pressable>
  )
}
