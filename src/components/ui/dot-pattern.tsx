import React from 'react';
import { View, Dimensions } from 'react-native';

interface DotPatternProps {
  color?: string;
  size?: number;
  spacing?: number;
  opacity?: number;
}

export function DotPattern({ 
  color = '#ffffff', 
  size = 1, 
  spacing = 15, 
  opacity = 0.3 
}: DotPatternProps) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const dots = [];
  const rows = Math.ceil(screenHeight / spacing) + 5;
  const cols = Math.ceil(screenWidth / spacing) + 5;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push(
        <View
          key={`${row}-${col}`}
          style={{
            position: 'absolute',
            left: col * spacing,
            top: row * spacing,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            opacity: opacity,
          }}
        />
      );
    }
  }

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {dots}
    </View>
  );
}
