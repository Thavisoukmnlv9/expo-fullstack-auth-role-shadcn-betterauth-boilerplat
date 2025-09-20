import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { PackageSummary } from '@/src/mocks/clientHome'

interface PackageCardProps {
  package: PackageSummary
  onPress?: () => void
}

export default function PackageCard({ package: pkg, onPress }: PackageCardProps) {
  const imageUrl = pkg.imageUrl || 'https://picsum.photos/400/300'
  return (
    <Pressable
      onPress={onPress}
      className="bg-white border border-zinc-200 rounded-2xl mr-4 w-80"
      accessibilityRole="button"
      accessibilityLabel={`${pkg.title}, ${pkg.durationLabel}, ${pkg.priceLabel}`}
    >
      <View className="relative">
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: '100%',
            height: 192,
            backgroundColor: '#e5e7eb',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
          resizeMode="cover"
        />
        {pkg.badge && (
          <View className="absolute top-4 left-4 bg-sky-100 px-3 py-1 rounded-full">
            <Text className="text-sky-700 text-xs font-semibold">{pkg.badge}</Text>
          </View>
        )}
      </View>
      <View className="p-5">
        <Text className="text-zinc-800 font-bold text-lg mb-2" numberOfLines={2}>
          {pkg.title}
        </Text>
        <Text className="text-zinc-500 text-sm">
          {pkg.durationLabel} · {pkg.priceLabel}
        </Text>
      </View>
    </Pressable>
  )
}
