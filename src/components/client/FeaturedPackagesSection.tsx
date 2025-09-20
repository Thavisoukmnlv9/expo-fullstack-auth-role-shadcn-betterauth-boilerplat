import React from 'react'
import { View, Text, FlatList } from 'react-native'
import PackageCard from './PackageCard'
import { PackageSummary } from '@/src/mocks/clientHome'

interface FeaturedPackagesSectionProps {
  items: PackageSummary[]
}

export default function FeaturedPackagesSection({ items }: FeaturedPackagesSectionProps) {
  const renderPackage = ({ item }: { item: PackageSummary }) => (
    <PackageCard package={item} />
  )

  return (
    <View className="px-4">
      <Text className="text-zinc-800 font-semibold text-lg mb-3">Featured Packages</Text>
      <FlatList
        data={items}
        renderItem={renderPackage}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      />
    </View>
  )
}
