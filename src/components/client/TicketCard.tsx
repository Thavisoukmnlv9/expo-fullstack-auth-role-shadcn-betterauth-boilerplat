import React, { useMemo, useCallback } from 'react'
import { View, Text, Pressable } from 'react-native'
import { QrCode, Calendar, Clock, Timer } from 'lucide-react-native'
import { Ticket } from '@/src/types/tickets'
import { useCountdown } from '@/src/hooks/useCountdown'

interface TicketCardProps {
  ticket: Ticket
  onOpenQR: (ticket: Ticket) => void
}

const TicketCardComponent: React.FC<TicketCardProps> = ({ ticket, onOpenQR }) => {
  const timeLeft = useCountdown(ticket.expiresAt)

  const formatExpiryDate = useCallback((dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }, [])

  const handlePress = useCallback(() => {
    onOpenQR(ticket)
  }, [onOpenQR, ticket])

  // Memoize status styles to prevent recreation
  const statusStyles = useMemo(() => {
    const baseStyle = {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
      borderWidth: 1,
    }

    switch (ticket.status) {
      case 'active':
        return {
          ...baseStyle,
          backgroundColor: '#dcfce7',
          borderColor: '#bbf7d0'
        }
      case 'upcoming':
        return {
          ...baseStyle,
          backgroundColor: '#dbeafe',
          borderColor: '#bfdbfe'
        }
      default:
        return {
          ...baseStyle,
          backgroundColor: '#f3f4f6',
          borderColor: '#e5e7eb'
        }
    }
  }, [ticket.status])

  const statusTextColor = useMemo(() => {
    switch (ticket.status) {
      case 'active':
        return '#15803d'
      case 'upcoming':
        return '#1d4ed8'
      default:
        return '#374151'
    }
  }, [ticket.status])

  const formattedDate = useMemo(() => formatExpiryDate(ticket.expiresAt), [ticket.expiresAt, formatExpiryDate])


  return (
    <View className="bg-white rounded-3xl p-6 mb-4">
      {/* Package Name and Status */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-lg">{ticket.packageName}</Text>
          <Text className="text-gray-500 text-sm mt-1">{ticket.tier}</Text>
        </View>
        <View style={statusStyles}>
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color: statusTextColor
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
            Expires: {formattedDate}
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
        onPress={handlePress}
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

TicketCardComponent.displayName = 'TicketCard';

export const TicketCard = React.memo(TicketCardComponent);
