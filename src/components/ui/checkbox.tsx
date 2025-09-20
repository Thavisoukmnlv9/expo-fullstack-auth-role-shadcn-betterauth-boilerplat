import * as React from "react";
import { Pressable, View, Text } from "react-native";
import { cn } from "@/src/lib/utils";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Checkbox = React.forwardRef<View, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled, className, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        onPress={() => onCheckedChange?.(!checked)}
        disabled={disabled}
        className={cn(
          "flex-row items-center space-x-2",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        <View
          className={cn(
            "h-4 w-4 rounded border-2 items-center justify-center",
            checked ? "bg-primary border-primary" : "border-input",
            className
          )}
        >
          {checked && (
            <Text className="text-primary-foreground text-xs">✓</Text>
          )}
        </View>
        {children && (
          <Text className="text-sm text-foreground">{children}</Text>
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
