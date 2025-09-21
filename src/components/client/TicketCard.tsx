import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { QrCode, Calendar, Clock, Timer } from 'lucide-react-native'
import { Ticket } from '@/src/types/tickets'
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


  return (
    <View className="bg-white rounded-3xl  p-6 mb-4">
      {/* Package Name and Status */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-lg">{ticket.packageName}</Text>
          <Text className="text-gray-500 text-sm mt-1">{ticket.tier}</Text>
        </View>
        <View 
          style={{
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 20,
            borderWidth: 1,
            ...(ticket.status === 'active' ? { backgroundColor: '#dcfce7', borderColor: '#bbf7d0' } :
                ticket.status === 'upcoming' ? { backgroundColor: '#dbeafe', borderColor: '#bfdbfe' } :
                { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' })
          }}
        >
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color: ticket.status === 'active' ? '#15803d' :
                   ticket.status === 'upcoming' ? '#1d4ed8' : '#374151'
          }}>
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
