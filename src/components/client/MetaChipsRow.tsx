import React from 'react'
import { View, Text } from 'react-native'
import { MapPin, Clock, Thermometer } from 'lucide-react-native'
import { PackageDetail } from '@/src/mocks/packageDetail'

interface MetaChipsRowProps {
  packageData: PackageDetail
}

export default function MetaChipsRow({ packageData }: MetaChipsRowProps) {
  return (
    <View className="px-4 py-4">
      {/* Title */}
      <Text className="text-gray-900 font-bold text-2xl text-center mb-4">
        {packageData.name}
      </Text>
      
      {/* Meta Row */}
      <View className="flex-row justify-center space-x-4">
        <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-full">
          <MapPin size={16} color="#FF6B00" />
          <Text className="text-gray-700 text-sm ml-1">
            {packageData.location}
          </Text>
        </View>
        
        <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-full">
          <Clock size={16} color="#374151" />
          <Text className="text-gray-700 text-sm ml-1">
            {packageData.durationHours} Hours
          </Text>
        </View>
        
        <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-full">
          <Thermometer size={16} color="#374151" />
          <Text className="text-gray-700 text-sm ml-1">
            {packageData.weatherC}°C
          </Text>
        </View>
      </View>
    </View>
  )
}
