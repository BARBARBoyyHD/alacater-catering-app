# Home Screen

The home screen capability provides the main discovery interface for customers.

## Requirements

### REQ-1: Home Screen Layout
The system SHALL render a scrollable home screen with a fixed header at the top and bottom navigation at the bottom.

### REQ-2: Header Component
The header SHALL display:
- Location label ("Lokasi") above the location selector
- Location selector button with current location text and chevron-down icon
- Notification icon with badge count
- Chat icon with badge count

### REQ-3: Content Sections
The home screen content area SHALL render, in order:
1. Promo banner carousel
2. Search and filter section
3. Recommendations title ("Rekomendasi catering")
4. Provider sections with package cards

### REQ-4: Scroll Behavior
The main content SHALL be vertically scrollable with hidden scroll indicators.
