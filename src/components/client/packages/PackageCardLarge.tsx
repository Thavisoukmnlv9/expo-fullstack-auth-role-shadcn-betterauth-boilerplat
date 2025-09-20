import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { PackageListItem } from '../../../types/packages'
import InlineButtons from './InlineButtons'

interface PackageCardLargeProps {
  item: PackageListItem
  onDetails?: (id: string) => void
  onBuy?: (id: string) => void
}

export default function PackageCardLarge({ 
  item, 
  onDetails, 
  onBuy 
}: PackageCardLargeProps) {
  return (
    <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Image Section */}
      <View className="relative">
        <Image
          source={{ uri: item.imageUrl }}
          className="w-full h-48 rounded-t-2xl"
          contentFit="cover"
          accessibilityLabel={`${item.title} package image`}
        />
        {item.validityBadge && (
          <View className="absolute top-3 left-3 bg-sky-100 px-2 py-0.5 rounded-full">
            <Text className="text-sky-700 text-[11px] font-medium">
              {item.validityBadge}
            </Text>
          </View>
        )}
      </View>

      {/* Body Section */}
      <View className="p-4">
        {/* Title */}
        <Text className="text-[18px] font-semibold text-zinc-800">
          {item.title}
        </Text>

        {/* Description */}
        <Text className="text-[13px] text-zinc-500 mt-1">
          {item.description}
        </Text>

        {/* Price Row */}
        <View className="flex-row justify-between items-center mt-3">
          <View className="flex-row items-baseline">
            <Text className="text-sky-600 text-[24px] font-extrabold">
              {item.price.formatted}
            </Text>
            <Text className="text-zinc-500 text-sm ml-1">
              /{item.price.currency}
            </Text>
          </View>
          <Text className="text-zinc-500 text-sm">
            Includes {item.includesPlacesCount} places
          </Text>
        </View>

        {/* Action Buttons */}
        <InlineButtons
          leftLabel="View Details"
          rightLabel="Buy Now"
          onLeft={() => onDetails?.(item.id)}
          onRight={() => onBuy?.(item.id)}
        />
      </View>
    </View>
  )
}
