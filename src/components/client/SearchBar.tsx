import React, { useState } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import { Search } from 'lucide-react-native'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (searchText: string) => void
  onPress?: () => void
}

export default function SearchBar({ 
  placeholder = "Where you wanna go?", 
  onSearch,
  onPress 
}: SearchBarProps) {
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText)
    }
  }

  const handleTextChange = (text: string) => {
    setSearchText(text)
  }

  return (
    <View className="flex-row items-center bg-zinc-100 rounded-2xl px-4 py-3 mx-4 mb-4">
      <TextInput
        className="flex-1 text-base text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={searchText}
        onChangeText={handleTextChange}
        onPressIn={onPress}
        editable={true}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <Pressable
        onPress={handleSearch}
        className="bg-orange-500 rounded-full p-2 ml-2"
        accessibilityRole="button"
        accessibilityLabel="Search"
      >
        <Search size={20} color="white" />
      </Pressable>
    </View>
  )
}
