# Bottom Navigation

The bottom navigation capability provides tab-based navigation between the app's main sections.

## Requirements

### REQ-1: Navigation Tabs
The system SHALL render a bottom navigation bar with 3 tabs:
1. **Home** — house icon, active color (#FF7B00)
2. **Pesanan Saya** — bag icon, inactive color (#666)
3. **Pengaturan** — settings icon, inactive color (#666)

### REQ-2: Tab Styling
Each tab SHALL display:
- Icon (24px) centered above text
- Label text (12px) below icon
- Active tab: orange icon + bold text
- Inactive tabs: gray icon + regular text
- White background with top border (#E5E5E5)
- Bottom padding for safe area (20px)

### REQ-3: Tab Interaction
Tapping a tab SHALL navigate to the corresponding screen. The active tab SHALL be visually highlighted.

### REQ-4: Fixed Position
The bottom navigation SHALL remain fixed at the bottom of the screen, not scrolling with content.
