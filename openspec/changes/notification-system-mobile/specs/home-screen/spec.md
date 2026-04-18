## MODIFIED Requirements

### REQ-2: Header Component
The header SHALL display:
- Location label ("Lokasi") above the location selector
- Location selector button with current location text and chevron-down icon
- Notification icon with dynamic badge count representing unread notifications
- Chat icon with badge count

#### Scenario: View badge in header
- **WHEN** user has unread notifications
- **THEN** the notification icon in the header displays a red dot or number badge
