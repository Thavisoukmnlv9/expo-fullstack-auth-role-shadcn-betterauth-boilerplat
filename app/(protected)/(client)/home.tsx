import { useState, useMemo, useCallback } from 'react'
import { View, FlatList, SafeAreaView, Alert } from 'react-native'
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

  const handleNotificationPress = useCallback(() => {
    console.log('Notification pressed')
  }, [])

  const handleProfilePress = useCallback(() => {
    router.push('/(protected)/(client)/account')
  }, [])

  const handleSearchPress = useCallback(() => {
    console.log('Search pressed')
  }, [])

  const handleSearch = useCallback((searchText: string) => {
    console.log('Searching for:', searchText)
  }, [])

  const handleCategorySelect = useCallback((categoryId: string) => {
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
  }, [categories])

  const handlePromoPress = useCallback((promotion: any) => {
    if (promotion.cta.action.startsWith('coupon:')) {
      const couponCode = promotion.cta.action.split(':')[1]
      Alert.alert('Coupon Code', `Your coupon code: ${couponCode}`)
    } else if (promotion.cta.action.startsWith('navigate:')) {
      const route = promotion.cta.action.split(':')[1]
      router.push(route as any)
    }
  }, [])

  const handlePlacePress = useCallback((place: FeaturedPlace) => {
    router.push(`/(protected)/(client)/packages/show/:id${place.id}`)
  }, [])

  const handleSeeAllPromotions = useCallback(() => {
    console.log('See all promotions')
  }, [])

  const handleSeeAllPlaces = useCallback(() => {
    router.push('/(protected)/(client)/packages/page')
  }, [])

  // Memoize filtered places to prevent unnecessary recalculations
  const memoizedFilteredPlaces = useMemo(() => filteredPlaces, [filteredPlaces])

  // Memoize render functions for FlatList
  const renderPromo = useCallback(({ item }: { item: any }) => (
    <PromoCard
      promotion={item}
      onPress={() => handlePromoPress(item)}
    />
  ), [handlePromoPress])

  const renderPlace = useCallback(({ item }: { item: FeaturedPlace }) => (
    <View className="w-[48%]">
      <PlaceCard
        place={item}
        onPress={() => handlePlacePress(item)}
      />
    </View>
  ), [handlePlacePress])

  const keyExtractor = useCallback((item: any) => item.id, [])

  // Create sections for FlatList
  const sections = useMemo(() => [
    {
      id: 'header',
      type: 'header',
      data: [{}]
    },
    {
      id: 'promotions',
      type: 'promotions',
      data: mockPromotions
    },
    {
      id: 'categories',
      type: 'categories',
      data: [{}]
    },
    {
      id: 'places',
      type: 'places',
      data: memoizedFilteredPlaces
    }
  ], [memoizedFilteredPlaces])

  const renderSectionItem = useCallback(({ item }: { item: any }) => {
    switch (item.type) {
      case 'header':
        return (
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
        )
      case 'promotions':
        return (
          <>
            <SectionHeader
              title="Promotions"
              actionText="See all"
              onAction={handleSeeAllPromotions}
            />
            <FlatList
              data={mockPromotions}
              renderItem={renderPromo}
              keyExtractor={keyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
            />
          </>
        )
      case 'categories':
        return (
          <CategoryChips
            categories={categories}
            onCategorySelect={handleCategorySelect}
          />
        )
      case 'places':
        return (
          <>
            <SectionHeader
              title="Featured Places"
              actionText="See all"
              onAction={handleSeeAllPlaces}
            />
            <View className="px-4">
              <FlatList
                data={memoizedFilteredPlaces}
                renderItem={renderPlace}
                keyExtractor={keyExtractor}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                scrollEnabled={false}
              />
            </View>
          </>
        )
      default:
        return null
    }
  }, [
    handleNotificationPress,
    handleProfilePress,
    handleSearchPress,
    handleSearch,
    handleSeeAllPromotions,
    handleSeeAllPlaces,
    categories,
    handleCategorySelect,
    renderPromo,
    renderPlace,
    keyExtractor,
    memoizedFilteredPlaces
  ])

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={sections}
        renderItem={renderSectionItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={3}
      />
    </SafeAreaView>
  )
}
