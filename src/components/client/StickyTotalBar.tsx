import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { formatMoney } from '@/src/lib/formatting'
import { Currency, Tier } from './SelectOptionsCard'

interface StickyTotalBarProps {
  currency: Currency
  tier: Tier
  quantity: number
  totalPrice: number
  onBookNow: () => void
}

export default function StickyTotalBar({
  currency,
  tier,
  quantity,
  totalPrice,
  onBookNow
}: StickyTotalBarProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <View className="flex-row items-center justify-between px-4 py-4">
        {/* Total Display */}
        <View className="flex-1">
          <Text className="text-gray-500 text-sm">Total</Text>
          <Text className="text-gray-900 font-bold text-xl">
            {formatMoney(totalPrice, currency)}
          </Text>
        </View>
        
        {/* Book Now Button */}
        <Pressable
          onPress={onBookNow}
          className="bg-orange-500 px-8 py-4 rounded-full shadow-lg"
          accessibilityRole="button"
          accessibilityLabel="Book now"
        >
          <Text className="text-white font-bold text-lg">Book Now</Text>
        </Pressable>
      </View>
    </View>
  )
}
