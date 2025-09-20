import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView, Alert } from 'react-native'
import { router } from 'expo-router'
import { PackagesHeader, FiltersBar, PackageCardLarge } from '../../../src/components/client/packages'
import { mockPackages, filterOptions } from '../../../src/mocks/clientPackages'

export default function PackagesScreen() {
  const [filterValues, setFilterValues] = useState({
    duration: 'All',
    category: 'All',
    price: 'All',
    availability: 'All'
  })

  const handleBack = () => {
    router.back()
  }

  const handleFilterOpen = (key: 'duration' | 'category' | 'price' | 'availability') => {
    const options = filterOptions[key]
    Alert.alert(
      `Filter by ${key}`,
      `Available options: ${options.join(', ')}`,
      [
        { text: 'Cancel', style: 'cancel' },
        ...options.map(option => ({
          text: option,
          onPress: () => setFilterValues(prev => ({ ...prev, [key]: option }))
        }))
      ]
    )
  }

  const handleViewDetails = (id: string) => {
    const packageItem = mockPackages.find(p => p.id === id)
    Alert.alert(
      'View Details',
      `Viewing details for ${packageItem?.title}`,
      [{ text: 'OK' }]
    )
  }

  const handleBuyNow = (id: string) => {
    const packageItem = mockPackages.find(p => p.id === id)
    Alert.alert(
      'Proceed to Checkout',
      `Proceed to checkout for ${packageItem?.title}`,
      [{ text: 'OK' }]
    )
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-zinc-100">
        <PackagesHeader onBack={handleBack} />
        <FiltersBar values={filterValues} onOpen={handleFilterOpen} />
        
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <View className="px-4 pt-2 space-y-4">
            {mockPackages.map((item) => (
              <PackageCardLarge
                key={item.id}
                item={item}
                onDetails={handleViewDetails}
                onBuy={handleBuyNow}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
