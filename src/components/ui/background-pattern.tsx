import React from 'react';
import { View } from 'react-native';

interface BackgroundPatternProps {
  className?: string;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ className }) => {
  return (
    <View className={`absolute inset-0 ${className}`}>
      {/* Create a subtle dot pattern using CSS-like approach */}
      <View 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
    </View>
  );
};
