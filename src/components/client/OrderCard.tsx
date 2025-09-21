import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { CreditCard, Eye, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react-native'
import { Order, OrderStatus } from '@/src/types/orders'
import { formatMoney } from '@/src/lib/formatting'

interface OrderCardProps {
  order: Order
  onPress: (order: Order) => void
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { bg: '#fef3c7', border: '#fde68a', text: '#d97706' }
      case 'paid':
        return { bg: '#dcfce7', border: '#bbf7d0', text: '#15803d' }
      case 'cancelled':
        return { bg: '#fee2e2', border: '#fecaca', text: '#dc2626' }
      case 'refunded':
        return { bg: '#f3f4f6', border: '#e5e7eb', text: '#6b7280' }
      default:
        return { bg: '#f3f4f6', border: '#e5e7eb', text: '#6b7280' }
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return Clock
      case 'paid':
        return CheckCircle
      case 'cancelled':
        return XCircle
      case 'refunded':
        return DollarSign
      default:
        return Clock
    }
  }

  const getButtonConfig = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          text: 'Pay Now',
          icon: CreditCard,
          enabled: true,
          bgColor: 'bg-orange-500'
        }
      case 'paid':
        return {
          text: 'View Tickets',
          icon: Eye,
          enabled: true,
          bgColor: 'bg-green-500'
        }
      case 'cancelled':
      case 'refunded':
        return {
          text: 'View Details',
          icon: Eye,
          enabled: false,
          bgColor: 'bg-gray-400'
        }
      default:
        return {
          text: 'View Details',
          icon: Eye,
          enabled: false,
          bgColor: 'bg-gray-400'
        }
    }
  }

  const statusColors = getStatusColor(order.status)
  const buttonConfig = getButtonConfig(order.status)

  return (
    <Pressable
      onPress={() => onPress(order)}
      className="bg-white rounded-3xl  p-6 mb-4"
      accessibilityRole="button"
      accessibilityLabel={`Order ${order.packageName}`}
    >
      {/* Package Name and Status */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-lg">{order.packageName}</Text>
          <Text className="text-gray-500 text-sm mt-1">{order.tier}</Text>
        </View>
        <View 
          style={{
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor: statusColors.bg,
            borderColor: statusColors.border
          }}
        >
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color: statusColors.text
          }}>
            {order.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Order Info */}
      <View className="mb-4 space-y-2">
        <View className="flex-row items-center">
          <Clock size={16} color="#6B7280" />
          <Text className="text-gray-600 text-sm ml-2">
            {formatDate(order.createdAt)}
          </Text>
        </View>
        <View className="flex-row items-center">
          <DollarSign size={16} color="#6B7280" />
          <Text className="text-gray-900 text-sm ml-2 font-semibold">
            {formatMoney(order.total, order.currencyCode)}
          </Text>
        </View>
      </View>

      {/* CTA Button */}
      <Pressable
        onPress={() => onPress(order)}
        className={`${buttonConfig.bgColor} rounded-2xl py-4 flex-row items-center justify-center ${
          !buttonConfig.enabled ? 'opacity-50' : ''
        }`}
        disabled={!buttonConfig.enabled}
        accessibilityRole="button"
        accessibilityLabel={buttonConfig.text}
      >
        <buttonConfig.icon size={20} color="white" />
        <Text className="text-white font-semibold ml-2">{buttonConfig.text}</Text>
      </Pressable>
    </Pressable>
  )
}
