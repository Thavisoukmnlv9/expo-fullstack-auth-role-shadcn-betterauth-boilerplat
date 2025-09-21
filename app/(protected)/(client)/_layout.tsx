import { Tabs } from "expo-router";
import RequireRole from "@/src/auth/middleware/RequireRole";
import { Home, Compass, Ticket, User, ShoppingBag } from "lucide-react-native";
import { View } from "react-native";

export default function ClientLayout() {
  return (
    <RequireRole allow={["admin", "staff", "client"]}>
      <View className="flex-1 bg-black">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e4e4e7',
            paddingTop: 8,
            paddingBottom: 8,
            height: 100,
          },
          tabBarActiveTintColor: '#FF6B00',
          tabBarInactiveTintColor: '#71717a',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
          tabBarItemStyle: {
            position: 'relative',
          },
          tabBarIconStyle: {
            position: 'relative',
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="packages/page"
          options={{
            title: "Packages",
            tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="tickets"
          options={{
            title: "My Tickets",
            tabBarIcon: ({ color, size }) => <Ticket size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "My Orders",
            tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="packages/show/[id]"
          options={{
            href: null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="checkout/[orderId]/payment/index"
          options={{
            href: null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="checkout/[orderId]/payment/qr/index"
          options={{
            href: null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="tickets/[ticketId]/index"
          options={{
            href: null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="orders/[id]"
          options={{
            href: null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="account/favorites"
          options={{
            href: null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
      </Tabs>
      </View>
    </RequireRole>
  );
}
