  import * as React from "react";
  import { View, Text } from "react-native";
  import { cn } from "@/src/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = React.forwardRef<View, CardProps>(
  ({ children, className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </View>
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<View, CardProps>(
  ({ children, className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {children}
    </View>
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<Text, CardProps>(
  ({ children, className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </Text>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<Text, CardProps>(
  ({ children, className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, CardProps>(
  ({ children, className, ...props }, ref) => (
    <View ref={ref} className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </View>
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, CardProps>(
  ({ children, className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    >
      {children}
    </View>
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
