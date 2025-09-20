import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { PackageDetail } from '@/src/mocks/packageDetail'
import SelectOptionsCard, { Currency, Tier } from './SelectOptionsCard'

interface OverviewTabProps {
  packageData: PackageDetail
  currency: Currency
  tier: Tier
  quantity: number
  onCurrencyChange: (currency: Currency) => void
  onTierChange: (tier: Tier) => void
  onQuantityChange: (quantity: number) => void
}

export default function OverviewTab({
  packageData,
  currency,
  tier,
  quantity,
  onCurrencyChange,
  onTierChange,
  onQuantityChange
}: OverviewTabProps) {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="px-4 py-4">
        {/* Description */}
        <Text className="text-gray-700 text-base leading-6 mb-6">
          {packageData.overview}
        </Text>
        
        {/* Photos Section */}
        <View className="mb-6">
          <Text className="text-gray-900 font-bold text-lg mb-3">Photos</Text>
          <View className="flex-row space-x-3">
            {packageData.photos.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo }}
                className="w-20 h-20 rounded-lg"
                resizeMode="cover"
              />
            ))}
          </View>
        </View>
      </View>
      
      {/* Select Options Card */}
      <SelectOptionsCard
        currency={currency}
        tier={tier}
        quantity={quantity}
        onCurrencyChange={onCurrencyChange}
        onTierChange={onTierChange}
        onQuantityChange={onQuantityChange}
      />
    </ScrollView>
  )
}
