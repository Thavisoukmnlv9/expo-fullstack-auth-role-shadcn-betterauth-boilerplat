# Expo + shadcn/ui + better-auth + React Query + RHF/Zod Starter

A complete React Native app template with modern tooling and authentication.

## Features

- **Expo Router** - File-based routing with typed routes
- **shadcn/ui (RN)** - Beautiful UI components for React Native
- **Tailwind CSS / NativeWind** - Utility-first styling
- **better-auth** - Modern authentication with Expo SecureStore
- **Role/Permission Middleware** - Admin, staff, client roles
- **@tanstack/react-query** - Server state management
- **React Hook Form + Zod** - Form handling and validation
- **Centralized Fetcher** - Error handling with confirm/toast
- **RN/Web-friendly UI** - Cross-platform confirm() & toast()

## Project Structure

```
app/
  (public)/          # Public routes (login, unauthorized)
    login.tsx
    unauthorized.tsx
  (protected)/       # Protected routes
    _layout.tsx      # Auth middleware
    index.tsx        # Home dashboard
    (admin)/         # Admin-only routes
      _layout.tsx    # Role middleware
      index.tsx
      users/[id].tsx
    (staff)/         # Staff-only routes
    (client)/        # Client-only routes

src/
  auth/              # Authentication system
    auth.ts          # better-auth client
    provider.tsx     # React Query + Auth providers
    session.ts       # Session management
    permissions.ts   # Role-based permissions
    hooks.ts         # Auth hooks
    middleware/      # Route protection
  features/          # Feature modules
    auth/
      schemas.ts     # Zod validation schemas
      api.ts         # API functions
      hooks.query.ts # React Query hooks
      forms/         # Form components
  lib/               # Utilities
    env.ts           # Environment config
    router.ts        # Navigation helpers
    ui.ts            # Toast/confirm helpers
    fetcher.ts       # API client
    secure-store.ts  # Secure storage
    utils.ts         # Utility functions
  components/ui/     # shadcn/ui components
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   ```bash
   # Create .env file
   EXPO_PUBLIC_API_BASE=https://api.tripbuddy.com
   ```

3. **Start development:**
   ```bash
   # Start Expo dev server
   npm start

   # Run on specific platforms
   npm run android
   npm run ios
   npm run web
   ```

## Authentication

The app uses better-auth with role-based access control:

- **Admin**: Full access to all features
- **Staff**: Read access to users, can update own profile
- **Client**: Can only update own profile

### Routes

- `/(public)/login` - Login form
- `/(public)/unauthorized` - Access denied
- `/(protected)/` - Home dashboard (requires auth)
- `/(protected)/(admin)/` - Admin features
- `/(protected)/(staff)/` - Staff features
- `/(protected)/(client)/` - Client features

## API Integration

The fetcher utility handles:
- Automatic Bearer token injection
- Error parsing (JSON, HTML, text)
- Session expiration handling
- Toast notifications
- Network error handling

## Forms

All forms use React Hook Form with Zod validation:
- Type-safe form handling
- Real-time validation
- Error display
- Loading states

## UI Components

Built with shadcn/ui for React Native:
- Consistent design system
- Dark mode support
- Accessible components
- Tailwind CSS styling

## Development

- **TypeScript** - Full type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Expo** - Cross-platform development

## Production

Set `EXPO_PUBLIC_API_BASE` to your production API URL before building for production.


# Open Xcode and build manually
open ios/exposhadcnstarter.xcworkspace
# Then press Cmd+B to build in Xcode