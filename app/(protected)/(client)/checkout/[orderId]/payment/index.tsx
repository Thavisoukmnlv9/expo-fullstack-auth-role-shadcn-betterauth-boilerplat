import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, CreditCard, Smartphone } from 'lucide-react-native';
import { Order } from '@/src/types/checkout';
import { mockCheckoutData } from '@/src/mocks/checkout';

export default function ChoosePaymentPage() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data for now - replace with actual API call
  useEffect(() => {
    setOrder(mockCheckoutData.order);
    const expiresAt = new Date(mockCheckoutData.order.expiresAt).getTime();
    const now = Date.now();
    setTimeLeft(Math.max(0, Math.floor((expiresAt - now) / 1000)));
  }, [orderId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRegenerateOrder = async () => {
    try {
      setLoading(true);
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newExpiresAt = new Date(Date.now() + 60000).toISOString();
      setOrder(prev => prev ? { ...prev, expiresAt: newExpiresAt } : null);
      setTimeLeft(60);
      setIsExpired(false);
    } catch {
      Alert.alert('Error', 'Failed to regenerate order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentMethod = async (method: string) => {
    if (method === 'LAO_QR') {
      try {
        setLoading(true);
        // Mock API call to create payment intent
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push(`/checkout/${orderId}/payment/qr`);
    } catch {
      Alert.alert('Error', 'Failed to create payment intent. Please try again.');
    } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Coming Soon', 'This payment method is not yet available.');
    }
  };

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">Choose Payment Method</Text>
        </View>
      </View>

      <View className="flex-1 p-4">
        {/* Order Summary Card */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-medium text-gray-500">Order Summary</Text>
            {!isExpired ? (
              <View className="flex-row items-center bg-red-50 px-2 py-1 rounded-full">
                <Clock size={14} color="#DC2626" />
                <Text className="text-red-600 text-sm font-medium ml-1">
                  {formatTime(timeLeft)}
                </Text>
              </View>
            ) : (
              <View className="bg-red-100 px-2 py-1 rounded-full">
                <Text className="text-red-600 text-sm font-medium">Expired</Text>
              </View>
            )}
          </View>

          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Total amount</Text>
              <Text className="font-semibold text-gray-900">
                ₭{order.total.toLocaleString()}
              </Text>
            </View>
            {order.totalInBase && (
              <View className="flex-row justify-between">
                <Text className="text-gray-500 text-sm">≈ ${order.totalInBase.toFixed(2)}</Text>
              </View>
            )}
            {order.purchaserEmail && (
              <View className="flex-row justify-between">
                <Text className="text-gray-600 text-sm">Purchaser</Text>
                <Text className="text-gray-500 text-sm">{order.purchaserEmail}</Text>
              </View>
            )}
          </View>
        </View>

        {isExpired ? (
          <View className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
            <Text className="text-center text-gray-900 font-medium mb-2">Order Expired</Text>
            <Text className="text-center text-gray-500 text-sm mb-4">
              This order has expired. You can regenerate it to continue with your purchase.
            </Text>
            <TouchableOpacity
              onPress={handleRegenerateOrder}
              disabled={loading}
              className="bg-orange-500 py-3 px-4 rounded-lg"
            >
              <Text className="text-white text-center font-medium">
                {loading ? 'Regenerating...' : 'Regenerate Order'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Payment Methods */}
            <View className="space-y-3">
              <Text className="text-lg font-semibold text-gray-900 mb-3">Payment Methods</Text>
              
              {/* LAO QR Payment */}
              <TouchableOpacity
                onPress={() => handlePaymentMethod('LAO_QR')}
                disabled={loading}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 active:bg-gray-50"
              >
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-orange-100 rounded-lg items-center justify-center mr-4">
                    <CreditCard size={24} color="#FF6B00" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-medium text-gray-900">LAO QR Payment</Text>
                    <Text className="text-sm text-gray-500">Scan QR code to pay</Text>
                  </View>
                  <View className="bg-orange-100 px-2 py-1 rounded-full">
                    <Text className="text-orange-600 text-xs font-medium">Primary</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Membership Card */}
              <TouchableOpacity
                onPress={() => handlePaymentMethod('MEMBERSHIP_CARD')}
                disabled={loading}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 active:bg-gray-50"
              >
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center mr-4">
                    <CreditCard size={24} color="#6B7280" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-medium text-gray-900">Membership Card</Text>
                    <Text className="text-sm text-gray-500">Coming soon</Text>
                  </View>
                  <View className="bg-gray-100 px-2 py-1 rounded-full">
                    <Text className="text-gray-500 text-xs font-medium">Stub</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Bank / Wallet / Phone */}
              <TouchableOpacity
                onPress={() => handlePaymentMethod('BANK_WALLET_PHONE')}
                disabled={loading}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 active:bg-gray-50"
              >
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center mr-4">
                    <Smartphone size={24} color="#6B7280" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-medium text-gray-900">Bank / Wallet / Phone</Text>
                    <Text className="text-sm text-gray-500">Coming soon</Text>
                  </View>
                  <View className="bg-gray-100 px-2 py-1 rounded-full">
                    <Text className="text-gray-500 text-xs font-medium">Stub</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
