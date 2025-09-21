import React, { Suspense, lazy, ComponentType, ReactNode } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorBoundary?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-center">
            Something went wrong. Please try again.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback,
  errorBoundary = true 
}) => {
  const defaultFallback = (
    <View className="flex-1 justify-center items-center p-4">
      <ActivityIndicator size="large" color="#FF6B00" />
      <Text className="text-gray-500 mt-2">Loading...</Text>
    </View>
  );

  const content = (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );

  if (errorBoundary) {
    return (
      <ErrorBoundary fallback={fallback}>
        {content}
      </ErrorBoundary>
    );
  }

  return content;
};

// Higher-order component for lazy loading
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  fallback?: ReactNode
) {
  return function LazyComponent(props: P) {
    return (
      <LazyWrapper fallback={fallback}>
        <Component {...props} />
      </LazyWrapper>
    );
  };
}

// Hook for lazy loading components
export function useLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = React.useMemo(
    () => lazy(importFunc),
    [importFunc]
  );

  return React.useMemo(
    () => (props: React.ComponentProps<T>) => (
      <LazyWrapper fallback={fallback}>
        <LazyComponent {...props} />
      </LazyWrapper>
    ),
    [LazyComponent, fallback]
  );
}

export default LazyWrapper;
