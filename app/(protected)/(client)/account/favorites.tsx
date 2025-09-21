import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star, MapPin, Heart } from 'lucide-react-native';
import { accountMockData, featureIconMap } from '@/src/mocks/account';

interface FavoriteItem {
  id: string;
  type: string;
  title: string;
  location: string;
  rating: number;
  priceLabel: string;
  thumb: string;
  features: string[];
}

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>(accountMockData.favorites);

  const renderFeatureIcons = (features: string[]) => {
    return features.map((feature, index) => (
      <View
        key={index}
        className="bg-gray-100 rounded-full px-2 py-1 mr-2"
      >
        <Text className="text-xs">{featureIconMap[feature] || '⭐'}</Text>
      </View>
    ));
  };

  const handleFavoritePress = (item: FavoriteItem) => {
    router.push(`/(client)/packages/show/${item.id}` as any);
  };

  const handleRemoveFavorite = (itemId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
  };

  if (favorites.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="px-4 py-4 ">
          <View className="flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              className="mr-4 p-2 rounded-full bg-gray-100"
            >
              <ArrowLeft size={20} color="#6B7280" />
            </Pressable>
            <Text className="text-xl font-bold text-gray-900">My Favorites</Text>
          </View>
        </View>

        <View className="flex-1 items-center justify-center px-6">
          <Heart size={64} color="#E5E7EB" />
          <Text className="text-gray-500 text-center mt-4 mb-2 text-lg">
            No favorites yet
          </Text>
          <Text className="text-gray-400 text-center mb-6">
            Browse Packages to add your favorites
          </Text>
          <Pressable
            onPress={() => router.push('/(client)/packages/page' as any)}
            className="bg-orange-600 px-6 py-3 rounded-2xl"
          >
            <Text className="text-white font-semibold">Browse Packages</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 py-4 0">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="mr-4 p-2 rounded-full bg-gray-100"
          >
            <ArrowLeft size={20} color="#6B7280" />
          </Pressable>
          <Text className="text-xl font-bold text-gray-900">My Favorites</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 pt-6">
          {favorites.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => handleFavoritePress(item)}
              className="bg-white rounded-3xl p-4 mb-4 shadow-sm border"
              style={({ pressed }) => [
                { transform: [{ scale: pressed ? 0.98 : 1 }] }
              ]}
            >
              <View className="flex-row">
                <Image
                  source={{ uri: item.thumb }}
                  className="w-20 h-20 rounded-2xl"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-4">
                  <Text className="font-bold text-gray-900 text-base mb-1" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View className="flex-row items-center mb-2">
                    <MapPin size={14} color="#6B7280" />
                    <Text className="text-sm text-gray-500 ml-1">{item.location}</Text>
                  </View>
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />
                      <Text className="text-sm text-gray-600 ml-1">{item.rating}</Text>
                    </View>
                    <Text className="text-sm font-bold text-orange-600">
                      {item.priceLabel}
                    </Text>
                  </View>
                  <View className="flex-row flex-wrap">
                    {renderFeatureIcons(item.features)}
                  </View>
                </View>
                <Pressable
                  onPress={() => handleRemoveFavorite(item.id)}
                  className="ml-2 p-2 rounded-full bg-red-50"
                >
                  <Heart size={16} color="#EF4444" fill="#EF4444" />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
