# Catering Cards

The catering cards capability provides reusable components for displaying provider and package information.

## Requirements

### REQ-1: Provider Card
The system SHALL render a provider section containing:
- Provider logo/icon placeholder
- Provider name with verified badge (orange checkmark for verified providers)
- Rating display (star icon + rating number + review count)
- Chevron-forward icon for navigation
- Horizontal scrollable package cards below

### REQ-2: Package Card
Each package card SHALL display:
- Package image (full-width at top)
- Package name (bold, 16px)
- Rating with star icon
- "Mulai dari" price label
- Price in bold orange (#FF7B00)
- Dietary tags as small chips with borders

### REQ-3: Card Layout
Package cards SHALL be arranged horizontally with:
- Fixed width: (screenWidth - 32 - 32 - 12) / 2
- Gap of 12px between cards
- Rounded corners (borderRadius: 12)
- Light gray background (#F5F5F5)

### REQ-4: Price Formatting
Prices SHALL be formatted as "Rp{amount}" with Indonesian locale (toLocaleString('id-ID')).
