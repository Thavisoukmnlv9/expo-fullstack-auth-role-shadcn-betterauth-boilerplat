import React from 'react'
import { View, Text, ScrollView, SafeAreaView, Pressable, Alert } from 'react-native'
import { User, Settings, HelpCircle, Globe, DollarSign } from 'lucide-react-native'

export default function AccountScreen() {
  const handleLanguageSelect = () => {
    Alert.alert(
      'Language',
      'Select your preferred language',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'English', onPress: () => console.log('English selected') },
        { text: 'Spanish', onPress: () => console.log('Spanish selected') },
        { text: 'French', onPress: () => console.log('French selected') }
      ]
    )
  }

  const handleCurrencySelect = () => {
    Alert.alert(
      'Currency',
      'Select your preferred currency',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'USD ($)', onPress: () => console.log('USD selected') },
        { text: 'EUR (€)', onPress: () => console.log('EUR selected') },
        { text: 'GBP (£)', onPress: () => console.log('GBP selected') }
      ]
    )
  }

  const handleSupport = () => {
    Alert.alert(
      'Support',
      'Contact our support team',
      [{ text: 'OK' }]
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-4 border-b border-gray-200">
        <Text className="text-gray-900 font-bold text-xl">Account</Text>
      </View>
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 pt-6">
          {/* Profile Section */}
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <View className="flex-row items-center mb-4">
              <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mr-4">
                <User size={32} color="#FF6B00" />
              </View>
              <View>
                <Text className="text-gray-900 font-bold text-lg">John Doe</Text>
                <Text className="text-gray-600 text-sm">john.doe@example.com</Text>
              </View>
            </View>
          </View>

          {/* Settings Section */}
          <View className="space-y-4">
            <Pressable
              onPress={handleLanguageSelect}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex-row items-center justify-between"
              accessibilityRole="button"
              accessibilityLabel="Change language"
            >
              <View className="flex-row items-center">
                <Globe size={24} color="#6B7280" />
                <Text className="text-gray-900 font-medium ml-3">Language</Text>
              </View>
              <Text className="text-gray-500">English</Text>
            </Pressable>

            <Pressable
              onPress={handleCurrencySelect}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex-row items-center justify-between"
              accessibilityRole="button"
              accessibilityLabel="Change currency"
            >
              <View className="flex-row items-center">
                <DollarSign size={24} color="#6B7280" />
                <Text className="text-gray-900 font-medium ml-3">Currency</Text>
              </View>
              <Text className="text-gray-500">USD</Text>
            </Pressable>

            <Pressable
              onPress={handleSupport}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex-row items-center justify-between"
              accessibilityRole="button"
              accessibilityLabel="Get support"
            >
              <View className="flex-row items-center">
                <HelpCircle size={24} color="#6B7280" />
                <Text className="text-gray-900 font-medium ml-3">Support</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
