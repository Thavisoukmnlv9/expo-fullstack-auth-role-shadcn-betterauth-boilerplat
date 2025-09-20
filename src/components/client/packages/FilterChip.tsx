import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { ChevronDown } from 'lucide-react-native'

interface FilterChipProps {
  label: string
  onPress?: () => void
  active?: boolean
  iconRight?: React.ReactNode
}

export default function FilterChip({ 
  label, 
  onPress, 
  active = false,
  iconRight 
}: FilterChipProps) {
  const baseClasses = "px-4 py-2 rounded-full flex-row items-center"
  const activeClasses = active 
    ? "bg-sky-100 text-sky-700" 
    : "bg-zinc-200 text-zinc-800"

  return (
    <Pressable
      onPress={onPress}
      className={`${baseClasses} ${activeClasses}`}
      accessibilityRole="button"
      accessibilityLabel={`Filter by ${label}`}
    >
      <Text className="text-sm font-medium mr-1">
        {label}
      </Text>
      {iconRight || <ChevronDown size={14} color={active ? "#0369a1" : "#52525b"} />}
    </Pressable>
  )
}
