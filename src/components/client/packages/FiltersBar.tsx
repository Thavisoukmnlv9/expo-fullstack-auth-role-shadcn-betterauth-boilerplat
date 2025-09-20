import React from 'react'
import { View, ScrollView } from 'react-native'
import FilterChip from './FilterChip'

interface FiltersBarProps {
  values: {
    duration: string
    category: string
    price: string
    availability: string
  }
  onOpen?: (key: 'duration' | 'category' | 'price' | 'availability') => void
}

export default function FiltersBar({ values, onOpen }: FiltersBarProps) {
  const filters = [
    { key: 'duration' as const, label: 'Duration' },
    { key: 'category' as const, label: 'Category' },
    { key: 'price' as const, label: 'Price' },
    { key: 'availability' as const, label: 'Availability' },
  ]

  return (
    <View className="bg-zinc-100 px-4 pb-2">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {filters.map((filter) => (
          <FilterChip
            key={filter.key}
            label={filter.label}
            onPress={() => onOpen?.(filter.key)}
            active={false}
          />
        ))}
      </ScrollView>
    </View>
  )
}
