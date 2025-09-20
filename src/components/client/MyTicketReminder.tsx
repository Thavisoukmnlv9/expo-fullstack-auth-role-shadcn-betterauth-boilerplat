import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { TicketReminder } from '@/src/mocks/clientHome'

interface MyTicketReminderProps {
  ticket: TicketReminder
  onPress?: () => void
}

export default function MyTicketReminder({ ticket, onPress }: MyTicketReminderProps) {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-3 flex-row items-center">
      {ticket.imageUrl && (
        <Image
          source={{ uri: ticket.imageUrl }}
          className="w-12 h-12 rounded-xl mr-3"
          contentFit="cover"
        />
      )}
      
      <View className="flex-1">
        <Text className="text-zinc-800 font-semibold text-sm mb-1" numberOfLines={1}>
          {ticket.packageTitle}
        </Text>
        <Text className="text-orange-500 text-xs font-medium">
          {ticket.expiresInLabel}
        </Text>
      </View>
      
      <Pressable
        onPress={onPress}
        className="bg-sky-500 px-3 py-1 rounded-lg"
        accessibilityRole="button"
        accessibilityLabel={`${ticket.actionLabel || 'Open QR'} for ${ticket.packageTitle}`}
      >
        <Text className="text-white text-xs font-medium">
          {ticket.actionLabel || 'Open QR'}
        </Text>
      </Pressable>
    </View>
  )
}
