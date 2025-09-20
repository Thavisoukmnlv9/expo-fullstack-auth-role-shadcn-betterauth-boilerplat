import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/src/lib/utils';

interface TabItem {
  id: string;
  label: string;
  icon: string;
}

interface BottomNavigationBarProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
  tabs: TabItem[];
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  activeTab,
  onTabPress,
  tabs,
}) => {
  const renderIcon = (icon: string, isActive: boolean) => {
    const iconStyle = `text-white ${isActive ? 'opacity-100' : 'opacity-70'}`;
    switch (icon) {
      case 'home':
        return (
          <View className="items-center">
            <Text className={`text-lg ${iconStyle}`}>🏠</Text>
          </View>
        );
      case 'orders':
        return (
          <View className="items-center">
            <Text className={`text-lg ${iconStyle}`}>📋</Text>
          </View>
        );
      case 'analytics':
        return (
          <View className="items-center">
            <Text className={`text-lg ${iconStyle}`}>📊</Text>
          </View>
        );
      case 'qrcode':
        return (
          <View className="items-center">
            <Text className={`text-lg ${iconStyle}`}>💳</Text>
          </View>
        );
      case 'profile':
        return (
          <View className="items-center">
            <Text className={`text-lg ${iconStyle}`}>👤</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl px-4 py-3">
      <View className="flex-row justify-around items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              onPress={() => onTabPress(tab.id)}
              className={cn(
                "flex-1 items-center py-2 px-3 rounded-2xl",
                isActive && "bg-gray-700"
              )}
            >
              {renderIcon(tab.icon, isActive)}
              {isActive && (
                <Text className="text-white text-xs font-medium mt-1">
                  {tab.label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavigationBar;
