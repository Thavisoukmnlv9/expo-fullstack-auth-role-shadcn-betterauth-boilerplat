import * as React from "react";
import { View, Text } from "react-native";
import { cn } from "@/src/lib/utils";

interface SeparatorProps {
  className?: string;
  children?: React.ReactNode;
}

const Separator = React.forwardRef<View, SeparatorProps>(
  ({ className, children, ...props }, ref) => {
    if (children) {
      return (
        <View
          ref={ref}
          className={cn("flex-row items-center my-4", className)}
          {...props}
        >
          <View className="flex-1 h-px bg-border" />
          <Text className="px-4 text-sm text-muted-foreground">{children}</Text>
          <View className="flex-1 h-px bg-border" />
        </View>
      );
    }

    return (
      <View
        ref={ref}
        className={cn("h-px bg-border", className)}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
