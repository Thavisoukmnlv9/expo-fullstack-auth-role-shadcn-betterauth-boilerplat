import React from 'react'
import { View, Text, Image, ScrollView, FlatList } from 'react-native'
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
        <Text className="text-gray-700 text-base leading-6 mb-6">
          {packageData.overview}
        </Text>

        <View className="mb-6">
          <Text className="text-gray-900 font-bold text-lg mb-3">Photos</Text>
          <FlatList
            data={packageData.photos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{
                  width: 100,
                  height: 60,
                  backgroundColor: '#e5e7eb',
                  borderRadius: 10,
                  marginRight: 12,
                }}
                resizeMode="cover"
              />
            )}
          />
        </View>
      </View>

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
