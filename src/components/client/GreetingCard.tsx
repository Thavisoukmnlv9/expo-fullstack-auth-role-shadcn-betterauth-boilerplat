import React from 'react'
import { View, Text } from 'react-native'
import CitySelector from './CitySelector'

interface GreetingCardProps {
  name: string
  city: string
  onCityChange?: (city: string) => void
}

export default function GreetingCard({ name, city, onCityChange }: GreetingCardProps) {
  return (
    <View className="px-4">
      <Text className="text-zinc-800 font-bold text-2xl tracking-tight mb-4">
        Welcome back, {name}
      </Text>
      <CitySelector city={city} onCityChange={onCityChange} />
    </View>
  )
}
