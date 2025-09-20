import { useState } from 'react'
import { View, ScrollView, SafeAreaView, Alert } from 'react-native'
import { router } from 'expo-router'
import NewTopBar from '@/src/components/client/NewTopBar'
import SearchBar from '@/src/components/client/SearchBar'
import PromoCard from '@/src/components/client/PromoCard'
import CategoryChips from '@/src/components/client/CategoryChips'
import PlaceCard from '@/src/components/client/PlaceCard'
import SectionHeader from '@/src/components/client/SectionHeader'
import {
  mockPromotions,
  mockCategories,
  mockFeaturedPlaces,
  Category,
  FeaturedPlace
} from '@/src/mocks/clientHome'

export default function ClientHome() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [filteredPlaces, setFilteredPlaces] = useState<FeaturedPlace[]>(mockFeaturedPlaces)

  const handleNotificationPress = () => {
    console.log('Notification pressed')
  }

  const handleProfilePress = () => {
    router.push('/(protected)/(client)/account')
  }

  const handleSearchPress = () => {
    console.log('Search pressed')
  }

  const handleSearch = (searchText: string) => {
    console.log('Searching for:', searchText)
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

  const handlePromoPress = (promotion: any) => {
    if (promotion.cta.action.startsWith('coupon:')) {
      const couponCode = promotion.cta.action.split(':')[1]
      Alert.alert('Coupon Code', `Your coupon code: ${couponCode}`)
    } else if (promotion.cta.action.startsWith('navigate:')) {
      const route = promotion.cta.action.split(':')[1]
      router.push(route as any)
    }
  }

  const handlePlacePress = (place: FeaturedPlace) => {
    router.push(`/(protected)/(client)/packages?highlight=${place.id}`)
  }

  const handleSeeAllPromotions = () => {
    console.log('See all promotions')
  }

  const handleSeeAllPlaces = () => {
    router.push('/(protected)/(client)/packages')
  }

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View>
          <View className='bg-white m-4 rounded-2xl'>
            <NewTopBar
              onNotificationPress={handleNotificationPress}
              onProfilePress={handleProfilePress}
            />
            <SearchBar
              onPress={handleSearchPress}
              onSearch={handleSearch}
            />
          </View>
            <SectionHeader
              title="Promotions"
              actionText="See all"
              onAction={handleSeeAllPromotions}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
            >
              {mockPromotions.map((promotion) => (
                <PromoCard
                  key={promotion.id}
                  promotion={promotion}
                  onPress={() => handlePromoPress(promotion)}
                />
              ))}
            </ScrollView>
          <CategoryChips
            categories={categories}
            onCategorySelect={handleCategorySelect}
          />
          <SectionHeader
            title="Featured Places"
            actionText="See all"
            onAction={handleSeeAllPlaces}
          />
          <View className="px-4">
            <View className="flex-row flex-wrap justify-between">
              {filteredPlaces.map((place, index) => (
                <View key={place.id} className="w-[48%]">
                  <PlaceCard
                    place={place}
                    onPress={() => handlePlacePress(place)}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
