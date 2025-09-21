# Navigation Context Error Fix Guide

## Problem Description

When clicking on "Upcoming" and "Expired" tabs in the tickets screen, you encountered this error:

```
"Couldn't find a navigation context. Have you wrapped your app with 'NavigationContainer'? See https://reactnavigation.org/docs/getting-started for setup instructions."
```

## Root Cause Analysis

The error was caused by **template literal class names with conditional logic** that were triggering runtime CSS parsing issues. This is a known compatibility issue between:

1. **React 19** (very new version)
2. **NativeWind** (Tailwind CSS for React Native)
3. **Expo Router** navigation context

### Technical Details

The problematic code pattern:
```typescript
// ❌ PROBLEMATIC - Causes runtime CSS parsing issues
className={`px-4 py-2 rounded-full ${
  activeTab === tab.id 
    ? 'bg-white shadow-sm border border-gray-200' 
    : 'bg-transparent'
}`}
```

When NativeWind encounters template literals with conditional logic, it tries to parse CSS at runtime. This parsing can interfere with React's rendering cycle and cause the navigation context to become unavailable during critical moments.

## Complete Solution

### 1. Replace Template Literal Class Names with Inline Styles

**Before (Problematic):**
```typescript
<Pressable
  className={`px-4 py-2 rounded-full ${
    activeTab === tab.id 
      ? 'bg-white shadow-sm border border-gray-200' 
      : 'bg-transparent'
  }`}
>
  <Text className={`font-medium ${
    activeTab === tab.id ? 'text-orange-500' : 'text-gray-600'
  }`}>
    {tab.label}
  </Text>
</Pressable>
```

**After (Fixed):**
```typescript
<Pressable
  style={{
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
    shadowOffset: activeTab === tab.id ? { width: 0, height: 1 } : undefined,
    shadowOpacity: activeTab === tab.id ? 0.05 : undefined,
    shadowRadius: activeTab === tab.id ? 2 : undefined,
    borderWidth: activeTab === tab.id ? 1 : 0,
    borderColor: activeTab === tab.id ? '#e5e7eb' : 'transparent',
  }}
>
  <Text style={{
    fontWeight: '500',
    color: activeTab === tab.id ? '#FF6B00' : '#6b7280'
  }}>
    {tab.label}
  </Text>
</Pressable>
```

### 2. Fix TicketCard Component

**Before (Problematic):**
```typescript
<View className={`px-3 py-1 rounded-full border ${getStatusPillStyle(ticket.status)}`}>
  <Text className={`text-xs font-medium ${getStatusTextStyle(ticket.status)}`}>
    {ticket.status.toUpperCase()}
  </Text>
</View>
```

**After (Fixed):**
```typescript
<View 
  style={{
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    ...(ticket.status === 'active' ? { backgroundColor: '#dcfce7', borderColor: '#bbf7d0' } :
        ticket.status === 'upcoming' ? { backgroundColor: '#dbeafe', borderColor: '#bfdbfe' } :
        { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' })
  }}
>
  <Text style={{
    fontSize: 12,
    fontWeight: '500',
    color: ticket.status === 'active' ? '#15803d' :
           ticket.status === 'upcoming' ? '#1d4ed8' : '#374151'
  }}>
    {ticket.status.toUpperCase()}
  </Text>
</View>
```

### 3. Add Comprehensive Error Handling

```typescript
// Add loading state
const [isLoading, setIsLoading] = useState(false)

// Enhanced useEffect with error handling
useEffect(() => {
  try {
    console.log('Filtering tickets for status:', activeTab)
    setIsLoading(true)
    const filteredTickets = getTicketsByStatus(activeTab)
    console.log('Found tickets:', filteredTickets.length)
    setTickets(filteredTickets)
  } catch (error) {
    console.error('Error filtering tickets:', error)
    setTickets([])
  } finally {
    setIsLoading(false)
  }
}, [activeTab])

// Safe tab switching
const handleTabChange = (tabId: TicketStatus) => {
  try {
    console.log('Changing tab to:', tabId)
    setActiveTab(tabId)
  } catch (error) {
    console.error('Error changing tab:', error)
  }
}

// Safe navigation
const handleOpenQR = (ticket: Ticket) => {
  try {
    console.log('Attempting to navigate to ticket:', ticket.id)
    router.push(`/tickets/${ticket.id}`)
  } catch (error) {
    console.error('Navigation error:', error)
  }
}
```

