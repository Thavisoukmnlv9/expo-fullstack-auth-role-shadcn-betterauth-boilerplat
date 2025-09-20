import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { NearbyPlace } from '@/src/mocks/clientHome'

interface PlaceItemProps {
  place: NearbyPlace
  onPress?: () => void
}

export default function PlaceItem({ place, onPress }: PlaceItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 shadow-sm mb-3 flex-row items-center"
      accessibilityRole="button"
      accessibilityLabel={`${place.name}, ${place.category}, ${place.distanceLabel} away`}
    >
      <Image
        source={{ uri: place.imageUrl }}
        className="w-14 h-14 rounded-xl"
        contentFit="cover"
      />
      
      <View className="flex-1 ml-4">
        <Text className="text-zinc-500 text-xs mb-1">{place.distanceLabel}</Text>
        <Text className="text-zinc-800 font-bold text-base mb-1" numberOfLines={1}>
          {place.name}
        </Text>
        <Text className="text-zinc-500 text-sm" numberOfLines={1}>
          {place.category}
        </Text>
      </View>
    </Pressable>
  )
}
