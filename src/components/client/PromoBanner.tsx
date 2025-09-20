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
      className="bg-white rounded-2xl shadow-sm overflow-hidden mx-4 mb-6"
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${body}`}
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-40"
        contentFit="cover"
      />
      <View className="p-5">
        <Text className="text-zinc-800 font-bold text-lg mb-2">
          {title}
        </Text>
        <Text className="text-zinc-500 text-sm">
          {body}
        </Text>
      </View>
    </Pressable>
  )
}
