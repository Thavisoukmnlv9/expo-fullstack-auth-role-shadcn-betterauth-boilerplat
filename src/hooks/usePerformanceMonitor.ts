import { useEffect, useRef, useCallback, useState } from 'react';
import { InteractionManager } from 'react-native';

interface PerformanceMetrics {
  renderTime: number;
  mountTime: number;
  updateTime: number;
  memoryUsage?: number;
}

interface UsePerformanceMonitorOptions {
  componentName: string;
  logMetrics?: boolean;
  onMetricUpdate?: (metrics: PerformanceMetrics) => void;
  trackMemory?: boolean;
}

export function usePerformanceMonitor({
  componentName,
  logMetrics = false,
  onMetricUpdate,
  trackMemory = false
}: UsePerformanceMonitorOptions) {
  const mountTimeRef = useRef<number>(0);
  const renderStartTimeRef = useRef<number>(0);
  const renderCountRef = useRef<number>(0);
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    mountTime: 0,
    updateTime: 0
  });

  const startRenderTimer = useCallback(() => {
    renderStartTimeRef.current = performance.now();
  }, []);

  const endRenderTimer = useCallback(() => {
    if (renderStartTimeRef.current > 0) {
      const renderTime = performance.now() - renderStartTimeRef.current;
      renderCountRef.current += 1;
      
      metricsRef.current = {
        ...metricsRef.current,
        renderTime,
        updateTime: renderCountRef.current > 1 ? renderTime : 0
      };

      if (logMetrics) {
        console.log(`[${componentName}] Render #${renderCountRef.current}: ${renderTime.toFixed(2)}ms`);
      }

      onMetricUpdate?.(metricsRef.current);
    }
  }, [componentName, logMetrics, onMetricUpdate]);

  const measureMemoryUsage = useCallback(() => {
    if (trackMemory && 'memory' in performance) {
      const memory = (performance as any).memory;
      if (memory) {
        metricsRef.current.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
      }
    }
  }, [trackMemory]);

  useEffect(() => {
    mountTimeRef.current = performance.now();
    
    // Measure initial mount time
    InteractionManager.runAfterInteractions(() => {
      const mountTime = performance.now() - mountTimeRef.current;
      metricsRef.current.mountTime = mountTime;
      
      if (logMetrics) {
        console.log(`[${componentName}] Mount time: ${mountTime.toFixed(2)}ms`);
      }
      
      onMetricUpdate?.(metricsRef.current);
    });

    return () => {
      if (logMetrics) {
        console.log(`[${componentName}] Unmounted after ${renderCountRef.current} renders`);
      }
    };
  }, [componentName, logMetrics, onMetricUpdate]);

  useEffect(() => {
    measureMemoryUsage();
  }, [measureMemoryUsage]);

  return {
    startRenderTimer,
    endRenderTimer,
    metrics: metricsRef.current,
    renderCount: renderCountRef.current
  };
}

// Hook for measuring specific operations
export function useOperationTimer(operationName: string) {
  const startTimeRef = useRef<number>(0);

  const startTimer = useCallback(() => {
    startTimeRef.current = performance.now();
  }, []);

  const endTimer = useCallback(() => {
    if (startTimeRef.current > 0) {
      const duration = performance.now() - startTimeRef.current;
      console.log(`[${operationName}] Operation completed in ${duration.toFixed(2)}ms`);
      return duration;
    }
    return 0;
  }, [operationName]);

  return { startTimer, endTimer };
}

// Hook for debouncing expensive operations
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for throttling expensive operations
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() - lastRan.current >= limit) {
      setThrottledValue(value);
      lastRan.current = Date.now();
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }, limit - (Date.now() - lastRan.current));

      return () => clearTimeout(timer);
    }
  }, [value, limit]);

  return throttledValue;
}
