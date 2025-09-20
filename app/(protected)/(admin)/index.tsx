import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert, Pressable } from 'react-native';
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";

const tabs = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  { id: 'payments', label: 'Payments', icon: 'payments' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
];

export default function AdminHome() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  const [activeTab, setActiveTab] = useState('home');
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleQRScan = (data: string) => {
    Alert.alert(
      'QR Code Scanned',
      `Order ID: ${data}`,
      [
        {
          text: 'Process Order',
          onPress: () => {
            // Handle order processing logic here
            console.log('Processing order:', data);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };



  return (
    <SafeAreaView >
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text>QR Code Scanner</Text>
      <View style={{ gap: 20 }}>
        <Pressable onPress={requestPermission}>
          <Text>Request Permissions</Text>
        </Pressable>
        <Link href={"/scanner" as any} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                ,
                { opacity: !isPermissionGranted ? 0.5 : 1 }
              ]}
            >
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