### 4. Fix Navigation Hook Usage

**Before (Problematic):**
```typescript
// ❌ Don't wrap hooks in try-catch
let ticketId: string | undefined;
try {
  const params = useLocalSearchParams<{ ticketId: string }>();
  ticketId = params.ticketId;
} catch (error) {
  console.warn('Navigation context not ready yet:', error);
}
```

**After (Fixed):**
```typescript
// ✅ Hooks should be called at the top level
const params = useLocalSearchParams<{ ticketId: string }>();
const ticketId = params.ticketId;
```

### 5. Add Loading States

```typescript
{isLoading ? (
  <View className="flex-1 justify-center items-center py-20">
    <ActivityIndicator size="large" color="#FF6B00" />
    <Text className="text-gray-500 text-center mt-4">
      Loading tickets...
    </Text>
  </View>
) : tickets.length === 0 ? (
  <View className="flex-1 justify-center items-center py-20">
    <Text className="text-gray-500 text-center">
      No {activeTab} tickets found
    </Text>
  </View>
) : (
  tickets.map((ticket) => (
    <TicketCard
      key={ticket.id}
      ticket={ticket}
      onOpenQR={handleOpenQR}
    />
  ))
)}
```

## Prevention Guidelines

### 1. Avoid Template Literal Class Names
```typescript
// ❌ Avoid this pattern
className={`base-class ${condition ? 'conditional-class' : 'other-class'}`}

// ✅ Use inline styles instead
style={{
  ...baseStyles,
  ...(condition ? conditionalStyles : otherStyles)
}}
```

### 2. Use useMemo for Complex Calculations
```typescript
// ✅ Memoize expensive calculations
const tabs = useMemo(() => {
  try {
    return [
      { id: 'active', label: 'Active', count: getTicketsByStatus('active').length },
      { id: 'upcoming', label: 'Upcoming', count: getTicketsByStatus('upcoming').length },
      { id: 'expired', label: 'Expired', count: getTicketsByStatus('expired').length }
    ]
  } catch (error) {
    console.error('Error calculating tab counts:', error)
    return [
      { id: 'active', label: 'Active', count: 0 },
      { id: 'upcoming', label: 'Upcoming', count: 0 },
      { id: 'expired', label: 'Expired', count: 0 }
    ]
  }
}, [])
```

### 3. Always Handle Navigation Errors
```typescript
// ✅ Always wrap navigation in try-catch
const handleNavigation = (path: string) => {
  try {
    router.push(path)
  } catch (error) {
    console.error('Navigation error:', error)
    // Handle error gracefully
  }
}
```

## Testing the Fix

1. **Start the development server:**
   ```bash
   npx expo start --clear
   ```

2. **Test tab switching:**
   - Click "Active" tab - should work
   - Click "Upcoming" tab - should work without errors
   - Click "Expired" tab - should work without errors

3. **Test navigation:**
   - Click "Open QR" on any ticket - should navigate to detail page
   - Use back button - should return to tickets list

4. **Check console:**
   - Should see debug logs for tab changes
   - No navigation context errors

## Files Modified

1. `app/(protected)/(client)/tickets.tsx` - Main tickets screen
2. `src/components/client/TicketCard.tsx` - Ticket card component
3. `app/(protected)/(client)/tickets/[ticketId]/index.tsx` - Ticket detail page

## Key Takeaways

1. **Template literal class names with conditionals can cause navigation context errors**
2. **Use inline styles for dynamic styling instead of template literals**
3. **Always wrap navigation operations in try-catch blocks**
4. **Don't wrap React hooks in try-catch blocks**
5. **Use useMemo for expensive calculations during render**
6. **Add loading states for better user experience**

This solution addresses the root cause of the navigation context error while improving the overall robustness and user experience of the tickets screen.
