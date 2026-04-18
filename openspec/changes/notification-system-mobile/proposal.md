## Why

Users need to be promptly informed about order status updates, new promotions, and merchant communications to ensure a smooth marketplace experience. Push notifications and in-app alerts are critical for engagement and reliability.

## What Changes

- Implement push notification handling using Firebase Cloud Messaging (FCM).
- Create a dedicated Notification List screen.
- Build in-app notification badges for the home screen and navigation.
- Implement deep-linking navigation from notification taps.
- Add user-facing notification preferences and settings.

## Capabilities

### New Capabilities
- `push-notifications`: Infrastructure for receiving and handling remote messages via FCM.
- `in-app-notifications`: UI components for displaying alerts and badges within the app.
- `notification-history`: Interface for viewing a persistent log of received notifications.
- `notification-settings`: User controls for enabling/disabling specific notification types.

### Modified Capabilities
- `home-screen`: Update header to display active notification badges.
- `order-management-tracking`: Trigger notifications on status changes.

## Impact

- `RootLayout`: Initialize FCM listener and notification handlers.
- `Header`: Added logic for badge counts.
- New Screen: `NotificationListScreen`, `NotificationSettingsScreen`.
- Navigation: Integration with `expo-router` for deep linking.
- Dependencies: Add `@react-native-firebase/app`, `@react-native-firebase/messaging`.
