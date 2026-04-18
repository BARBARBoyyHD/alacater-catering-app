## ADDED Requirements

### Requirement: Global Notification Badge
The system SHALL maintain a global unread count badge on the app icon and relevant header icons.

#### Scenario: Update badge count
- **WHEN** a new notification is received
- **THEN** system increments the unread count badge in the UI

### Requirement: Local Alert Display
The system SHALL display an in-app alert or snackbar when a notification arrives while the app is in the foreground.

#### Scenario: Foreground notification
- **WHEN** app is in foreground and notification arrives
- **THEN** system displays a non-intrusive alert with the message content
