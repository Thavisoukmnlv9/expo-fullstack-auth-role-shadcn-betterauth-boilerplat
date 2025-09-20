import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Share } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Share as ShareIcon, QrCode, MapPin, CheckCircle, XCircle } from 'lucide-react-native';
import { Ticket } from '@/src/types/checkout';
import { mockCheckoutData } from '@/src/mocks/checkout';
import QRCode from 'react-native-qrcode-svg';

export default function TicketDetailPage() {
  const { ticketId } = useLocalSearchParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for now - replace with actual API call
  useEffect(() => {
    setTicket(mockCheckoutData.ticket);
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

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} remaining`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} remaining`;
    } else {
      return 'Expired';
    }
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

  const handleTransfer = () => {
    Alert.alert('Coming Soon', 'Ticket transfer feature is not yet available.');
  };

  const handleAddToWallet = () => {
    Alert.alert('Coming Soon', 'Add to wallet feature is not yet available.');
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <View>
              <Text className="text-xl font-bold text-white">{ticket.packageName}</Text>
              <Text className="text-sm text-orange-100 capitalize">{ticket.tier}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleShare} className="p-2 bg-white/20 rounded-full">
            <ShareIcon size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* QR Panel */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-xl border border-gray-100">
          <View className="flex-row items-center justify-center mb-4">
            <View className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center mr-3">
              <QrCode size={16} color="white" />
            </View>
            <Text className="text-xl font-bold text-gray-900">
              Your Ticket
            </Text>
          </View>

          <View className="items-center mb-4">
            <View className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200 shadow-lg">
              <QRCode
                value={ticket.qrPublicId}
                size={200}
                color="#000000"
                backgroundColor="#FFFFFF"
              />
            </View>
          </View>

          <Text className="text-center text-sm text-gray-600 font-medium">
            Show this QR code at participating locations
          </Text>
        </View>

        {/* Validity Panel */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="w-1 h-6 bg-orange-400 rounded-full mr-3" />
            <Text className="text-lg font-bold text-gray-900">Validity</Text>
          </View>

          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600 font-medium">Status</Text>
              <View className="flex-row items-center">
                <View className={`w-3 h-3 rounded-full mr-2 ${ticket.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                <Text className={`font-bold capitalize ${ticket.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {ticket.status}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600 font-medium">Activated</Text>
              <Text className="font-bold text-gray-900">
                {formatDate(ticket.activatedAt)}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600 font-medium">Expires</Text>
              <Text className="font-bold text-gray-900">
                {formatDate(ticket.expiresAt)}
              </Text>
            </View>

            <View className="flex-row items-center justify-between pt-2 border-t border-gray-100">
              <Text className="text-gray-600 font-medium">Validity</Text>
              <Text className="font-bold text-orange-600">
                {formatRelativeTime(ticket.expiresAt)}
              </Text>
            </View>
          </View>
        </View>

        {/* Entitlements */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="w-1 h-6 bg-orange-400 rounded-full mr-3" />
            <Text className="text-lg font-bold text-gray-900">Entitlements</Text>
          </View>

          <View className="space-y-4">
            {ticket.entitlements.map((entitlement, index) => (
              <View key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="font-bold text-gray-900 text-lg">{entitlement.placeName}</Text>
                  <View className="bg-orange-100 px-3 py-1 rounded-full">
                    <Text className="text-orange-600 font-bold text-sm">
                      {entitlement.remainingVisits} of {entitlement.allowedVisits} remaining
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-600 font-medium">Cooldown</Text>
                  <Text className="text-sm text-gray-700 font-bold">
                    {entitlement.cooldownMinutes > 0
                      ? `${entitlement.cooldownMinutes} minutes`
                      : 'None'
                    }
                  </Text>
                </View>

                {entitlement.lastRedeemedAt && (
                  <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-gray-200">
                    <Text className="text-sm text-gray-600 font-medium">Last used</Text>
                    <Text className="text-sm text-gray-700 font-bold">
                      {formatDate(entitlement.lastRedeemedAt)}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Usage History */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="w-1 h-6 bg-orange-400 rounded-full mr-3" />
            <Text className="text-lg font-bold text-gray-900">Usage History</Text>
          </View>

          {ticket.redemptions.length > 0 ? (
            <View className="space-y-3">
              {ticket.redemptions.map((redemption, index) => (
                <View key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="font-bold text-gray-900 text-lg">{redemption.placeName}</Text>
                      <Text className="text-sm text-gray-600 font-medium">
                        {formatDate(redemption.ts)}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      {redemption.success ? (
                        <CheckCircle size={20} color="#10B981" />
                      ) : (
                        <XCircle size={20} color="#EF4444" />
                      )}
                      <Text className={`ml-2 text-sm font-bold ${redemption.success ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {redemption.success ? 'Success' : 'Denied'}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <Text className="text-gray-500 text-center font-medium">No usage history yet</Text>
            </View>
          )}
        </View>

        {/* Help & Actions */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="w-1 h-6 bg-orange-400 rounded-full mr-3" />
            <Text className="text-lg font-bold text-gray-900">Help & Actions</Text>
          </View>

          <View className="space-y-2">
            <TouchableOpacity className="bg-gray-50 rounded-xl p-4 border border-gray-100 active:bg-gray-100">
              <View className="flex-row items-center">
                <MapPin size={20} color="#6B7280" className="mr-3" />
                <Text className="flex-1 text-gray-900 font-medium">Where to scan</Text>
                <Text className="text-gray-400 text-lg">›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleTransfer} className="bg-gray-50 rounded-xl p-4 border border-gray-100 active:bg-gray-100">
              <View className="flex-row items-center">
                <ShareIcon size={20} color="#6B7280" className="mr-3" />
                <Text className="flex-1 text-gray-900 font-medium">Transfer</Text>
                <Text className="text-gray-400 text-lg">›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAddToWallet} className="bg-gray-50 rounded-xl p-4 border border-gray-100 active:bg-gray-100">
              <View className="flex-row items-center">
                <QrCode size={20} color="#6B7280" className="mr-3" />
                <Text className="flex-1 text-gray-900 font-medium">Add to wallet</Text>
                <Text className="text-gray-400 text-lg">›</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
