import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { ArrowLeft, Share2, Star } from 'lucide-react-native'
import { PackageDetail } from '@/src/mocks/packageDetail'

interface PackageDetailHeaderProps {
  packageData: PackageDetail
  onBack: () => void
  onShare: () => void
}

export default function PackageDetailHeader({ 
  packageData, 
  onBack, 
  onShare 
}: PackageDetailHeaderProps) {
  return (
    <View className="relative">
      {/* Hero Image */}
      <View className="relative">
        <Image
          source={{ uri: packageData.heroImage }}
          className="w-full h-64"
          style={{
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
          resizeMode="cover"
        />
        
        {/* Overlay Buttons */}
        <View className="absolute top-12 left-4 right-4 flex-row justify-between">
          <Pressable
            onPress={onBack}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={20} color="#374151" />
          </Pressable>
          
          <Pressable
            onPress={onShare}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
            accessibilityRole="button"
            accessibilityLabel="Share"
          >
            <Share2 size={20} color="#374151" />
          </Pressable>
        </View>
        
        {/* Rating Pill */}
        <View className="absolute bottom-4 left-4">
          <View className="bg-white px-3 py-2 rounded-full flex-row items-center shadow-lg">
            <Star size={16} color="#FCD34D" fill="#FCD34D" />
            <Text className="text-gray-900 font-bold text-sm ml-1">
              {packageData.rating.score}
            </Text>
            <Text className="text-gray-600 text-sm ml-1">
              ({packageData.rating.count.toLocaleString()})
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
