import React, { useState, useMemo } from 'react';
import { View, ActivityIndicator, ImageStyle, ViewStyle } from 'react-native';
import { Image, ImageContentFit } from 'expo-image';

interface OptimizedImageProps {
  source: { uri: string } | number;
  style?: ImageStyle | ImageStyle[];
  className?: string;
  resizeMode?: ImageContentFit;
  placeholder?: string;
  fallback?: string;
  priority?: 'low' | 'normal' | 'high';
  cachePolicy?: 'memory' | 'disk' | 'memory-disk';
  onLoad?: () => void;
  onError?: () => void;
  accessibilityLabel?: string;
  loadingIndicatorColor?: string;
  loadingIndicatorSize?: 'small' | 'large';
}

const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(({
  source,
  style,
  className,
  resizeMode = 'cover' as ImageContentFit,
  placeholder,
  fallback = 'https://via.placeholder.com/400x300?text=Image+Not+Available',
  priority = 'normal',
  cachePolicy = 'memory-disk',
  onLoad,
  onError,
  accessibilityLabel,
  loadingIndicatorColor = '#FF6B00',
  loadingIndicatorSize = 'small'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageSource = useMemo(() => {
    if (typeof source === 'number') {
      return source;
    }
    
    return {
      uri: source.uri,
      priority: priority === 'high' ? 'high' : priority === 'low' ? 'low' : 'normal',
      cachePolicy: cachePolicy === 'memory' ? 'memory' : 
                   cachePolicy === 'disk' ? 'disk' : 'memory-disk'
    };
  }, [source, priority, cachePolicy]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const finalSource = useMemo(() => {
    if (hasError && typeof source === 'object' && source.uri) {
      return { uri: fallback };
    }
    return imageSource;
  }, [hasError, source, fallback, imageSource]);

  const containerStyle = useMemo(() => {
    const baseStyle: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e5e7eb'
    };

    if (Array.isArray(style)) {
      return [baseStyle, ...style];
    }
    return [baseStyle, style];
  }, [style]);

  return (
    <View style={containerStyle} className={className}>
      <Image
        source={finalSource}
        style={style}
        contentFit={resizeMode}
        onLoad={handleLoad}
        onError={handleError}
        placeholder={placeholder}
        transition={200}
        accessibilityLabel={accessibilityLabel}
        cachePolicy={cachePolicy}
      />
      {isLoading && (
        <View style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator 
            size={loadingIndicatorSize} 
            color={loadingIndicatorColor} 
          />
        </View>
      )}
    </View>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
