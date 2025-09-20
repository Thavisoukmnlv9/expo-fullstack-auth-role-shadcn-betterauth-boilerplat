import React from 'react'
import { View, Text } from 'react-native'
import { ShoppingCart, QrCode, Heart } from 'lucide-react-native'

interface Step {
  index: number
  title: string
  caption: string
}

interface HowItWorksProps {
  steps: Step[]
}

const stepIcons = [ShoppingCart, QrCode, Heart]
const stepColors = ['#3B82F6', '#10B981', '#8B5CF6'] // Blue, Green, Purple

export default function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <View className="px-4 bg-white m-4 p-4 rounded-2xl">
      <Text className="text-zinc-800 font-bold text-xl mb-6">How it works</Text>
      {steps.map((step, index) => {
        const IconComponent = stepIcons[index] || ShoppingCart
        const iconColor = stepColors[index] || '#3B82F6'
        return (
          <View key={step.index} className="flex-row items-center mb-8">
            <View 
              className="w-12 h-12 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: `${iconColor}20` }}
            >
              <IconComponent size={24} color={iconColor} />
            </View>
            <View className="flex-1">
              <Text className="text-zinc-800 font-bold text-lg mb-1">
                {step.title}
              </Text>
              <Text className="text-zinc-500 text-base">
                {step.caption}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}
