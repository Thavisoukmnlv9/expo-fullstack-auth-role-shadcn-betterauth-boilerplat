import React from 'react'
import { Pressable, Text, Alert, View } from 'react-native'
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
    Alert.alert(
      'Select City',
      'Choose your location',
      [
        { text: 'Vientiane', onPress: () => onCityChange?.('Vientiane') },
        { text: 'Luang Prabang', onPress: () => onCityChange?.('Luang Prabang') },
        { text: 'Pakse', onPress: () => onCityChange?.('Pakse') },
        { text: 'Savannakhet', onPress: () => onCityChange?.('Savannakhet') },
        { text: 'Thakhek', onPress: () => onCityChange?.('Thakhek') },
        { text: 'Luang Namtha', onPress: () => onCityChange?.('Luang Namtha') },
        { text: 'Muang Xay', onPress: () => onCityChange?.('Muang Xay') },
        { text: 'Phonsavan', onPress: () => onCityChange?.('Phonsavan') },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  return (
    <Pressable
      onPress={handlePress}
      className="bg-sky-100 border border-sky-200 rounded-md px-4 py-3 flex-row "
      accessibilityRole="button"
      accessibilityLabel={`Select city, currently ${city}`}
    >
      <MapPin size={18} color="#0369a1" />
      <Text className="text-sky-800 font-semibold text-base ml-2 mr-2">{city}</Text>
      <View className="flex-row items-center ml-auto">
      <ChevronDown size={18} color="#0369a1" />
      </View>
    </Pressable>
  )
}
