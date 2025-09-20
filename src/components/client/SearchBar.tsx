import React from 'react'
import { View, TextInput, Pressable } from 'react-native'
import { Search } from 'lucide-react-native'

interface SearchBarProps {
  placeholder?: string
  onSearch?: () => void
  onPress?: () => void
}

export default function SearchBar({ 
  placeholder = "Where you wanna go?", 
  onSearch,
  onPress 
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-white rounded-full px-4 py-3 mx-4 mb-4 shadow-sm border border-gray-200">
      <TextInput
        className="flex-1 text-base text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onPressIn={onPress}
        editable={false}
      />
      <Pressable
        onPress={onSearch}
        className="bg-orange-500 rounded-full p-2 ml-2"
        accessibilityRole="button"
        accessibilityLabel="Search"
      >
        <Search size={20} color="white" />
      </Pressable>
    </View>
  )
}
