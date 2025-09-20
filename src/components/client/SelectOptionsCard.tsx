import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Minus, Plus } from 'lucide-react-native'

export type Currency = 'USD' | 'LAK' | 'THB'
export type Tier = 'standard' | 'vip'

interface SelectOptionsCardProps {
  currency: Currency
  tier: Tier
  quantity: number
  onCurrencyChange: (currency: Currency) => void
  onTierChange: (tier: Tier) => void
  onQuantityChange: (quantity: number) => void
}

export default function SelectOptionsCard({
  currency,
  tier,
  quantity,
  onCurrencyChange,
  onTierChange,
  onQuantityChange
}: SelectOptionsCardProps) {
  const currencies: Currency[] = ['USD', 'LAK', 'THB']
  const tiers: { key: Tier; label: string }[] = [
    { key: 'standard', label: 'Standard' },
    { key: 'vip', label: 'Vip' }
  ]

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleQuantityIncrease = () => {
    if (quantity < 9) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <View className="mx-4 mb-4 bg-white rounded-3xl p-6 shadow-lg">
      <Text className="text-gray-900 font-bold text-lg mb-6">Select Options</Text>
      
      {/* Currency Selection */}
      <View className="mb-6">
        <Text className="text-gray-700 text-sm mb-3">Currency</Text>
        <View className="flex-row space-x-2">
          {currencies.map((curr) => (
            <Pressable
              key={curr}
              onPress={() => onCurrencyChange(curr)}
              className={`px-4 py-2 rounded-full ${
                currency === curr
                  ? 'bg-orange-500'
                  : 'bg-gray-100'
              }`}
              accessibilityRole="button"
              accessibilityLabel={`Select ${curr} currency`}
            >
              <Text
                className={`font-medium text-sm ${
                  currency === curr
                    ? 'text-white'
                    : 'text-gray-700'
                }`}
              >
                {curr}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Tier Selection */}
      <View className="mb-6">
        <Text className="text-gray-700 text-sm mb-3">Select Tier</Text>
        <View className="flex-row space-x-2">
          {tiers.map((tierOption) => (
            <Pressable
              key={tierOption.key}
              onPress={() => onTierChange(tierOption.key)}
              className={`flex-1 py-3 rounded-full ${
                tier === tierOption.key
                  ? 'bg-orange-500'
                  : 'bg-gray-100'
              }`}
              accessibilityRole="button"
              accessibilityLabel={`Select ${tierOption.label} tier`}
            >
              <Text
                className={`text-center font-medium text-sm ${
                  tier === tierOption.key
                    ? 'text-white'
                    : 'text-gray-700'
                }`}
              >
                {tierOption.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Quantity Stepper */}
      <View>
        <Text className="text-gray-700 text-sm mb-3">Quantity</Text>
        <View className="flex-row items-center justify-center space-x-4">
          <Pressable
            onPress={handleQuantityDecrease}
            disabled={quantity <= 1}
            className={`w-10 h-10 rounded-full border-2 items-center justify-center ${
              quantity <= 1
                ? 'border-gray-300'
                : 'border-gray-400'
            }`}
            accessibilityRole="button"
            accessibilityLabel="Decrease quantity"
          >
            <Minus 
              size={20} 
              color={quantity <= 1 ? '#D1D5DB' : '#6B7280'} 
            />
          </Pressable>
          
          <Text className="text-gray-900 font-bold text-lg min-w-[20px] text-center">
            {quantity}
          </Text>
          
          <Pressable
            onPress={handleQuantityIncrease}
            disabled={quantity >= 9}
            className={`w-10 h-10 rounded-full border-2 items-center justify-center ${
              quantity >= 9
                ? 'border-gray-300'
                : 'border-gray-400'
            }`}
            accessibilityRole="button"
            accessibilityLabel="Increase quantity"
          >
            <Plus 
              size={20} 
              color={quantity >= 9 ? '#D1D5DB' : '#6B7280'} 
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}
