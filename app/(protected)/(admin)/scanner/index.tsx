import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { Stack, router } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

export default function QRScanner() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [permission, requestPermission] = useCameraPermissions();
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [isScanning, setIsScanning] = useState(true);

  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const cornerPulseAnim = useRef(new Animated.Value(1)).current;
  const scanAreaPulseAnim = useRef(new Animated.Value(1)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Animation effects
  useEffect(() => {
    if (isScanning) {
      // Scanning line animation
      const scanLineAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      // Corner pulse animation
      const cornerPulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(cornerPulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(cornerPulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      // Scan area pulse animation
      const scanAreaPulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanAreaPulseAnim, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scanAreaPulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );

      scanLineAnimation.start();
      cornerPulseAnimation.start();
      scanAreaPulseAnimation.start();

      return () => {
        scanLineAnimation.stop();
        cornerPulseAnimation.stop();
        scanAreaPulseAnimation.stop();
      };
    } else {
      // Reset animations when not scanning
      scanLineAnim.setValue(0);
      cornerPulseAnim.setValue(1);
      scanAreaPulseAnim.setValue(1);
    }
  }, [isScanning, scanLineAnim, cornerPulseAnim, scanAreaPulseAnim]);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (data && !qrLock.current && isScanning) {
      qrLock.current = true;
      setIsScanning(false);

      // Trigger success animation
      Animated.sequence([
        Animated.timing(successAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(successAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      Alert.alert(
        "QR Code Scanned",
        `Data: ${data}`,
        [
          {
            text: "Open Link",
            onPress: () => Linking.openURL(data),
          },
          {
            text: "Scan Again",
            onPress: () => {
              qrLock.current = false;
              setIsScanning(true);
            },
          },
        ]
      );
    }
  };

  const handleFlashlightPress = () => {
    setIsFlashlightOn(!isFlashlightOn);
  };

  const handleCameraFlip = () => {
    setCameraType(cameraType === "back" ? "front" : "back");
  };

  const handleCancelScan = () => {
    setIsScanning(false);
    router.back();
  };

  const handleHistoryPress = () => {
    Alert.alert("History", "Scanner history would be implemented here");
  };

  const handleResumeScan = () => {
    setIsScanning(true);
    qrLock.current = false;
  };

  // Permission handling
  if (!permission) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.centerContainer}>
          <Text style={styles.permissionText}>Requesting camera permission...</Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.centerContainer}>
          <Text style={styles.permissionText}>Camera permission is required to scan QR codes</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "QR Scanner",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}

      {/* Camera View */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={cameraType}
        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
        enableTorch={isFlashlightOn}
      />

      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity style={styles.controlButton} onPress={handleCancelScan}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleHistoryPress}>
          <Ionicons name="time-outline" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleCameraFlip}>
          <Ionicons name="camera-reverse-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* QR Code Overlay */}
      <View style={styles.overlay}>
        {/* Semi-transparent overlay with cutout */}
        <View style={styles.overlayBackground}>
          <View style={styles.overlayTop} />
          <View style={styles.overlayMiddle}>
            <View style={styles.overlayLeft} />
            <View style={styles.scanAreaContainer}>
              <Animated.View
                style={[
                  styles.scanArea,
                  { transform: [{ scale: scanAreaPulseAnim }] }
                ]}
              >
                {/* Animated corners */}
                <Animated.View
                  style={[
                    styles.corner,
                    { transform: [{ scale: cornerPulseAnim }] }
                  ]}
                />
                <Animated.View
                  style={[
                    styles.corner,
                    styles.topRight,
                    { transform: [{ scale: cornerPulseAnim }] }
                  ]}
                />
                <Animated.View
                  style={[
                    styles.corner,
                    styles.bottomLeft,
                    { transform: [{ scale: cornerPulseAnim }] }
                  ]}
                />
                <Animated.View
                  style={[
                    styles.corner,
                    styles.bottomRight,
                    { transform: [{ scale: cornerPulseAnim }] }
                  ]}
                />

                {/* Animated scanning line */}
                {isScanning && (
                  <Animated.View
                    style={[
                      styles.scanLine,
                      {
                        transform: [
                          {
                            translateY: scanLineAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, SCAN_AREA_SIZE - 2],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                )}

                {/* Success animation overlay */}
                <Animated.View
                  style={[
                    styles.successOverlay,
                    {
                      opacity: successAnim,
                      transform: [
                        {
                          scale: successAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.8, 1.2],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                </Animated.View>
              </Animated.View>
            </View>
            <View style={styles.overlayRight} />
          </View>
          <View style={styles.overlayBottom} />
        </View>

        <Text style={styles.instructionText}>
          {isScanning ? "Align the QR code within the frame to scan" : "Scanning paused"}
        </Text>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={[styles.flashlightButton, isFlashlightOn && styles.flashlightButtonActive]}
          onPress={handleFlashlightPress}
        >
          <Ionicons
            name={isFlashlightOn ? "flash" : "flash-off"}
            size={24}
            color={isFlashlightOn ? "#ff6b35" : "white"}
          />
        </TouchableOpacity>

        {!isScanning && (
          <TouchableOpacity style={styles.resumeButton} onPress={handleResumeScan}>
            <Ionicons name="play" size={24} color="white" />
            <Text style={styles.resumeButtonText}>Resume Scan</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginTop: -SCAN_AREA_SIZE / 2,
  },
  overlayMiddle: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: SCAN_AREA_SIZE,
    flexDirection: 'row',
    marginTop: -SCAN_AREA_SIZE / 2,
  },
  overlayLeft: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayRight: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginBottom: -SCAN_AREA_SIZE / 2,
  },
  scanAreaContainer: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    position: 'relative',
  },
  scanArea: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    position: 'relative',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#ff6b35',
    shadowColor: '#ff6b35',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#ff6b35',
    borderWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    top: 0,
    left: 0,
    shadowColor: '#ff6b35',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    top: 'auto',
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    borderRadius: 8,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  flashlightButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  flashlightButtonActive: {
    backgroundColor: 'rgba(255, 107, 53, 0.3)',
  },
  resumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b35',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  resumeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});