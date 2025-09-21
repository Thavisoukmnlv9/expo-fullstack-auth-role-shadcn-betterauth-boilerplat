import { useState, useEffect, useMemo } from 'react'
import { View, Text, ScrollView, SafeAreaView, Pressable, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { ShoppingBag, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react-native'
import { getOrdersByStatus } from '@/src/mocks/orders'
import { Order, OrderStatus } from '@/src/types/orders'
import { OrderCard } from '@/src/components/client/OrderCard'

export default function OrdersScreen() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all')
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        try {
            setIsLoading(true)
            const filteredOrders = getOrdersByStatus(activeTab)
            console.log('Found orders:', filteredOrders.length)
            setOrders(filteredOrders)
        } catch {
            setOrders([])
        } finally {
            setIsLoading(false)
        }
    }, [activeTab])

    const handleOrderPress = (order: Order) => {
        try {
            router.push(`/orders/${order.id}`)
        } catch {
        }
    }

    const tabs = useMemo(() => {
        try {
            return [
                { id: 'all' as const, label: 'All', count: getOrdersByStatus('all').length, icon: ShoppingBag },
                { id: 'pending' as OrderStatus, label: 'Pending', count: getOrdersByStatus('pending').length, icon: Clock },
                { id: 'paid' as OrderStatus, label: 'Paid', count: getOrdersByStatus('paid').length, icon: CheckCircle },
                { id: 'cancelled' as OrderStatus, label: 'Cancelled', count: getOrdersByStatus('cancelled').length, icon: XCircle },
                { id: 'refunded' as OrderStatus, label: 'Refunded', count: getOrdersByStatus('refunded').length, icon: DollarSign }
            ]
        } catch {
            return [
                { id: 'all' as const, label: 'All', count: 0, icon: ShoppingBag },
                { id: 'pending' as OrderStatus, label: 'Pending', count: 0, icon: Clock },
                { id: 'paid' as OrderStatus, label: 'Paid', count: 0, icon: CheckCircle },
                { id: 'cancelled' as OrderStatus, label: 'Cancelled', count: 0, icon: XCircle },
                { id: 'refunded' as OrderStatus, label: 'Refunded', count: 0, icon: DollarSign }
            ]
        }
    }, [])

    const handleTabChange = (tabId: OrderStatus | 'all') => {
        try {
            setActiveTab(tabId)
        } catch {
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-zinc-100">
            {/* Header */}
            <View className="px-4 py-4 ">
                <View className="flex-row items-center justify-between">
                    <Text className="text-gray-900 font-bold text-2xl">My Orders</Text>
                    <Pressable className="p-2">
                        <ShoppingBag size={20} color="#6B7280" />
                    </Pressable>
                </View>
            </View>

            {/* Tabs */}
            <View className="px-4 py-4">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 16 }}
                >
                    <View className="flex-row space-x-3">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon
                            const isActive = activeTab === tab.id

                            return (
                                <Pressable
                                    key={tab.id}
                                    onPress={() => handleTabChange(tab.id)}
                                    className={`flex-row items-center px-4 py-2 rounded-full ${isActive ? 'bg-orange-500' : 'bg-gray-100'
                                        }`}
                                    accessibilityRole="button"
                                    accessibilityLabel={`Filter by ${tab.label}`}
                                >
                                    <IconComponent
                                        size={16}
                                        color={isActive ? 'white' : '#6B7280'}
                                    />
                                    <Text
                                        className={`ml-2 font-medium ${isActive ? 'text-white' : 'text-gray-600'
                                            }`}
                                    >
                                        {tab.label}
                                    </Text>
                                    {tab.count > 0 && (
                                        <View className={`ml-2 px-2 py-1 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-200'
                                            }`}>
                                            <Text className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-600'
                                                }`}>
                                                {tab.count}
                                            </Text>
                                        </View>
                                    )}
                                </Pressable>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>

            {/* Orders List */}
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View className="px-4">
                    {isLoading ? (
                        <View className="flex-1 justify-center items-center py-20">
                            <ActivityIndicator size="large" color="#FF6B00" />
                            <Text className="text-gray-500 text-center mt-4">
                                Loading orders...
                            </Text>
                        </View>
                    ) : orders.length === 0 ? (
                        <View className="flex-1 justify-center items-center py-20">
                            <Text className="text-gray-500 text-center">
                                No {activeTab === 'all' ? '' : activeTab} orders found
                            </Text>
                        </View>
                    ) : (
                        orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onPress={handleOrderPress}
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
