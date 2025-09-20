import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Share, QrCode, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react-native';
import { fetcher } from '@/src/lib/fetcher';
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
    } catch (error) {
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
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <View>
              <Text className="text-lg font-semibold text-gray-900">{ticket.packageName}</Text>
              <Text className="text-sm text-gray-500 capitalize">{ticket.tier}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleShare} className="p-2">
            <Share size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* QR Panel */}
        <View className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
          <Text className="text-center text-lg font-semibold text-gray-900 mb-4">
            Your Ticket
          </Text>
          
          <View className="items-center mb-4">
            <View className="bg-gray-100 p-4 rounded-lg">
              <QRCode
                value={ticket.qrPublicId}
                size={200}
                color="#000000"
                backgroundColor="#FFFFFF"
              />
            </View>
          </View>
          
          <Text className="text-center text-sm text-gray-600">
            Show this QR code at participating locations
          </Text>
        </View>

        {/* Validity Panel */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Validity</Text>
          
          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Status</Text>
              <View className="flex-row items-center">
                <View className={`w-2 h-2 rounded-full mr-2 ${
                  ticket.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <Text className={`font-medium capitalize ${
                  ticket.status === 'active' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {ticket.status}
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Activated</Text>
              <Text className="font-medium text-gray-900">
                {formatDate(ticket.activatedAt)}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Expires</Text>
              <Text className="font-medium text-gray-900">
                {formatDate(ticket.expiresAt)}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Validity</Text>
              <Text className="font-medium text-gray-900">
                {formatRelativeTime(ticket.expiresAt)}
              </Text>
            </View>
          </View>
        </View>

        {/* Entitlements */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Entitlements</Text>
          
          <View className="space-y-4">
            {ticket.entitlements.map((entitlement, index) => (
              <View key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="font-medium text-gray-900">{entitlement.placeName}</Text>
                  <Text className="text-sm text-gray-500">
                    {entitlement.remainingVisits} of {entitlement.allowedVisits} remaining
                  </Text>
                </View>
                
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-600">Cooldown</Text>
                  <Text className="text-sm text-gray-500">
                    {entitlement.cooldownMinutes > 0 
                      ? `${entitlement.cooldownMinutes} minutes` 
                      : 'None'
                    }
                  </Text>
                </View>
                
                {entitlement.lastRedeemedAt && (
                  <View className="flex-row items-center justify-between mt-1">
                    <Text className="text-sm text-gray-600">Last used</Text>
                    <Text className="text-sm text-gray-500">
                      {formatDate(entitlement.lastRedeemedAt)}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Usage History */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Usage History</Text>
          
          {ticket.redemptions.length > 0 ? (
            <View className="space-y-3">
              {ticket.redemptions.map((redemption, index) => (
                <View key={index} className="flex-row items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <View className="flex-1">
                    <Text className="font-medium text-gray-900">{redemption.placeName}</Text>
                    <Text className="text-sm text-gray-500">
                      {formatDate(redemption.ts)}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    {redemption.success ? (
                      <CheckCircle size={16} color="#10B981" />
                    ) : (
                      <XCircle size={16} color="#EF4444" />
                    )}
                    <Text className={`ml-2 text-sm font-medium ${
                      redemption.success ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {redemption.success ? 'Success' : 'Denied'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-gray-500 text-center py-4">No usage history yet</Text>
          )}
        </View>

        {/* Help & Actions */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Help & Actions</Text>
          
          <View className="space-y-3">
            <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
              <MapPin size={20} color="#6B7280" className="mr-3" />
              <Text className="flex-1 text-gray-900">Where to scan</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleTransfer} className="flex-row items-center py-3 border-b border-gray-100">
              <Share size={20} color="#6B7280" className="mr-3" />
              <Text className="flex-1 text-gray-900">Transfer</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleAddToWallet} className="flex-row items-center py-3">
              <QrCode size={20} color="#6B7280" className="mr-3" />
              <Text className="flex-1 text-gray-900">Add to wallet</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
