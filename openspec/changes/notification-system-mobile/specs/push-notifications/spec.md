## ADDED Requirements

### Requirement: FCM Integration
The system SHALL integrate with Firebase Cloud Messaging (FCM) to receive push notifications on both iOS and Android.

#### Scenario: Receive push notification
- **WHEN** a data or display message is sent via FCM
- **THEN** system receives the message and triggers appropriate local handlers

### Requirement: Permission Request
The system SHALL request user permission for notifications upon the first relevant interaction or app launch.

#### Scenario: Grant permission
- **WHEN** user is prompted for notification permissions
- **THEN** system records the choice and enables/disables push handling accordingly
