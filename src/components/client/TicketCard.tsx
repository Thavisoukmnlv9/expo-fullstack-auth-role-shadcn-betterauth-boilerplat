import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { QrCode, Calendar, Clock, Timer } from 'lucide-react-native'
import { Ticket, TicketStatus } from '@/src/types/tickets'
import { useCountdown } from '@/src/hooks/useCountdown'

interface TicketCardProps {
  ticket: Ticket
  onOpenQR: (ticket: Ticket) => void
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onOpenQR }) => {
  const timeLeft = useCountdown(ticket.expiresAt)

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusPillStyle = (status: TicketStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 border-green-200'
      case 'upcoming':
        return 'bg-blue-100 border-blue-200'
      case 'expired':
        return 'bg-gray-100 border-gray-200'
      default:
        return 'bg-gray-100 border-gray-200'
    }
  }

  const getStatusTextStyle = (status: TicketStatus) => {
    switch (status) {
      case 'active':
        return 'text-green-700'
      case 'upcoming':
        return 'text-blue-700'
      case 'expired':
        return 'text-gray-700'
      default:
        return 'text-gray-700'
    }
  }

  return (
    <View className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-4">
      {/* Package Name and Status */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-lg">{ticket.packageName}</Text>
          <Text className="text-gray-500 text-sm mt-1">{ticket.tier}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full border ${getStatusPillStyle(ticket.status)}`}>
          <Text className={`text-xs font-medium ${getStatusTextStyle(ticket.status)}`}>
            {ticket.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Validity Info */}
      <View className="mb-4 space-y-2">
        <View className="flex-row items-center">
          <Calendar size={16} color="#6B7280" />
          <Text className="text-gray-600 text-sm ml-2">{ticket.validityRule}</Text>
        </View>
        <View className="flex-row items-center">
          <Clock size={16} color="#6B7280" />
          <Text className="text-gray-600 text-sm ml-2">
            Expires: {formatExpiryDate(ticket.expiresAt)}
          </Text>
        </View>
        {ticket.status === 'active' && timeLeft && timeLeft !== 'Expired' && (
          <View className="flex-row items-center">
            <Timer size={16} color="#FF6B00" />
            <Text className="text-orange-500 text-sm ml-2 font-medium">
              {timeLeft} remaining
            </Text>
          </View>
        )}
      </View>

      {/* CTA Button */}
      <Pressable
        onPress={() => onOpenQR(ticket)}
        className="bg-orange-500 rounded-2xl py-4 flex-row items-center justify-center"
        accessibilityRole="button"
        accessibilityLabel="Open QR Code"
      >
        <QrCode size={20} color="white" />
        <Text className="text-white font-semibold ml-2">Open QR</Text>
      </Pressable>
    </View>
  )
}
