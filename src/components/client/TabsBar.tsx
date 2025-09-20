import React from 'react'
import { View, Text, Pressable } from 'react-native'

export type TabType = 'overview' | 'detail' | 'reviews'

interface TabsBarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export default function TabsBar({ activeTab, onTabChange }: TabsBarProps) {
  const tabs: { key: TabType; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'detail', label: 'Detail' },
    { key: 'reviews', label: 'Reviews' }
  ]

  return (
    <View className="px-4 py-2">
      <View className="flex-row bg-gray-100 rounded-full p-1">
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className={`flex-1 py-3 rounded-full ${
              activeTab === tab.key
                ? 'bg-orange-500 shadow-sm'
                : 'bg-transparent'
            }`}
            accessibilityRole="button"
            accessibilityLabel={`${tab.label} tab`}
          >
            <Text
              className={`text-center font-medium text-sm ${
                activeTab === tab.key
                  ? 'text-white'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}
