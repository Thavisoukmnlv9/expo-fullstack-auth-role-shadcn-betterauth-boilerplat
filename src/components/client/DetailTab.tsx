import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Check } from 'lucide-react-native'
import { PackageDetail } from '@/src/mocks/packageDetail'
import SelectOptionsCard, { Currency, Tier } from './SelectOptionsCard'

interface DetailTabProps {
  packageData: PackageDetail
  currency: Currency
  tier: Tier
  quantity: number
  onCurrencyChange: (currency: Currency) => void
  onTierChange: (tier: Tier) => void
  onQuantityChange: (quantity: number) => void
}

export default function DetailTab({
  packageData,
  currency,
  tier,
  quantity,
  onCurrencyChange,
  onTierChange,
  onQuantityChange
}: DetailTabProps) {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="px-4 py-4">
        <View className="mb-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">What&apos;s Included</Text>
          <View className="space-y-3">
            {packageData.included.map((item, index) => (
              <View key={index} className="flex-row items-start">
                <Check size={20} color="#10B981" className="mr-3 mt-0.5" />
                <Text className="text-gray-700 text-base flex-1">
                  {item}
                </Text>
              </View>
            ))}
          </View>
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
