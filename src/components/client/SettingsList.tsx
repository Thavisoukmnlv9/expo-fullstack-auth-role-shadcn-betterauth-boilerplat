import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  Receipt,
  Ticket,
  Globe,
  Coins,
  LifeBuoy,
  LogOut,
  ChevronRight
} from 'lucide-react-native';

interface SettingsItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  rightValue?: string;
  onPress: () => void;
  showChevron?: boolean;
}

interface SettingsListProps {
  language: string;
  currency: string;
  onMyOrdersPress: () => void;
  onMyTicketsPress: () => void;
  onLanguagePress: () => void;
  onCurrencyPress: () => void;
  onHelpPress: () => void;
  onLogoutPress: () => void;
}

export default function SettingsList({
  language,
  currency,
  onMyOrdersPress,
  onMyTicketsPress,
  onLanguagePress,
  onCurrencyPress,
  onHelpPress,
  onLogoutPress,
}: SettingsListProps) {
  const settingsItems: SettingsItem[] = [
    {
      id: 'orders',
      label: 'My Orders',
      icon: <Receipt size={20} color="#6B7280" />,
      onPress: onMyOrdersPress,
      showChevron: true,
    },
    {
      id: 'tickets',
      label: 'My Tickets',
      icon: <Ticket size={20} color="#6B7280" />,
      onPress: onMyTicketsPress,
      showChevron: true,
    },
    {
      id: 'language',
      label: 'Language',
      icon: <Globe size={20} color="#6B7280" />,
      rightValue: language,
      onPress: onLanguagePress,
      showChevron: true,
    },
    {
      id: 'currency',
      label: 'Currency',
      icon: <Coins size={20} color="#6B7280" />,
      rightValue: currency,
      onPress: onCurrencyPress,
      showChevron: true,
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: <LifeBuoy size={20} color="#6B7280" />,
      onPress: onHelpPress,
      showChevron: true,
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <LogOut size={20} color="#6B7280" />,
      onPress: onLogoutPress,
      showChevron: true,
    },
  ];

  const renderSettingsItem = (item: SettingsItem) => (
    <Pressable
      key={item.id}
      onPress={item.onPress}
      className="bg-white rounded-2xl p-4  border border-gray-100 flex-row items-center justify-between mb-2"
      style={({ pressed }) => [
        { transform: [{ scale: pressed ? 0.98 : 1 }] }
      ]}
      accessibilityRole="button"
      accessibilityLabel={item.label}
    >
      <View className="flex-row items-center flex-1">
        <View className="mr-3">
          {item.icon}
        </View>
        <Text className="text-gray-900 font-medium flex-1">{item.label}</Text>
      </View>
      <View className="flex-row items-center">
        {item.rightValue && (
          <Text className="text-gray-500 mr-2">{item.rightValue}</Text>
        )}
        {item.showChevron && (
          <ChevronRight size={16} color="#9CA3AF" />
        )}
      </View>
    </Pressable>
  );
  return (
    <View>
      {settingsItems.map(renderSettingsItem)}
    </View>
  );
}
