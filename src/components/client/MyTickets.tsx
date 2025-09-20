import React from 'react'
import { View, Text, Pressable } from 'react-native'
import MyTicketReminder from './MyTicketReminder'
import { TicketReminder } from '@/src/mocks/clientHome'

interface MyTicketsProps {
  tickets: TicketReminder[]
  onTicketPress?: () => void
  onViewAllPress?: () => void
}

export default function MyTickets({ tickets, onTicketPress, onViewAllPress }: MyTicketsProps) {
  return (
    <View className="px-4 mt-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-zinc-800 font-bold text-xl">Your Tickets</Text>
        <Pressable onPress={onViewAllPress}>
          <Text className="text-blue-500 text-sm font-medium">View all</Text>
        </Pressable>
      </View>
      {tickets.map((ticket) => (
        <MyTicketReminder
          key={ticket.id}
          ticket={ticket}
          onPress={onTicketPress}
        />
      ))}
    </View>
  )
}
