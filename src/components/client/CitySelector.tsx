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
      className="bg-sky-100 border border-sky-200 rounded-full px-4 py-3 flex-row items-center self-start"
      accessibilityRole="button"
      accessibilityLabel={`Select city, currently ${city}`}
    >
      <MapPin size={18} color="#0369a1" />
      <Text className="text-sky-800 font-semibold text-base ml-2 mr-2">{city}</Text>
      <ChevronDown size={18} color="#0369a1" />
    </Pressable>
  )
}
