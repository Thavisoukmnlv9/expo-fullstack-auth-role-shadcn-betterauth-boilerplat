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
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">QR Payment</Text>
        </View>
      </View>

      <View className="flex-1 p-4">
        {/* Ticket-shaped QR Card */}
        <View className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
          <Text className="text-center text-lg font-semibold text-gray-900 mb-4">
            Please scan this QR code to pay and receive your pass
          </Text>
          
          <View className="items-center mb-4">
            <View className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
              {paymentIntent.qrImageDataUrl ? (
                <View className="w-48 h-48 bg-white rounded-lg items-center justify-center">
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
          
          <Text className="text-center text-sm text-gray-600 mb-4">
            Pay via LAO QR
          </Text>
        </View>

        {/* Bill Details */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Bill Details</Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Bill number</Text>
              <Text className="font-medium text-gray-900">{paymentIntent.id}</Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Buy time</Text>
              <Text className="font-medium text-gray-900">
                {new Date(paymentIntent.createdAt).toLocaleTimeString()}
              </Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Total amount</Text>
              <Text className="font-semibold text-gray-900">
                ₭{paymentIntent.amount.toLocaleString()}
              </Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Discount</Text>
              <Text className="font-medium text-gray-900">-0%</Text>
            </View>
          </View>
        </View>

        {/* Warning Panel */}
        {!isExpired && (
          <View className="bg-pink-50 border border-pink-200 border-dashed rounded-lg p-4 mb-6">
            <View className="flex-row items-center">
              <AlertTriangle size={20} color="#EC4899" className="mr-2" />
              <Text className="text-pink-700 font-medium flex-1">
                Please pay within 1 minute or the order will be cancelled
              </Text>
            </View>
          </View>
        )}

        {/* Expired State */}
        {isExpired && (
          <View className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
            <Text className="text-center text-gray-900 font-medium mb-2">QR Code Expired</Text>
            <Text className="text-center text-gray-500 text-sm mb-4">
              This QR code has expired. You can regenerate it to continue with your payment.
            </Text>
            <TouchableOpacity
              onPress={handleRegenerateQR}
              className="bg-orange-500 py-3 px-4 rounded-lg"
            >
              <Text className="text-white text-center font-medium">Regenerate QR</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Save QR Button */}
        <TouchableOpacity
          onPress={handleSaveQR}
          className="bg-white border border-gray-300 py-3 px-4 rounded-lg flex-row items-center justify-center"
        >
          <Download size={20} color="#374151" className="mr-2" />
          <Text className="text-gray-700 font-medium">Save QR Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
