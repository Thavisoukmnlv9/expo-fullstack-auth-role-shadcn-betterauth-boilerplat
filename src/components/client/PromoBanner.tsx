import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface PromoBannerProps {
  title: string
  body: string
  buttonText?: string
  onPress?: () => void
}

export default function PromoBanner({ title, body, buttonText = "Claim Now", onPress }: PromoBannerProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mx-4 mb-6 rounded-2xl overflow-hidden shadow-lg"
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${body}`}
    >
      <LinearGradient
        colors={['#2563EB', '#7C3AED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="p-6"
      >
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-1 mr-6">
            <Text className="text-white font-bold text-2xl mb-1">
              {title}
            </Text>
            <Text className="text-white text-lg opacity-95">
              {body}
            </Text>
          </View>
          <Pressable
            onPress={onPress}
            className="bg-white border-2 border-purple-300 px-6 py-3 rounded-xl shadow-sm"
            accessibilityRole="button"
            accessibilityLabel={buttonText}
          >
            <Text className="text-black font-bold text-base">
              {buttonText}
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </Pressable>
  )
}
