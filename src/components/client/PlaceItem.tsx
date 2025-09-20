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
      className="bg-white rounded-2xl p-4 mb-3 flex-row items-center"
      accessibilityRole="button"
      accessibilityLabel={`${place.name}, ${place.category}, ${place.distanceLabel} away`}
    >
      <Image
        source={{ uri: place.imageUrl }}
        style={{
          width: 48,
          height: 48,
          backgroundColor: '#e5e7eb',
          borderRadius: 6,
        }}
        resizeMode="cover"
        contentFit="cover"
      />
      <View className="flex-1 ml-4">
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
