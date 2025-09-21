import { useState, useEffect, useMemo, useCallback } from 'react'
import { View, Text, FlatList, SafeAreaView, Pressable, ActivityIndicator } from 'react-native'
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

  const handleOpenQR = useCallback((ticket: Ticket) => {
    try {
      router.push(`/tickets/${ticket.id}`)
    } catch {
    }
  }, [router])

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

  const handleTabChange = useCallback((tabId: TicketStatus) => {
    try {
      setActiveTab(tabId)
    } catch {
    }
  }, [])

  // Memoize render functions for FlatList
  const renderTicket = useCallback(({ item }: { item: Ticket }) => (
    <TicketCard
      ticket={item}
      onOpenQR={handleOpenQR}
    />
  ), [handleOpenQR])

  const keyExtractor = useCallback((item: Ticket) => item.id, [])

  const renderEmptyComponent = useCallback(() => (
    <View className="flex-1 justify-center items-center py-20">
      <Text className="text-gray-500 text-center">
        No {activeTab} tickets found
      </Text>
    </View>
  ), [activeTab])

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
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: isActive ? '#FF6B00' : '#F3F4F6'
                }}
                accessibilityRole="button"
                accessibilityLabel={`Filter by ${tab.label}`}
              >
                <IconComponent
                  size={16}
                  color={isActive ? 'white' : '#6B7280'}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontWeight: '500',
                    color: isActive ? 'white' : '#6B7280'
                  }}
                >
                  {tab.label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      {/* Tickets List */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center py-20">
          <ActivityIndicator size="large" color="#FF6B00" />
          <Text className="text-gray-500 text-center mt-4">
            Loading tickets...
          </Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          renderItem={renderTicket}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          getItemLayout={(data, index) => ({
            length: 200,
            offset: 200 * index,
            index,
          })}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={5}
        />
      )}
    </SafeAreaView>
  )
}
