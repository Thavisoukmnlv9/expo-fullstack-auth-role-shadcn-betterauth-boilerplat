import React from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { Heart, ChevronRight, Star, MapPin } from 'lucide-react-native';
import { featureIconMap } from '@/src/mocks/account';

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

interface FavoritesCardProps {
  favorites: FavoriteItem[];
  onItemPress: (item: FavoriteItem) => void;
  onSeeAllPress: () => void;
}

export default function FavoritesCard({ 
  favorites, 
  onItemPress, 
  onSeeAllPress 
}: FavoritesCardProps) {
  const renderFeatureIcons = (features: string[]) => {
    return features.slice(0, 4).map((feature, index) => (
      <View
        key={index}
        className="bg-gray-100 rounded-full px-2 py-1 mr-1"
      >
        <Text className="text-xs">{featureIconMap[feature] || '⭐'}</Text>
      </View>
    ));
  };

  const renderFavoriteItem = (item: FavoriteItem) => (
    <Pressable
      key={item.id}
      onPress={() => onItemPress(item)}
      className="bg-white rounded-2xl p-3 mb-3  border border-gray-100"
      style={({ pressed }) => [
        { transform: [{ scale: pressed ? 0.98 : 1 }] }
      ]}
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.thumb }}
          className="w-16 h-16 rounded-xl"
          resizeMode="cover"
        />
        <View className="flex-1 ml-3">
          <Text className="font-semibold text-gray-900 text-sm mb-1" numberOfLines={1}>
            {item.title}
          </Text>
          <View className="flex-row items-center mb-2">
            <MapPin size={12} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-1">{item.location}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text className="text-xs text-gray-600 ml-1">{item.rating}</Text>
            </View>
            <Text className="text-xs font-semibold text-orange-600">
              {item.priceLabel}
            </Text>
          </View>
          <View className="flex-row mt-2">
            {renderFeatureIcons(item.features)}
          </View>
        </View>
      </View>
    </Pressable>
  );

  if (favorites.length === 0) {
    return (
      <View className="bg-white rounded-3xl  border border-gray-100 p-6 mb-6">
        <View className="items-center">
          <Heart size={48} color="#E5E7EB" />
          <Text className="text-gray-500 text-center mt-3 mb-2">
            No favorites yet
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Browse Packages to add
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-3xl  border border-gray-100 p-6 mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold text-gray-900">Favorites</Text>
        <Pressable
          onPress={onSeeAllPress}
          className="flex-row items-center"
        >
          <Text className="text-orange-600 text-sm font-medium mr-1">See all</Text>
          <ChevronRight size={16} color="#FF6B00" />
        </Pressable>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="max-h-64"
      >
        {favorites.slice(0, 3).map(renderFavoriteItem)}
      </ScrollView>
    </View>
  );
}
