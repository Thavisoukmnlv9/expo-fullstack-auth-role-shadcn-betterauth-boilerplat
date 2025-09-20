import * as React from "react";
import { TextInput, View, KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";
import { cn } from "@/src/lib/utils";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  className?: string;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  [key: string]: any;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, keyboardType, returnKeyType, onSubmitEditing, autoFocus, autoCapitalize, autoCorrect, ...props }, ref) => {
    return (
      <View className="relative">
        <TextInput
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          {...props}
        />
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
