## 1. Project Setup & State Management

- [x] 1.1 Install dependencies: `@react-native-firebase/app`, `@react-native-firebase/messaging`, `expo-notifications`
- [x] 1.2 Create `src/store/notificationStore.ts` using Zustand with persistence
- [x] 1.3 Initialize FCM in `RootLayout` and request user permissions
- [x] 1.4 Implement background and foreground message handlers

## 2. Notification UI Components

- [x] 2.1 Create reusable `NotificationItem` component
- [x] 2.2 Update `src/components/home/Header.tsx` to display unread badge count
- [x] 2.3 Implement local alert/toast for foreground notifications

## 3. Screens & Navigation

- [x] 3.1 Create `app/notifications/index.tsx` (NotificationListScreen)
- [x] 3.2 Implement "Mark as Read" and "Clear All" functionality in the list
- [x] 3.3 Create `app/notifications/settings.tsx` (NotificationSettingsScreen)
- [x] 3.4 Implement deep-linking navigation logic for notification tap events

## 4. Refinement & Testing

- [x] 4.1 Implement granular notification toggles in the settings screen
- [x] 4.2 Verify badge synchronization across different screens
- [x] 4.3 Mock notification triggers for order status changes
