import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileHeaderCard from '@/src/components/client/ProfileHeaderCard';
import FavoritesCard from '@/src/components/client/FavoritesCard';
import SettingsList from '@/src/components/client/SettingsList';
import SelectionSheet from '@/src/components/client/SelectionSheet';
import { accountMockData } from '@/src/mocks/account';

interface Profile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  language: string;
  currency: string;
}

interface FavoriteItem {
  id: string;
  type: string;
  title: string;
  location: string;
  rating: number;
  priceLabel: string;
  thumb: string;
  features: string[];
}

export default function AccountScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>(accountMockData.profile);
  const [favorites, setFavorites] = useState<FavoriteItem[]>(accountMockData.favorites);
  const [languageSheetVisible, setLanguageSheetVisible] = useState(false);
  const [currencySheetVisible, setCurrencySheetVisible] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('user_language');
      const savedCurrency = await AsyncStorage.getItem('user_currency');
      
      if (savedLanguage) {
        setProfile(prev => ({ ...prev, language: savedLanguage }));
      }
      if (savedCurrency) {
        setProfile(prev => ({ ...prev, currency: savedCurrency }));
      }
    } catch (error) {
      console.log('Error loading preferences:', error);
    }
  };

  const savePreference = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Error saving preference:', error);
    }
  };

  const handleSettingsPress = () => {
    Alert.alert('Profile Settings', 'Profile settings feature coming soon!');
  };

  const handleFavoritePress = (item: FavoriteItem) => {
    router.push(`/(client)/packages/show/${item.id}` as any);
  };

  const handleSeeAllFavorites = () => {
    router.push('/(client)/account/favorites' as any);
  };

  const handleMyOrdersPress = () => {
    Alert.alert('My Orders', 'Orders feature coming soon!');
  };

  const handleMyTicketsPress = () => {
    router.push('/(client)/tickets' as any);
  };

  const handleLanguagePress = () => {
    setLanguageSheetVisible(true);
  };

  const handleCurrencyPress = () => {
    setCurrencySheetVisible(true);
  };

  const handleHelpPress = () => {
    Alert.alert('Help & Support', 'Help feature coming soon!');
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            Alert.alert('Logged out', 'You have been logged out successfully.');
          }
        }
      ]
    );
  };

  const handleLanguageSelect = (language: string) => {
    setProfile(prev => ({ ...prev, language }));
    savePreference('user_language', language);
  };

  const handleCurrencySelect = (currency: string) => {
    setProfile(prev => ({ ...prev, currency }));
    savePreference('user_currency', currency);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 pt-6">
          {/* Profile Header Card */}
          <ProfileHeaderCard
            name={profile.name}
            email={profile.email}
            avatarUrl={profile.avatarUrl}
            onSettingsPress={handleSettingsPress}
          />

          {/* Favorites Card */}
          <FavoritesCard
            favorites={favorites}
            onItemPress={handleFavoritePress}
            onSeeAllPress={handleSeeAllFavorites}
          />

          {/* Settings List */}
          <SettingsList
            language={profile.language}
            currency={profile.currency}
            onMyOrdersPress={handleMyOrdersPress}
            onMyTicketsPress={handleMyTicketsPress}
            onLanguagePress={handleLanguagePress}
            onCurrencyPress={handleCurrencyPress}
            onHelpPress={handleHelpPress}
            onLogoutPress={handleLogoutPress}
          />
        </View>
      </ScrollView>

      {/* Language Selection Sheet */}
      <SelectionSheet
        visible={languageSheetVisible}
        title="Select Language"
        options={accountMockData.settings.languages}
        selectedValue={profile.language}
        onSelect={handleLanguageSelect}
        onClose={() => setLanguageSheetVisible(false)}
      />

      {/* Currency Selection Sheet */}
      <SelectionSheet
        visible={currencySheetVisible}
        title="Select Currency"
        options={accountMockData.settings.currencies}
        selectedValue={profile.currency}
        onSelect={handleCurrencySelect}
        onClose={() => setCurrencySheetVisible(false)}
      />
    </SafeAreaView>
  );
}
