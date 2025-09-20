import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Share } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Download, AlertTriangle } from 'lucide-react-native';
import { PaymentIntent, Order } from '@/src/types/checkout';
import { mockCheckoutData } from '@/src/mocks/checkout';
import QRCode from 'react-native-qrcode-svg';

export default function QRPaymentPage() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const [polling, setPolling] = useState(false);
  const qrRef = useRef<any>(null);

  // Mock data for now - replace with actual API calls
  useEffect(() => {
    setPaymentIntent(mockCheckoutData.paymentIntent);
    setOrder(mockCheckoutData.order);
    const expiresAt = new Date(mockCheckoutData.paymentIntent.expiresAt).getTime();
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

  // Polling for payment status
  useEffect(() => {
    if (!paymentIntent || polling) return;

    const pollPaymentStatus = async () => {
      setPolling(true);
      const interval = setInterval(async () => {
        try {
          // Mock API call - replace with actual implementation
          const status = Math.random() > 0.8 ? 'succeeded' : 'requires_payment';
          
          if (status === 'succeeded') {
            clearInterval(interval);
            // Mock API call to issue ticket
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.replace(`/tickets/${mockCheckoutData.ticket.id}`);
          } else if (timeLeft <= 0) {
            clearInterval(interval);
            setIsExpired(true);
          }
        } catch (error) {
          console.error('Error polling payment status:', error);
        }
      }, 2000);

      // Cleanup after 5 minutes
      setTimeout(() => {
        clearInterval(interval);
        setPolling(false);
      }, 300000);
    };

    pollPaymentStatus();
  }, [paymentIntent, polling, timeLeft]);


  const handleRegenerateQR = async () => {
    try {
      // Mock API call to create new payment intent
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newExpiresAt = new Date(Date.now() + 60000).toISOString();
      setPaymentIntent(prev => prev ? { ...prev, expiresAt: newExpiresAt, status: 'requires_payment' } : null);
      setTimeLeft(60);
      setIsExpired(false);
    } catch {
      Alert.alert('Error', 'Failed to regenerate QR code. Please try again.');
    }
  };

  const handleSaveQR = async () => {
    try {
      if (qrRef.current) {
        const uri = await qrRef.current.toDataURL();
        await Share.share({
          url: uri,
          message: 'TripBuddy QR Code for payment',
        });
      }
    } catch {
      Alert.alert('Error', 'Failed to save QR code. Please try again.');
    }
  };

  if (!paymentIntent || !order) {
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
      <View className="bg-gray-800 px-4 py-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white">TripBuddy Payment</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-white text-sm mr-2">Recommended</Text>
            <View className="w-6 h-6 bg-yellow-400 rounded-full items-center justify-center">
              <Text className="text-gray-800 text-xs">💡</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-1 p-4">
        {/* Ticket-shaped QR Card */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-xl border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mr-3">
              <Text className="text-white text-xs font-bold">T</Text>
            </View>
            <Text className="text-lg font-bold text-gray-900 flex-1">
              Please scan this QR code to pay and receive your pass
            </Text>
          </View>
          
          <View className="items-center mb-4">
            <View className="bg-yellow-400 p-6 rounded-2xl border-4 border-yellow-300 shadow-lg">
              {paymentIntent.qrImageDataUrl ? (
                <View className="w-48 h-48 bg-white rounded-xl items-center justify-center">
                  <Text className="text-gray-500">QR Image</Text>
                </View>
              ) : (
                <QRCode
                  ref={qrRef}
                  value={paymentIntent.qrPayload || ''}
                  size={192}
                  color="#000000"
                  backgroundColor="#FFFFFF"
                />
              )}
            </View>
          </View>
          
          <Text className="text-center text-sm text-gray-600 mb-2">
            Pay via LAO QR
          </Text>
          <Text className="text-center text-xs text-gray-500">
            LAP Net
          </Text>
        </View>

        {/* Bill Details */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
          <Text className="text-lg font-bold text-gray-900 mb-4">Bill Details</Text>
          
          <View className="space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Bill number:</Text>
              <Text className="font-medium text-gray-900">{paymentIntent.id}</Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Draw No: 110</Text>
              <Text className="text-gray-600">Buy time: {new Date(paymentIntent.createdAt).toLocaleString()}</Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Total amount</Text>
              <Text className="font-bold text-gray-900 text-lg">
                ₭{paymentIntent.amount.toLocaleString()}
              </Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600 ml-4">Discount</Text>
              <View className="bg-gray-100 px-3 py-1 rounded-lg">
                <Text className="font-medium text-gray-700">-0%</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between pt-2 border-t border-gray-100">
              <Text className="text-gray-600 font-medium">Total paid</Text>
              <Text className="font-bold text-gray-900 text-lg">
                ₭{paymentIntent.amount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Warning Panel */}
        {!isExpired && (
          <View className="bg-pink-50 border-2 border-pink-300 border-dashed rounded-2xl p-4 mb-6">
            <View className="flex-row items-center">
              <AlertTriangle size={20} color="#EC4899" className="mr-3" />
              <Text className="text-pink-700 font-bold flex-1">
                Please pay within 1 minute or the order will be cancelled
              </Text>
            </View>
          </View>
        )}

        {/* Expired State */}
        {isExpired && (
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
            <Text className="text-center text-gray-900 font-bold mb-2">QR Code Expired</Text>
            <Text className="text-center text-gray-500 text-sm mb-4">
              This QR code has expired. You can regenerate it to continue with your payment.
            </Text>
            <TouchableOpacity
              onPress={handleRegenerateQR}
              className="bg-orange-500 py-3 px-6 rounded-xl"
            >
              <Text className="text-white text-center font-bold">Regenerate QR</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Save QR Button */}
        <TouchableOpacity
          onPress={handleSaveQR}
          className="bg-yellow-400 py-4 px-6 rounded-2xl flex-row items-center justify-center shadow-lg"
        >
          <Download size={20} color="#1F2937" className="mr-2" />
          <Text className="text-gray-800 font-bold text-lg">Save QR Code</Text>
          <Text className="text-gray-600 text-lg ml-2">→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
