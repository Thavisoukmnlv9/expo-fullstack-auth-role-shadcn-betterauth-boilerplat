import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cn } from '@/src/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  gradient?: readonly [string, string, ...string[]];
  onPress?: () => void;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradient = ['#3b82f6', '#1e40af'],
  onPress,
  className,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "rounded-2xl overflow-hidden shadow-lg",
        className
      )}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white/80 text-sm font-medium mb-1">
              {title}
            </Text>
            <Text className="text-white text-2xl font-bold mb-1">
              {value}
            </Text>
            {subtitle && (
              <Text className="text-white/70 text-xs">
                {subtitle}
              </Text>
            )}
          </View>
          <View className="bg-white/20 rounded-full p-3">
            <Text className="text-2xl">{icon}</Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default DashboardCard;
