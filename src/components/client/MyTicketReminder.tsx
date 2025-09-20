import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { TicketReminder } from '@/src/mocks/clientHome'

interface MyTicketReminderProps {
  ticket: TicketReminder
  onPress?: () => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700'
    case 'upcoming':
      return 'bg-blue-100 text-blue-700'
    case 'expired':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getExpirationColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-orange-500'
    case 'upcoming':
      return 'text-blue-500'
    case 'expired':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

export default function MyTicketReminder({ ticket, onPress }: MyTicketReminderProps) {
  return (
    <View className="bg-gray-50 rounded-2xl p-4 mb-3">
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <Text className="text-zinc-800 font-bold text-lg flex-1" numberOfLines={1}>
              {ticket.packageTitle}
            </Text>
            <View className={`px-3 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
              <Text className="text-xs font-semibold capitalize">
                {ticket.status}
              </Text>
            </View>
          </View>
          
          <Text className="text-zinc-600 text-sm mb-1">
            {ticket.ticketType}
          </Text>
          
          {ticket.usageDetails && (
            <Text className="text-zinc-600 text-sm mb-2">
              {ticket.usageDetails}
            </Text>
          )}
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className={`text-sm font-semibold ${getExpirationColor(ticket.status)}`}>
          {ticket.expiresInLabel}
        </Text>
        
        <Pressable
          onPress={onPress}
          className="border border-blue-500 px-4 py-2 rounded-lg flex-row items-center"
          accessibilityRole="button"
          accessibilityLabel={`${ticket.actionLabel || 'Open QR'} for ${ticket.packageTitle}`}
        >
          <Text className="text-blue-500 text-sm font-semibold mr-1">
            QR
          </Text>
          <Text className="text-blue-500 text-sm font-semibold">
            {ticket.actionLabel || 'QR'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
