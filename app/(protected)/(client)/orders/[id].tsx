import { useState, useEffect } from 'react'
import { View, Text, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Image } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { ArrowLeft, CreditCard, Eye, Clock, CheckCircle, XCircle, DollarSign, User, Mail, Calendar, MapPin } from 'lucide-react-native'
import { getOrderById } from '@/src/mocks/orders'
import { Order, OrderStatus } from '@/src/types/orders'
import { formatMoney } from '@/src/lib/formatting'

export default function OrderDetailScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      setIsLoading(true)
      const foundOrder = getOrderById(id || '')
      setOrder(foundOrder || null)
    } catch {
      setOrder(null)
    } finally {
      setIsLoading(false)
    }
  }, [id])

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
          bgColor: 'bg-orange-500',
          onPress: () => router.push(`/checkout/${order?.id}/payment`)
        }
      case 'paid':
        return {
          text: 'View Tickets',
          icon: Eye,
          enabled: true,
          bgColor: 'bg-green-500',
          onPress: () => router.push('/tickets')
        }
      case 'cancelled':
      case 'refunded':
        return {
          text: 'View Details',
          icon: Eye,
          enabled: false,
          bgColor: 'bg-gray-400',
          onPress: () => {}
        }
      default:
        return {
          text: 'View Details',
          icon: Eye,
          enabled: false,
          bgColor: 'bg-gray-400',
          onPress: () => {}
        }
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF6B00" />
          <Text className="text-gray-500 text-center mt-4">
            Loading order details...
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-gray-500 text-center text-lg">
            Order not found
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-4 bg-orange-500 px-6 py-3 rounded-2xl"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }

  const statusColors = getStatusColor(order.status)
  const StatusIcon = getStatusIcon(order.status)
  const buttonConfig = getButtonConfig(order.status)

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="p-2 -ml-2 mr-2"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={24} color="#374151" />
          </Pressable>
          <Text className="text-gray-900 font-bold text-2xl">Order Detail</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 py-6">
          {/* Order Summary Section */}
          <View className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
            <Text className="text-gray-900 font-bold text-lg mb-4">Order Summary</Text>
            
            {/* Package Image and Info */}
            <View className="flex-row items-start mb-4">
              <View className="w-16 h-16 bg-gray-200 rounded-2xl mr-4 flex items-center justify-center">
                <Text className="text-gray-500 text-xs">IMG</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-lg">{order.packageName}</Text>
                <Text className="text-gray-500 text-sm mt-1">{order.tier}</Text>
                <View className="flex-row items-center mt-2">
                  <StatusIcon size={16} color={statusColors.text} />
                  <View 
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                      backgroundColor: statusColors.bg,
                      borderWidth: 1,
                      borderColor: statusColors.border,
                      marginLeft: 8
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
              </View>
            </View>

            {/* Purchaser Info */}
            <View className="border-t border-gray-100 pt-4">
              <View className="flex-row items-center mb-2">
                <User size={16} color="#6B7280" />
                <Text className="text-gray-600 text-sm ml-2">{order.purchaserName}</Text>
              </View>
              <View className="flex-row items-center">
                <Mail size={16} color="#6B7280" />
                <Text className="text-gray-600 text-sm ml-2">{order.purchaserEmail}</Text>
              </View>
            </View>
          </View>

          {/* Payment Info Section */}
          <View className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
            <Text className="text-gray-900 font-bold text-lg mb-4">Payment Info</Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Currency</Text>
                <Text className="text-gray-900 font-semibold">{order.currencyCode}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Total Amount</Text>
                <Text className="text-gray-900 font-bold text-lg">
                  {formatMoney(order.total, order.currencyCode)}
                </Text>
              </View>
              {order.fx && (
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600">FX Rate</Text>
                  <Text className="text-gray-900 font-semibold">
                    {Object.entries(order.fx).map(([curr, rate]) => 
                      `${curr.toUpperCase()}: ${rate}`
                    ).join(', ')}
                  </Text>
                </View>
              )}
              {order.paymentMethod && (
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600">Payment Method</Text>
                  <Text className="text-gray-900 font-semibold">{order.paymentMethod}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Order Items Section */}
          <View className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
            <Text className="text-gray-900 font-bold text-lg mb-4">Order Items</Text>
            
            <View className="space-y-3">
              {order.items.map((item, index) => (
                <View key={index} className="flex-row items-center justify-between py-2">
                  <View className="flex-row items-center flex-1">
                    <MapPin size={16} color="#6B7280" />
                    <Text className="text-gray-900 font-medium ml-2 flex-1">{item.placeName}</Text>
                  </View>
                  <Text className="text-gray-600 text-sm">
                    {item.allowedVisits} visit{item.allowedVisits !== 1 ? 's' : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Timeline Section */}
          <View className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
            <Text className="text-gray-900 font-bold text-lg mb-4">Timeline</Text>
            
            <View className="space-y-4">
              <View className="flex-row items-center">
                <Calendar size={16} color="#6B7280" />
                <View className="ml-3">
                  <Text className="text-gray-900 font-medium">Order Created</Text>
                  <Text className="text-gray-600 text-sm">{formatDate(order.createdAt)}</Text>
                </View>
              </View>
              
              {order.paidAt && (
                <View className="flex-row items-center">
                  <CheckCircle size={16} color="#15803d" />
                  <View className="ml-3">
                    <Text className="text-gray-900 font-medium">Payment Completed</Text>
                    <Text className="text-gray-600 text-sm">{formatDate(order.paidAt)}</Text>
                  </View>
                </View>
              )}
              
              {order.issuedAt && (
                <View className="flex-row items-center">
                  <CheckCircle size={16} color="#15803d" />
                  <View className="ml-3">
                    <Text className="text-gray-900 font-medium">Tickets Issued</Text>
                    <Text className="text-gray-600 text-sm">{formatDate(order.issuedAt)}</Text>
                  </View>
                </View>
              )}

              {order.refundedAt && (
                <View className="flex-row items-center">
                  <DollarSign size={16} color="#6b7280" />
                  <View className="ml-3">
                    <Text className="text-gray-900 font-medium">Refunded</Text>
                    <Text className="text-gray-600 text-sm">{formatDate(order.refundedAt)}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Actions Section */}
          <View className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <Text className="text-gray-900 font-bold text-lg mb-4">Actions</Text>
            
            <Pressable
              onPress={buttonConfig.onPress}
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
