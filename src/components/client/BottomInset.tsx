import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function BottomInset() {
  const insets = useSafeAreaInsets()
  
  return (
    <View style={{ height: insets.bottom + 80 }} />
  )
}
