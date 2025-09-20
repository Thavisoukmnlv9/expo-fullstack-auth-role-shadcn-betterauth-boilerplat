import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { Promotion } from '@/src/mocks/clientHome'

interface PromoCardProps {
  promotion: Promotion
  onPress?: () => void
}

export default function PromoCard({ promotion, onPress }: PromoCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-3xl mr-4 w-80 mb-4 "
      accessibilityRole="button"
      accessibilityLabel={`${promotion.title}, ${promotion.subtitle}`}
    >
      <View className="relative">
        <Image
          source={{ uri: promotion.image }}
          className="w-full h-48 rounded-t-3xl"
          resizeMode="cover"
        />
        <View className="absolute top-4 left-4 bg-orange-500 px-3 py-1 rounded-lg">
          <Text className="text-white text-sm font-bold">{promotion.badge}</Text>
        </View>
      </View>
      <View className="p-5">
        <Text className="text-gray-900 font-bold text-lg mb-1" numberOfLines={1}>
          {promotion.title}
        </Text>
        <Text className="text-gray-600 text-sm mb-4" numberOfLines={1}>
          {promotion.subtitle}
        </Text>
        <Pressable
          onPress={onPress}
          className="bg-orange-500 rounded-xl py-3"
          accessibilityRole="button"
          accessibilityLabel={promotion.cta.label}
        >
          <Text className="text-white font-semibold text-center">
            {promotion.cta.label}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  )
}
