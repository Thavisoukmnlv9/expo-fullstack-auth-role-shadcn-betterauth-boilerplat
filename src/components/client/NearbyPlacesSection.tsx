import React from 'react'
import { View, Text, FlatList } from 'react-native'
import PlaceItem from './PlaceItem'
import { NearbyPlace } from '@/src/mocks/clientHome'

interface NearbyPlacesSectionProps {
  items: NearbyPlace[]
}

export default function NearbyPlacesSection({ items }: NearbyPlacesSectionProps) {
  const renderPlace = ({ item }: { item: NearbyPlace }) => (
    <PlaceItem place={item} />
  )

  return (
    <View className="px-4">
      <Text className="text-zinc-800 font-semibold text-lg mb-3">Top Places Nearby</Text>
      <FlatList
        data={items}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
