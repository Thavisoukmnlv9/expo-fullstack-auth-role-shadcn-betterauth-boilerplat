import React from 'react'
import { View, Text, ScrollView, SafeAreaView, Pressable, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { QrCode } from 'lucide-react-native'
import { mockTickets, Ticket } from '@/src/mocks/clientHome'

export default function TicketsScreen() {
  const router = useRouter()

  const handleOpenQR = (ticket: Ticket) => {
    router.push(`/tickets/${ticket.id}`)
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-4 border-b border-gray-200">
        <Text className="text-gray-900 font-bold text-xl">My Tickets</Text>
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 pt-4">
          {mockTickets.map((ticket) => (
            <View key={ticket.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-900 font-bold text-lg">{ticket.packageName}</Text>
                <View className={`px-3 py-1 rounded-full ${ticket.status === 'active' ? 'bg-green-100' :
                    ticket.status === 'upcoming' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                  <Text className={`text-xs font-medium ${ticket.status === 'active' ? 'text-green-700' :
                      ticket.status === 'upcoming' ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                    {ticket.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text className="text-gray-600 text-sm mb-2">{ticket.tier}</Text>
              <Text className="text-gray-600 text-sm mb-4">{ticket.validity}</Text>

              <Pressable
                onPress={() => handleOpenQR(ticket)}
                className="bg-orange-500 rounded-xl py-3 flex-row items-center justify-center"
                accessibilityRole="button"
                accessibilityLabel="Open QR Code"
              >
                <QrCode size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Open QR</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
