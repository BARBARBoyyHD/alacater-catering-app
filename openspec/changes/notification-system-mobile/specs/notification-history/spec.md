## ADDED Requirements

### Requirement: Persistent Notification Log
The system SHALL store received notifications in a local or remote persistent log for browsing.

#### Scenario: View notification list
- **WHEN** user opens the Notification List screen
- **THEN** system displays all received notifications in reverse chronological order

### Requirement: Mark as Read
The system SHALL allow users to mark individual or all notifications as read.

#### Scenario: Clear unread
- **WHEN** user opens a notification or clicks "Mark All as Read"
- **THEN** system clears the unread status and decrements the global badge count
