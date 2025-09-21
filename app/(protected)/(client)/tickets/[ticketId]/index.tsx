import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Share, SafeAreaView, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Share as ShareIcon, QrCode, MapPin } from 'lucide-react-native';
import { Ticket } from '@/src/types/tickets';
import { getTicketById } from '@/src/mocks/tickets';

export default function TicketDetailPage() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  // Get search params
  const params = useLocalSearchParams<{ ticketId: string }>();
  const ticketId = params.ticketId;

  // Load ticket data
  useEffect(() => {
    if (ticketId) {
      const foundTicket = getTicketById(ticketId);
      setTicket(foundTicket || null);
    }
    setLoading(false);
  }, [ticketId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my TripBuddy ticket: ${ticket?.packageName}`,
        url: `tripbuddy://tickets/${ticketId}`,
      });
    } catch {
      Alert.alert('Error', 'Failed to share ticket. Please try again.');
    }
  };
  const handleRefreshQR = () => {
    Alert.alert('QR Refreshed', 'Your QR code has been refreshed.');
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!ticket) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Ticket not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-gray-900 font-bold text-xl">Ticket</Text>
          <View className="w-8" />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
          {ticket?.imageUrl && (
            <Image
              source={{ uri: ticket.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
          <View className="absolute inset-0 bg-black/20" />
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-white text-2xl font-bold mb-1">{ticket?.packageName}</Text>
            <Text className="text-white/90 text-lg">{ticket?.tier}</Text>
          </View>
        </View>

        {/* Ticket Details Section */}
        <View className="px-4 py-6">
          <Text className="text-gray-900 font-bold text-xl mb-4">Ticket Details</Text>

          <View className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-orange-100 rounded-lg items-center justify-center mr-3">
                  <QrCode size={16} color="#FF6B00" />
                </View>
                <View>
                  <Text className="text-gray-900 font-bold text-lg">{ticket?.packageName}</Text>
                  <Text className="text-gray-500 text-sm">{ticket?.tier}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleShare} className="p-2">
                <ShareIcon size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* QR Code Section */}
          <View className="mb-6">
            <Text className="text-gray-900 font-bold text-xl mb-4">QR Code</Text>

            <View className="bg-yellow-100 rounded-3xl p-8 items-center mb-4">
              <View className="w-48 h-48 bg-white rounded-2xl items-center justify-center mb-4">
                <QRCode
                  value={ticket?.qrCode || 'tripbuddy://tickets/' + ticketId}
                  size={180}
                  color="#000000"
                  backgroundColor="#FFFFFF"
                  logo={require('@/assets/adaptive-icon.png')}
                  logoSize={40}
                  logoBackgroundColor="transparent"
                  logoMargin={2}
                  logoBorderRadius={8}
                />
              </View>
            </View>

            <Text className="text-center text-gray-600 font-medium mb-2">Scan to Enter</Text>
            <Text className="text-center text-gray-500 text-sm mb-4">Present this code at each attraction</Text>

            <TouchableOpacity
              onPress={handleRefreshQR}
              className="bg-orange-500 rounded-2xl py-3 px-6 self-end"
            >
              <Text className="text-white font-semibold">Refresh</Text>
            </TouchableOpacity>
          </View>

          {/* Validity Section */}
          <View className="mb-6">
            <Text className="text-gray-900 font-bold text-xl mb-4">Validity</Text>

            <View className="bg-white rounded-2xl p-4 border border-gray-100">
              <View className="space-y-3">
                <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                  <Text className="text-gray-600 font-medium">Status</Text>
                  <Text className={`font-bold capitalize ${ticket?.status === 'active' ? 'text-green-600' :
                    ticket?.status === 'upcoming' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                    {ticket?.status}
                  </Text>
                </View>

                {ticket?.activatedAt && (
                  <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                    <Text className="text-gray-600 font-medium">Activated at</Text>
                    <Text className="text-gray-900 font-medium">
                      {formatDate(ticket.activatedAt)} {formatTime(ticket.activatedAt)}
                    </Text>
                  </View>
                )}

                <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                  <Text className="text-gray-600 font-medium">Expires at</Text>
                  <Text className="text-gray-900 font-medium">
                    {formatDate(ticket?.expiresAt || '')} {formatTime(ticket?.expiresAt || '')}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between py-2">
                  <Text className="text-gray-600 font-medium">Validity</Text>
                  <Text className="text-gray-900 font-medium">{ticket?.validityRule}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Entitlements Section */}
          <View className="mb-6">
            <Text className="text-gray-900 font-bold text-xl mb-4">Entitlements</Text>

            <View className="space-y-3">
              {ticket?.entitlements.map((entitlement, index) => (
                <View key={index} className="bg-white rounded-2xl p-4 border border-gray-100">
                  <View className="flex-row items-center">
                    <MapPin size={20} color="#6B7280" className="mr-3" />
                    <View className="flex-1">
                      <Text className="text-gray-900 font-medium text-lg">{entitlement.placeName}</Text>
                      <Text className="text-gray-500 text-sm">
                        {entitlement.remainingVisits} visits remaining
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Usage History Section */}
          <View className="mb-6">
            <Text className="text-gray-900 font-bold text-xl mb-4">Usage History</Text>

            <View className="space-y-3">
              {ticket?.redemptions.map((redemption, index) => (
                <View key={index} className="bg-white rounded-2xl p-4 border border-gray-100">
                  <View className="flex-row items-center">
                    <MapPin size={20} color="#6B7280" className="mr-3" />
                    <View className="flex-1">
                      <Text className="text-gray-900 font-medium text-lg">{redemption.placeName}</Text>
                      <Text className="text-gray-500 text-sm">
                        {formatDate(redemption.usedAt)} {formatTime(redemption.usedAt)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
