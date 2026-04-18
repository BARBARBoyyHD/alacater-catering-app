# Location Selector

The location selector capability allows users to view and change their delivery location.

## Requirements

### REQ-1: Location Display
The header SHALL display the current location with:
- "Lokasi" label above the selector
- Location button showing current location text (e.g., "Bandung, Gedebage")
- Location icon (orange)
- Chevron-down icon indicating dropdown capability

### REQ-2: Location Button Styling
The location button SHALL have:
- Orange border (#FF7B00, borderWidth: 1.5)
- White background
- Rounded corners (borderRadius: 24)
- Horizontal padding: 16px, Vertical padding: 10px

### REQ-3: Location Change
Tapping the location button SHALL open a location selection modal/dropdown.
