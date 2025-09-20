import * as React from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "@/src/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ children, onPress, disabled, variant = "default", size = "default", className, ...props }, ref) => {
    const baseClasses = "flex flex-row items-center justify-center rounded-md";
    const variantClasses = {
      default: "bg-primary",
      destructive: "bg-destructive",
      outline: "border border-input bg-background",
      secondary: "bg-secondary",
      ghost: "bg-transparent",
      link: "bg-transparent",
      gradient: "bg-transparent",
    };
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    if (variant === "gradient") {
      return (
        <Pressable
          ref={ref}
          onPress={onPress}
          disabled={disabled}
          className={cn(
            baseClasses,
            sizeClasses[size],
            disabled && "opacity-50",
            className
          )}
          {...props}
        >
          <LinearGradient
            colors={['#1e40af', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1 rounded-md items-center justify-center"
            style={{ height: '100%' }}
          >
            <Text className="text-white text-sm font-medium">
              {children}
            </Text>
          </LinearGradient>
        </Pressable>
      );
    }

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        <Text className={cn(
          "text-sm font-medium",
          variant === "default" && "text-primary-foreground",
          variant === "destructive" && "text-destructive-foreground",
          variant === "outline" && "text-foreground",
          variant === "secondary" && "text-secondary-foreground",
          variant === "ghost" && "text-foreground",
          variant === "link" && "text-primary underline",
        )}>
          {children}
        </Text>
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { Button };
