import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Star } from 'lucide-react-native'
import { PackageDetail } from '@/src/mocks/packageDetail'
import SelectOptionsCard, { Currency, Tier } from './SelectOptionsCard'

interface ReviewsTabProps {
  packageData: PackageDetail
  currency: Currency
  tier: Tier
  quantity: number
  onCurrencyChange: (currency: Currency) => void
  onTierChange: (tier: Tier) => void
  onQuantityChange: (quantity: number) => void
}

export default function ReviewsTab({
  packageData,
  currency,
  tier,
  quantity,
  onCurrencyChange,
  onTierChange,
  onQuantityChange
}: ReviewsTabProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color="#FCD34D"
        fill={index < rating ? "#FCD34D" : "transparent"}
      />
    ))
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="px-4 py-4">
        {/* Reviews */}
        {packageData.reviews.map((review, index) => (
          <View key={index} className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-start mb-3">
              {/* Avatar */}
              <View className="w-10 h-10 bg-orange-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-sm">
                  {getInitials(review.author)}
                </Text>
              </View>
              
              {/* Review Content */}
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-base mb-1">
                  {review.author}
                </Text>
                <View className="flex-row items-center mb-2">
                  {renderStars(review.rating)}
                </View>
                <Text className="text-gray-700 text-base leading-6">
                  {review.text}
                </Text>
              </View>
            </View>
          </View>
        ))}
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
