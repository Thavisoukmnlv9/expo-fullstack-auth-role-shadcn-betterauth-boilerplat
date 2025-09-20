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
          className="w-14 h-14 rounded-xl mr-4"
          contentFit="cover"
        />
      )}
      
      <View className="flex-1">
        <Text className="text-zinc-800 font-bold text-base mb-1" numberOfLines={1}>
          {ticket.packageTitle}
        </Text>
        <Text className="text-orange-500 text-sm font-semibold">
          {ticket.expiresInLabel}
        </Text>
      </View>
      
      <Pressable
        onPress={onPress}
        className="bg-sky-500 px-4 py-2 rounded-lg"
        accessibilityRole="button"
        accessibilityLabel={`${ticket.actionLabel || 'Open QR'} for ${ticket.packageTitle}`}
      >
        <Text className="text-white text-sm font-semibold">
          {ticket.actionLabel || 'Open QR'}
        </Text>
      </Pressable>
    </View>
  )
}
