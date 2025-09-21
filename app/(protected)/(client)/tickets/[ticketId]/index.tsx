import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Share, SafeAreaView, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Share as ShareIcon, QrCode, MapPin, Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react-native';
import { Ticket } from '@/src/types/tickets';
import { getTicketById } from '@/src/mocks/tickets';
import { push } from 'expo-router/build/global-state/routing';

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
  const handleBack = () => {
    push('/tickets');
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
      <ScrollView className="flex-1  bg-zinc-100" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => handleBack()}
              className="p-2 -ml-2 rounded-full bg-gray-100 active:bg-gray-200"
            >
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <Text className="text-gray-900 font-bold text-xl">Ticket Details</Text>
              <Text className="text-gray-500 text-sm mt-1">#{ticketId}</Text>
            </View>
            <TouchableOpacity
              onPress={handleShare}
              className="p-2 -mr-2 rounded-full bg-orange-100 active:bg-orange-200"
            >
              <ShareIcon size={20} color="#FF6B00" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Hero Image */}
        <View className="relative h-64 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
          {ticket?.imageUrl && (
            <Image
              source={{ uri: ticket.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
          <View className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Status Badge */}
          <View className="absolute top-4 right-4">
            <View className={`px-3 py-1 rounded-full ${ticket?.status === 'active' ? 'bg-green-500' :
              ticket?.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'
              }`}>
              <Text className="text-white text-xs font-semibold capitalize">
                {ticket?.status}
              </Text>
            </View>
          </View>

          <View className="absolute bottom-6 left-6 right-6">
            <Text className="text-white text-3xl font-bold mb-2 leading-tight">
              {ticket?.packageName}
            </Text>
            <View className="flex-row items-center">
              <View className="bg-white/20 rounded-full px-3 py-1 mr-3">
                <Text className="text-white text-sm font-medium">{ticket?.tier}</Text>
              </View>
              <View className="flex-row items-center">
                <Calendar size={16} color="white" />
                <Text className="text-white/90 text-sm ml-1">
                  {formatDate(ticket?.expiresAt || '')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="px-6 -mt-4">
          {/* Ticket Info Card */}
          <View className="bg-white rounded-3xl p-6  border border-gray-100 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl items-center justify-center mr-4">
                  <QrCode size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-bold text-xl mb-1">{ticket?.packageName}</Text>
                  <Text className="text-orange-600 font-semibold text-sm">{ticket?.tier}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* QR Code Section */}
          <View className="mb-8">
            <View className="bg-white rounded-3xl p-6  border border-gray-100">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-gray-900 font-bold text-xl">QR Code</Text>
                <TouchableOpacity
                  onPress={handleRefreshQR}
                  className="bg-orange-100 rounded-full px-4 py-2 active:bg-orange-200"
                >
                  <Text className="text-orange-600 font-semibold text-sm">Refresh</Text>
                </TouchableOpacity>
              </View>

              <View className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 items-center mb-6">
                <View className="w-56 h-56 bg-white rounded-3xl items-center justify-center ">
                  <QRCode
                    value={ticket?.qrCode || 'tripbuddy://tickets/' + ticketId}
                    size={200}
                    color="#1F2937"
                    backgroundColor="#FFFFFF"
                    logo={require('@/assets/adaptive-icon.png')}
                    logoSize={45}
                    logoBackgroundColor="transparent"
                    logoMargin={3}
                    logoBorderRadius={10}
                  />
                </View>
              </View>

              <View className="items-center">
                <Text className="text-gray-900 font-bold text-lg mb-2">Scan to Enter</Text>
                <Text className="text-gray-600 text-center text-sm leading-5">
                  Present this QR code at each attraction to gain entry
                </Text>
              </View>
            </View>
          </View>

          {/* Validity Section */}
          <View className="mb-8">
            <View className="bg-white rounded-3xl p-6  border border-gray-100">
              <Text className="text-gray-900 font-bold text-xl mb-6">Validity Information</Text>

              <View className="space-y-4">
                {/* Status */}
                <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <View className={`w-3 h-3 rounded-full mr-3 ${ticket?.status === 'active' ? 'bg-green-500' :
                      ticket?.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'
                      }`} />
                    <Text className="text-gray-600 font-medium">Status</Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${ticket?.status === 'active' ? 'bg-green-100' :
                    ticket?.status === 'upcoming' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                    <Text className={`font-bold capitalize text-sm ${ticket?.status === 'active' ? 'text-green-700' :
                      ticket?.status === 'upcoming' ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                      {ticket?.status}
                    </Text>
                  </View>
                </View>

                {/* Activated At */}
                {ticket?.activatedAt && (
                  <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                    <View className="flex-row items-center gap-x-3">
                      <CheckCircle size={16} color="#6B7280" className="mr-3" />
                      <Text className="text-gray-600 font-medium">Activated</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-gray-900 font-medium text-sm">
                        {formatDate(ticket.activatedAt)}
                      </Text>
                      <Text className="text-gray-500 text-xs">
                        {formatTime(ticket.activatedAt)}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Expires At */}
                <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                  <View className="flex-row items-center gap-x-3">
                    <Clock size={16} color="#6B7280" className="mr-3" />
                    <Text className="text-gray-600 font-medium">Expires</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-gray-900 font-medium text-sm">
                      {formatDate(ticket?.expiresAt || '')}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      {formatTime(ticket?.expiresAt || '')}
                    </Text>
                  </View>
                </View>

                {/* Validity Rule */}
                <View className="flex-row items-center justify-between py-4">
                  <View className="flex-row items-center gap-x-3">
                    <Calendar size={16} color="#6B7280" className="mr-3" />
                    <Text className="text-gray-600 font-medium">Validity</Text>
                  </View>
                  <Text className="text-gray-900 font-medium text-sm">{ticket?.validityRule}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Entitlements Section */}
          <View className="mb-8">
            <View className="bg-white rounded-3xl p-6  border border-gray-100">
              <Text className="text-gray-900 font-bold text-xl mb-6">Your Entitlements</Text>

              <View className="space-y-4">
                {ticket?.entitlements.map((entitlement, index) => (
                  <View key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 border border-orange-100 mb-4">
                    <View className="flex-row items-center gap-x-3">
                      <View className="w-10 h-10 bg-orange-500 rounded-xl items-center justify-center mr-4">
                        <MapPin size={20} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-900 font-bold text-lg mb-1">{entitlement.placeName}</Text>
                        <View className="flex-row items-center">
                          <View className="bg-orange-200 rounded-full px-3 py-1 mr-2">
                            <Text className="text-orange-800 font-semibold text-sm">
                              {entitlement.remainingVisits} remaining
                            </Text>
                          </View>
                          <Text className="text-gray-500 text-sm">
                            {entitlement.remainingVisits > 0 ? 'Available' : 'Used up'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Usage History Section */}
          <View className="mb-8">
            <View className="bg-white rounded-3xl p-6  border border-gray-100">
              <Text className="text-gray-900 font-bold text-xl mb-6">Usage History</Text>

              {ticket?.redemptions && ticket.redemptions.length > 0 ? (
                <View className="space-y-4">
                  {ticket.redemptions.map((redemption, index) => (
                    <View key={index} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4">
                      <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-green-500 rounded-xl items-center justify-center mr-4">
                          <CheckCircle size={20} color="white" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-gray-900 font-bold text-lg mb-1">{redemption.placeName}</Text>
                          <View className="flex-row items-center gap-x-2">
                            <Clock size={14} color="#6B7280" className="mr-2" />
                            <Text className="text-gray-600 text-sm">
                              {formatDate(redemption.usedAt)} at {formatTime(redemption.usedAt)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View className="items-center py-8">
                  <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
                    <AlertCircle size={24} color="#9CA3AF" />
                  </View>
                  <Text className="text-gray-500 font-medium text-lg mb-2">No usage history</Text>
                  <Text className="text-gray-400 text-sm text-center">
                    Your ticket usage will appear here once you start visiting attractions
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Bottom padding */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
