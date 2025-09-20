import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { router } from 'expo-router'
import TopBar from '@/src/components/client/TopBar'
import GreetingCard from '@/src/components/client/GreetingCard'
import FeaturedPackagesSection from '@/src/components/client/FeaturedPackagesSection'
import NearbyPlacesSection from '@/src/components/client/NearbyPlacesSection'
import MyTicketReminder from '@/src/components/client/MyTicketReminder'
import PromoBanner from '@/src/components/client/PromoBanner'
import HowItWorks from '@/src/components/client/HowItWorks'
import BottomInset from '@/src/components/client/BottomInset'
import {
  mockUser,
  mockFeaturedPackages,
  mockNearbyPlaces,
  mockTicketReminders,
  mockPromo,
  mockSteps
} from '@/src/mocks/clientHome'

export default function ClientHome() {
  const [selectedCity, setSelectedCity] = useState(mockUser.city)

  const handleSettings = () => {
    // Navigate to settings or show settings modal
    console.log('Settings pressed')
  }

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
  }

  const handleTicketPress = () => {
    router.push('/(protected)/(client)/tickets')
  }

  return (
    <View className="flex-1 bg-zinc-100">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        <TopBar userName={mockUser.name} onSettings={handleSettings} />
        
        <GreetingCard 
          name={mockUser.name} 
          city={selectedCity} 
          onCityChange={handleCityChange}
        />
        
        <View className="mt-6" />
        
        <FeaturedPackagesSection items={mockFeaturedPackages} />
        
        <View className="mt-6" />
        
        <NearbyPlacesSection items={mockNearbyPlaces} />
        
        {/* Ticket Reminders Section */}
        <View className="px-4 mt-6">
          {mockTicketReminders.map((ticket) => (
            <MyTicketReminder
              key={ticket.id}
              ticket={ticket}
              onPress={handleTicketPress}
            />
          ))}
        </View>
        
        <PromoBanner {...mockPromo} />
        
        <HowItWorks steps={mockSteps} />
        
        <BottomInset />
      </ScrollView>
    </View>
  )
}
