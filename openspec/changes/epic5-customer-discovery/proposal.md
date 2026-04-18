## Why

The Home Screen is the primary entry point for customers to discover, search, and browse catering packages. Currently, no home screen exists — users have no way to explore providers, filter by dietary preferences, or view promotions. This change implements the complete customer discovery experience (MOB-5.1 to MOB-5.9) to enable core browsing functionality.

## What Changes

- **Location selector** in header with dropdown (Bandung, Gedebage, etc.)
- **Header** with notification badge and chat icons
- **Promo banner carousel** with auto-scroll and pagination dots (Halloween, seasonal promos)
- **Search bar** with autocomplete input for catering names/packages
- **Filter chips** (Vegan, Halal, Kalori, etc.) with active/inactive states and dropdown support
- **Catering recommendation sections** with provider info and verified badges
- **Provider cards** showing ratings, review counts, and packages
- **Package cards** (Weightloss, Muscle Gain, etc.) with images, pricing, and dietary tags
- **Bottom navigation** (Home, Pesanan Saya, Pengaturan) with active state highlighting
- **Auth bypass** — skip login flow temporarily since Supabase/OAuth isn't configured yet

## Capabilities

### New Capabilities
- `home-screen`: Complete home screen layout with header, search, filters, banners, and bottom navigation
- `discovery-search`: Search functionality with autocomplete and filter chip system
- `catering-cards`: Provider and package card components with ratings, pricing, and tags
- `promo-carousel`: Horizontal banner carousel with pagination and auto-scroll
- `location-selector`: Location dropdown in header with persistent selection
- `bottom-navigation`: Tab-based navigation with active state management

### Modified Capabilities
<!-- No existing specs to modify yet -->

## Impact

- **New screens**: `HomeScreen.tsx` as primary entry point
- **New components**: `Header`, `SearchBar`, `FilterChip`, `PromoBanner`, `ProviderCard`, `PackageCard`, `BottomNavigation`
- **Navigation**: Updates to root navigator to set HomeScreen as default (bypassing auth)
- **State**: Location state, active filters, search query management
- **Design system**: Follows Color Guidelines (`#FF7B00` primary, `#333` text, `#F5F5F5` background)
- **Icons**: Uses `@expo/vector-icons` (Ionicons) throughout
- **Data**: Mock data initially, ready for API integration later
