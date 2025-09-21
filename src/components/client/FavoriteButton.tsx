import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Heart } from 'lucide-react-native';

interface FavoriteButtonProps {
  itemId: string;
  isFavorite?: boolean;
  onToggle: (itemId: string, isFavorite: boolean) => void;
  size?: number;
}

export default function FavoriteButton({ 
  itemId, 
  isFavorite = false, 
  onToggle, 
  size = 24 
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handlePress = () => {
    const newFavorite = !favorite;
    setFavorite(newFavorite);
    onToggle(itemId, newFavorite);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="p-2 rounded-full bg-white/80 shadow-sm"
      style={({ pressed }) => [
        { transform: [{ scale: pressed ? 0.95 : 1 }] }
      ]}
    >
      <Heart 
        size={size} 
        color={favorite ? "#EF4444" : "#6B7280"} 
        fill={favorite ? "#EF4444" : "transparent"} 
      />
    </Pressable>
  );
}
