# Discovery Search

The discovery search capability enables users to search for catering and filter by dietary preferences.

## Requirements

### REQ-1: Search Bar
The system SHALL render a search bar with:
- Search icon (Ionicons)
- Text input with placeholder "Cari catering..."
- Light gray background (#F5F5F5)
- Rounded corners (borderRadius: 12)

### REQ-2: Filter Chips
The filter section SHALL render horizontally scrollable chips where each chip:
- Displays a label (e.g., "Vegan", "Halal", "Kalori")
- Supports active/inactive visual states
- Active state: orange background (#FF7B00), white text
- Inactive state: light gray background (#F5F5F5), dark text (#666)
- Optionally displays a dropdown chevron for filter chips with sub-options

### REQ-3: Search State
The system SHALL maintain a search query string that updates as the user types.

### REQ-4: Filter State
The system SHALL track which filter chips are active and allow toggling them on/off.
