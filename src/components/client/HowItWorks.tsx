import React from 'react'
import { View, Text } from 'react-native'
import { Search, CreditCard, QrCode } from 'lucide-react-native'

interface Step {
  index: number
  title: string
  caption: string
}

interface HowItWorksProps {
  steps: Step[]
}

const stepIcons = [Search, CreditCard, QrCode]

export default function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <View className="px-4">
      <Text className="text-zinc-800 font-semibold text-lg mb-4">How it works</Text>
      {steps.map((step, index) => {
        const IconComponent = stepIcons[index] || Search
        return (
          <View key={step.index} className="flex-row items-start mb-4">
            <View className="w-8 h-8 bg-sky-100 rounded-full items-center justify-center mr-3 mt-0.5">
              <IconComponent size={16} color="#0369a1" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <View className="w-5 h-5 bg-sky-500 rounded-full items-center justify-center mr-2">
                  <Text className="text-white text-xs font-bold">{step.index}</Text>
                </View>
                <Text className="text-zinc-800 font-medium text-sm">
                  {step.title}
                </Text>
              </View>
              <Text className="text-zinc-500 text-xs ml-7">
                {step.caption}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}
