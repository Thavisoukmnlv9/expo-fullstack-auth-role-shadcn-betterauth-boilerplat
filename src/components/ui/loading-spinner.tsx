import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, Easing } from 'react-native';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const LoadingSpinnerComponent = ({ 
  size = 40, 
  color = '#FF6B00', 
  strokeWidth = 4 
}: LoadingSpinnerProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  // Memoize animation config to prevent recreation
  const animationConfig = useMemo(() => ({
    toValue: 1,
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: true,
  }), []);

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, animationConfig).start(() => spin());
    };
    spin();
  }, [spinValue, animationConfig]);

  const rotate = useMemo(() => spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  }), [spinValue]);

  const containerStyle = useMemo(() => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: strokeWidth,
    borderColor: `${color}20`,
    borderTopColor: color,
    transform: [{ rotate }],
  }), [size, strokeWidth, color, rotate]);

  return (
    <View className="items-center justify-center">
      <Animated.View style={containerStyle} />
    </View>
  );
};

LoadingSpinnerComponent.displayName = 'LoadingSpinner';

export const LoadingSpinner = React.memo(LoadingSpinnerComponent);

interface PulsingDotsProps {
  color?: string;
  size?: number;
}

const PulsingDotsComponent = ({ color = '#FF6B00', size = 8 }: PulsingDotsProps) => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  // Memoize animation config
  const animationConfig = useMemo(() => ({
    toValue: 1,
    duration: 600,
    easing: Easing.ease,
    useNativeDriver: true,
  }), []);

  const resetConfig = useMemo(() => ({
    toValue: 0.3,
    duration: 600,
    easing: Easing.ease,
    useNativeDriver: true,
  }), []);

  useEffect(() => {
    const animateDots = () => {
      const createAnimation = (dot: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(dot, { ...animationConfig, delay }),
            Animated.timing(dot, resetConfig),
          ])
        );
      };

      Animated.parallel([
        createAnimation(dot1, 0),
        createAnimation(dot2, 200),
        createAnimation(dot3, 400),
      ]).start();
    };

    animateDots();
  }, [dot1, dot2, dot3, animationConfig, resetConfig]);

  // Memoize dot styles
  const dotStyle = useMemo(() => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
  }), [size, color]);

  return (
    <View className="flex-row items-center space-x-2">
      <Animated.View style={[dotStyle, { opacity: dot1 }]} />
      <Animated.View style={[dotStyle, { opacity: dot2 }]} />
      <Animated.View style={[dotStyle, { opacity: dot3 }]} />
    </View>
  );
};

PulsingDotsComponent.displayName = 'PulsingDots';

export const PulsingDots = React.memo(PulsingDotsComponent);
