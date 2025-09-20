import React from 'react'
import { View } from 'react-native'

export function FeaturedSkeleton() {
  return (
    <View className="bg-white rounded-2xl shadow-sm mr-4 w-72">
      <View className="w-full h-40 bg-zinc-200 rounded-t-2xl" />
      <View className="p-4">
        <View className="h-4 bg-zinc-200 rounded mb-2" />
        <View className="h-3 bg-zinc-200 rounded w-24" />
      </View>
    </View>
  )
}

export function PlaceRowSkeleton() {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-3 flex-row items-center">
      <View className="w-12 h-12 bg-zinc-200 rounded-xl mr-3" />
      <View className="flex-1">
        <View className="h-3 bg-zinc-200 rounded w-16 mb-2" />
        <View className="h-4 bg-zinc-200 rounded mb-1" />
        <View className="h-3 bg-zinc-200 rounded w-24" />
      </View>
    </View>
  )
}
