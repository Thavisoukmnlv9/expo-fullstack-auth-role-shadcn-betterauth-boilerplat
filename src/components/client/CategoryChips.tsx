import React from 'react'
import { View, ScrollView, Pressable, Text } from 'react-native'
import {
  Sparkles,
  Sun,
  Mountain,
  Utensils,
  Users
} from 'lucide-react-native'
import { Category } from '@/src/mocks/clientHome'

interface CategoryChipsProps {
  categories: Category[]
  onCategorySelect: (categoryId: string) => void
}

const iconMap = {
  Sparkles: Sparkles,
  Sun: Sun,
  Mountain: Mountain,
  Utensils: Utensils,
  Users: Users,
}

export default function CategoryChips({ categories, onCategorySelect }: CategoryChipsProps) {
  return (
    <View className="px-4 mb-4">
      <Text className="text-gray-900 font-bold text-lg mb-3">Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        <View className="flex-row space-x-3">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            const isActive = category.active

            return (
              <Pressable
                key={category.id}
                onPress={() => onCategorySelect(category.id)}
                className={`flex-row items-center px-4 py-2 rounded-full ${isActive
                    ? 'bg-orange-500'
                    : 'bg-gray-100'
                  }`}
                accessibilityRole="button"
                accessibilityLabel={`Filter by ${category.label}`}
              >
                <IconComponent
                  size={16}
                  color={isActive ? 'white' : '#6B7280'}
                />
                <Text
                  className={`ml-2 font-medium ${isActive
                      ? 'text-white'
                      : 'text-gray-600'
                    }`}
                >
                  {category.label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
