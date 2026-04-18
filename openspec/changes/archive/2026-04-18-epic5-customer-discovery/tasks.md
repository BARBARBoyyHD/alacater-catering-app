## 1. Project Setup

- [x] 1.1 Install `@react-navigation/native`, `@react-navigation/bottom-tabs`, and required dependencies
- [x] 1.2 Install `@expo/vector-icons` (if not already installed)
- [x] 1.3 Create `src/screens/HomeScreen.tsx`
- [x] 1.4 Create `src/components/common/` directory
- [x] 1.5 Create `src/components/home/` directory
- [x] 1.6 Create `src/data/mockData.ts` with typed interfaces (Provider, Package, Filter)
- [x] 1.7 Create `src/constants/colors.ts` from Color Guidelines

## 2. Common Components

- [x] 2.1 Create `FilterChip.tsx` with active/inactive states and optional dropdown chevron
- [x] 2.2 Create `PromoBanner.tsx` with FlatList carousel, pagination dots, and overlay text
- [x] 2.3 Create `BottomNavigation.tsx` with 3 tabs (Home, Pesanan Saya, Pengaturan) and active state styling

## 3. Home Screen Components

- [x] 3.1 Create `Header.tsx` with location selector button, notification/chat icons with badges
- [x] 3.2 Create `SearchSection.tsx` with search bar and horizontal filter chips
- [x] 3.3 Create `ProviderCard.tsx` with logo, name, verified badge, rating, and horizontal package list
- [x] 3.4 Create `PackageCard.tsx` with image, name, rating, price, and dietary tags

## 4. Home Screen Assembly

- [x] 4.1 Implement `HomeScreen.tsx` assembling all components in correct layout order
- [x] 4.2 Add ScrollView with promo banner, search section, recommendations title, and provider sections
- [x] 4.3 Wire up location state, search query state, and filter toggle handlers
- [x] 4.4 Apply Color Guidelines tokens throughout (primary: #FF7B00, textPrimary: #333, background: #F5F5F5)
- [x] 4.5 Add price formatting utility (Indonesian locale)

## 5. Navigation Setup

- [x] 5.1 Create root BottomTabs navigator with HomeScreen as default tab
- [x] 5.2 Configure tab options (icons, labels, active/inactive colors)
- [x] 5.3 Set BottomTabs as app root (bypass auth screens temporarily)
- [x] 5.4 Create stub screens for "Pesanan Saya" and "Pengaturan" tabs

## 6. Testing & Verification

- [x] 6.1 Verify HomeScreen renders correctly on Android emulator
- [x] 6.2 Verify HomeScreen renders correctly on iOS simulator
- [x] 6.3 Verify bottom navigation tab switching works
- [x] 6.4 Verify filter chip toggle visual states
- [x] 6.5 Verify promo banner pagination dots update on scroll
