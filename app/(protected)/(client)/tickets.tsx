import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { QrCode } from 'lucide-react-native'
import { mockTickets, getTicketsByStatus } from '@/src/mocks/tickets'
import { Ticket, TicketStatus } from '@/src/types/tickets'
import { TicketCard } from '@/src/components/client/TicketCard'

export default function TicketsScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TicketStatus>('active')
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    setTickets(getTicketsByStatus(activeTab))
  }, [activeTab])

  const handleOpenQR = (ticket: Ticket) => {
    router.push(`/tickets/${ticket.id}`)
  }

  const tabs = [
    { id: 'active' as TicketStatus, label: 'Active', count: getTicketsByStatus('active').length },
    { id: 'upcoming' as TicketStatus, label: 'Upcoming', count: getTicketsByStatus('upcoming').length },
    { id: 'expired' as TicketStatus, label: 'Expired', count: getTicketsByStatus('expired').length }
  ]

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-900 font-bold text-2xl">My Tickets</Text>
          <Pressable className="p-2">
            <QrCode size={20} color="#6B7280" />
          </Pressable>
        </View>
      </View>

      {/* Tabs */}
      <View className="px-4 py-4">
        <View className="flex-row space-x-2">
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab.id 
                  ? 'bg-white shadow-sm border border-gray-200' 
                  : 'bg-transparent'
              }`}
            >
              <Text className={`font-medium ${
                activeTab === tab.id ? 'text-orange-500' : 'text-gray-600'
              }`}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Tickets List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4">
          {tickets.length === 0 ? (
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-gray-500 text-center">
                No {activeTab} tickets found
              </Text>
            </View>
          ) : (
            tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onOpenQR={handleOpenQR}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
