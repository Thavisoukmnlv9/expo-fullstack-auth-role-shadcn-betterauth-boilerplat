import { useState, useEffect, useMemo } from 'react'
import { View, Text, ScrollView, SafeAreaView, Pressable, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { QrCode, CheckCircle, Clock, XCircle } from 'lucide-react-native'
import { getTicketsByStatus } from '@/src/mocks/tickets'
import { Ticket, TicketStatus } from '@/src/types/tickets'
import { TicketCard } from '@/src/components/client/TicketCard'

export default function TicketsScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TicketStatus>('active')
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const filteredTickets = getTicketsByStatus(activeTab)
      console.log('Found tickets:', filteredTickets.length)
      setTickets(filteredTickets)
    } catch {
      setTickets([])
    } finally {
      setIsLoading(false)
    }
  }, [activeTab])

  const handleOpenQR = (ticket: Ticket) => {
    try {
      router.push(`/tickets/${ticket.id}`)
    } catch {
    }
  }

  const tabs = useMemo(() => {
    try {
      return [
        { id: 'active' as TicketStatus, label: 'Active', count: getTicketsByStatus('active').length, icon: CheckCircle },
        { id: 'upcoming' as TicketStatus, label: 'Upcoming', count: getTicketsByStatus('upcoming').length, icon: Clock },
        { id: 'expired' as TicketStatus, label: 'Expired', count: getTicketsByStatus('expired').length, icon: XCircle }
      ]
    } catch {
      return [
        { id: 'active' as TicketStatus, label: 'Active', count: 0, icon: CheckCircle },
        { id: 'upcoming' as TicketStatus, label: 'Upcoming', count: 0, icon: Clock },
        { id: 'expired' as TicketStatus, label: 'Expired', count: 0, icon: XCircle }
      ]
    }
  }, [])

  const handleTabChange = (tabId: TicketStatus) => {
    try {
      setActiveTab(tabId)
    } catch {
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-100">
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
        <View className="flex-row space-x-3">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <Pressable
                key={tab.id}
                onPress={() => handleTabChange(tab.id)}
                className={`flex-row items-center px-4 py-2 rounded-full ${
                  isActive ? 'bg-orange-500' : 'bg-gray-100'
                }`}
                accessibilityRole="button"
                accessibilityLabel={`Filter by ${tab.label}`}
              >
                <IconComponent
                  size={16}
                  color={isActive ? 'white' : '#6B7280'}
                />
                <Text
                  className={`ml-2 font-medium ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      {/* Tickets List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4">
          {isLoading ? (
            <View className="flex-1 justify-center items-center py-20">
              <ActivityIndicator size="large" color="#FF6B00" />
              <Text className="text-gray-500 text-center mt-4">
                Loading tickets...
              </Text>
            </View>
          ) : tickets.length === 0 ? (
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
