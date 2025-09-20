import { Tabs } from "expo-router";
import RequireRole from "@/src/auth/middleware/RequireRole";
import { Home, Compass, Ticket, User } from "lucide-react-native";

export default function ClientLayout() {
  return (
    <RequireRole allow={["admin", "staff", "client"]}>
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
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="packages/show/[id]/page"
          options={{
            href: null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
      </Tabs>
    </RequireRole>
  );
}
