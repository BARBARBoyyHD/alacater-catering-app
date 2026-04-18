## Context

The app needs a robust way to deliver real-time updates to users. Currently, there is no push notification infrastructure or in-app messaging system. This design introduces FCM for remote pushes and a unified local notification handler.

## Goals / Non-Goals

**Goals:**
- Reliable push notification delivery via Firebase.
- Real-time in-app badge updates for the Home header.
- Persistent local history of notifications.
- Support for category-based notification toggles.

**Non-Goals:**
- Rich notifications with custom UI (sticking to system defaults for now).
- Server-side implementation of notification triggers (out of scope for this mobile change).

## Decisions

- **Push Infrastructure**: Use `@react-native-firebase/messaging`. Rationale: Industry standard for React Native with robust Android/iOS support.
- **Local Alerts**: Use `expo-notifications` for foreground alerts and badge management. Rationale: High-level API that integrates well with Expo and provides cross-platform badge control.
- **State Management**: Use **Zustand** (`notificationStore.ts`) to track the list of notifications and unread counts globally.
- **Deep Linking**: Use `expo-router`'s URL scheme to navigate users directly to Order Detail or Promotion screens upon notification tap.
- **Persistence**: Store the notification log in `AsyncStorage` or similar local storage via Zustand's persist middleware.

## Risks / Trade-offs

- **[Risk]** Notification Permission Denial → **Mitigation**: Implement a fallback "In-App Notification Center" that works even if push is disabled, and provide clear UI on why permissions are needed.
- **[Risk]** Token Refresh → **Mitigation**: Ensure the FCM token is refreshed and sent to the backend whenever the app launches or a refresh event occurs.
