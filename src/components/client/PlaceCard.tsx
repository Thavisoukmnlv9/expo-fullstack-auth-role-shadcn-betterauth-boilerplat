import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { Star, MapPin } from 'lucide-react-native'
import { FeaturedPlace } from '@/src/mocks/clientHome'

interface PlaceCardProps {
  place: FeaturedPlace
  onPress?: () => void
}

export default function PlaceCard({ place, onPress }: PlaceCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl  mb-4"
      accessibilityRole="button"
      accessibilityLabel={`${place.name}, ${place.location}, ${place.priceLabel}`}
    >
      <View className="relative">
        <Image
          source={{ uri: place.image }}
          className="w-full h-40 rounded-t-2xl"
          resizeMode="cover"
        />
        <View className="absolute top-3 right-3 bg-orange-500 px-2 py-1 rounded-full">
          <Text className="text-white text-sm font-bold">{place.priceLabel}</Text>
        </View>
        <View className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full flex-row items-center">
          <Star size={12} color="#F59E0B" fill="#F59E0B" />
          <Text className="text-gray-900 text-xs font-medium ml-1">{place.rating}</Text>
        </View>
      </View>
      <View className="p-4">
        <Text className="text-gray-900 font-bold text-base mb-1" numberOfLines={1}>
          {place.name}
        </Text>
        <View className="flex-row items-center mb-2">
          <MapPin size={12} color="#6B7280" />
          <Text className="text-gray-600 text-sm ml-1" numberOfLines={1}>
            {place.location}
          </Text>
        </View>
        <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
          {place.description}
        </Text>
        <Pressable
          onPress={onPress}
          className="bg-orange-500 rounded-xl py-3"
          accessibilityRole="button"
          accessibilityLabel={`Book ${place.name}`}
        >
          <Text className="text-white font-semibold text-center">
            Book Now
          </Text>
        </Pressable>
      </View>
    </Pressable>
  )
}
