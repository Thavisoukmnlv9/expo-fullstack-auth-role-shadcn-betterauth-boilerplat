import React from 'react'
import { View, Text, ScrollView } from 'react-native'

export default function TicketsScreen() {
  return (
    <View className="flex-1 bg-zinc-100">
      <ScrollView className="flex-1">
        <View className="px-4 pt-4">
          <Text className="text-zinc-800 font-semibold text-2xl mb-4">My Tickets</Text>
          <Text className="text-zinc-500 text-base">
            View and manage your purchased tickets
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
