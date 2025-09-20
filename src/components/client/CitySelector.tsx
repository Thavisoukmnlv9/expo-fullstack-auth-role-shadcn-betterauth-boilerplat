import React from 'react'
import { Pressable, Text, Alert } from 'react-native'
import { MapPin, ChevronDown } from 'lucide-react-native'

interface CitySelectorProps {
  city: string
  onPress?: () => void
  onCityChange?: (city: string) => void
}

export default function CitySelector({ city, onPress, onCityChange }: CitySelectorProps) {
  const handlePress = () => {
    if (onPress) {
      onPress()
      return
    }

    // Default behavior: show city selection alert
    Alert.alert(
      'Select City',
      'Choose your location',
      [
        { text: 'San Francisco, CA', onPress: () => onCityChange?.('San Francisco, CA') },
        { text: 'Los Angeles, CA', onPress: () => onCityChange?.('Los Angeles, CA') },
        { text: 'New York, NY', onPress: () => onCityChange?.('New York, NY') },
        { text: 'Vientiane, LA', onPress: () => onCityChange?.('Vientiane, LA') },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  return (
    <Pressable
      onPress={handlePress}
      className="bg-sky-50 border border-sky-200 rounded-full px-4 py-2 flex-row items-center space-x-2"
      accessibilityRole="button"
      accessibilityLabel={`Select city, currently ${city}`}
    >
      <MapPin size={16} color="#0369a1" />
      <Text className="text-sky-800 font-medium text-sm">{city}</Text>
      <ChevronDown size={16} color="#0369a1" />
    </Pressable>
  )
}
