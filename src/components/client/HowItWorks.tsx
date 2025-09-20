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
      <Text className="text-zinc-800 font-bold text-xl mb-6">How it works</Text>
      {steps.map((step, index) => {
        const IconComponent = stepIcons[index] || Search
        return (
          <View key={step.index} className="flex-row items-start mb-6">
            <View className="w-10 h-10 bg-sky-100 rounded-full items-center justify-center mr-4 mt-1">
              <IconComponent size={20} color="#0369a1" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 bg-sky-500 rounded-full items-center justify-center mr-3">
                  <Text className="text-white text-sm font-bold">{step.index}</Text>
                </View>
                <Text className="text-zinc-800 font-bold text-base">
                  {step.title}
                </Text>
              </View>
              <Text className="text-zinc-500 text-sm ml-9">
                {step.caption}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}
