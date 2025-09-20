import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView, Alert, Text, Pressable } from 'react-native'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import PlaceCard from '@/src/components/client/PlaceCard'
import CategoryChips from '@/src/components/client/CategoryChips'
import SectionHeader from '@/src/components/client/SectionHeader'
import { mockFeaturedPlaces, mockCategories, Category, FeaturedPlace } from '@/src/mocks/clientHome'

export default function PackagesScreen() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [filteredPlaces, setFilteredPlaces] = useState<FeaturedPlace[]>(mockFeaturedPlaces)

  const handleBack = () => {
    router.back()
  }

  const handleCategorySelect = (categoryId: string) => {
    const updatedCategories = categories.map(cat => ({
      ...cat,
      active: cat.id === categoryId
    }))
    setCategories(updatedCategories)

    if (categoryId === 'all') {
      setFilteredPlaces(mockFeaturedPlaces)
    } else {
      const filtered = mockFeaturedPlaces.filter(place => place.category === categoryId)
      setFilteredPlaces(filtered)
    }
  }

  const handlePlacePress = (place: FeaturedPlace) => {
    // Navigate to package detail page
    router.push(`/package-detail/${place.id}`)
  }

  const handleBuyNow = (place: FeaturedPlace) => {
    Alert.alert(
      'Proceed to Checkout',
      `Proceed to checkout for ${place.name}`,
      [{ text: 'OK' }]
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <Pressable
            onPress={handleBack}
            className="mr-3 p-1"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={24} color="#374151" />
          </Pressable>
          <Text className="text-gray-900 font-bold text-xl">Packages</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <CategoryChips 
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />

        <SectionHeader 
          title="All Packages" 
        />
        
        <View className="px-4">
          <View className="flex-row flex-wrap justify-between">
            {filteredPlaces.map((place) => (
              <View key={place.id} className="w-[48%]">
                <PlaceCard
                  place={place}
                  onPress={() => handlePlacePress(place)}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
