## Context

The Home Screen is the first screen users see after bypassing auth. The reference implementation (`docs/ui/HomeScreen.tsx`) provides a complete visual design with:
- Header with location selector, notification/chat icons with badges
- Promo banner carousel with pagination dots
- Search bar + horizontal filter chips
- Provider sections with package cards
- Bottom navigation (3 tabs)

**Constraints:**
- Auth is not set up (Supabase/OAuth pending) — must bypass login
- Mock data only for now — API integration comes later
- Must follow Color Guidelines: `#FF7B00` (primary), `#333` (text), `#F5F5F5` (background)
- Uses `@expo/vector-icons` (Ionicons)
- React Native + Expo (from existing project setup)

**Stakeholders:**
- Customer users (primary)
- Future provider/admin roles (navigation may expand)

## Goals / Non-Goals

**Goals:**
- Implement pixel-accurate HomeScreen matching the reference design
- Create reusable components (ProviderCard, PackageCard, FilterChip, etc.)
- Set up bottom navigation as root navigator
- Bypass auth temporarily with mock user context
- Support location state, search query, and filter state management
- Prepare for API integration (clean data interfaces)

**Non-Goals:**
- Actual authentication/OAuth flow (handled by `auth-mobile` change)
- Real-time chat or notification functionality (UI only, badges are static)
- Search autocomplete backend (UI with mock data only)
- Banner CMS or dynamic promo loading
- Provider/package data fetching — mock data suffices

## Decisions

### 1. Navigation: Bottom Tabs as Root Navigator

**Decision:** Use `@react-navigation/bottom-tabs` as the root navigator, with `HomeScreen` as the default tab. Auth screens are removed from the navigation tree temporarily.

**Rationale:** Simplest path for auth bypass. When auth is ready, we wrap in an auth navigator or use conditional rendering.

**Alternatives considered:**
- Stack navigator with conditional auth → adds complexity we don't need yet
- Nested auth flow → overkill for MVP

### 2. Component Structure: Feature-Based with Shared Common

**Decision:**
```
react-native-app/src/
├── screens/
│   └── HomeScreen.tsx
├── components/
│   ├── common/
│   │   ├── BottomNavigation.tsx
│   │   ├── FilterChip.tsx
│   │   └── PromoBanner.tsx
│   ├── home/
│   │   ├── Header.tsx
│   │   ├── SearchSection.tsx
│   │   ├── ProviderSection.tsx
│   │   ├── ProviderCard.tsx
│   │   └── PackageCard.tsx
```

**Rationale:** `common/` components (FilterChip, BottomNavigation, PromoBanner) may be reused in other screens. `home/` components are screen-specific.

### 3. State Management: Local State + Props (No Global Yet)

**Decision:** Use `useState` within `HomeScreen` for location, search query, and active filters. Pass data via props to child components. No Zustand or TanStack Query yet.

**Rationale:** Mock data + no server state = no need for global state. When API integration happens, TanStack Query can be introduced per the ITA.

### 4. Mock Data: Separate File with TypeScript Interfaces

**Decision:** Create `src/data/mockData.ts` with typed interfaces (`Provider`, `Package`, `Filter`) matching the Prisma schema shape where possible.

**Rationale:** Makes swap to real API data trivial later. Also serves as a contract reference for backend team.

### 5. Image Handling: Remote URLs with Placeholder

**Decision:** Use `Image` with remote URLs from mock data. No caching library yet — rely on React Native's built-in cache. Add a solid color placeholder or `require()` for local fallback.

**Rationale:** `expo-image` or `react-native-fast-image` adds dependency weight. RN's built-in `Image` is sufficient for MVP.

### 6. Promo Banner: FlatList with Paging

**Decision:** Use `FlatList` with `pagingEnabled` and `horizontal` for the banner carousel. Manual pagination dots via `onScroll` + `viewabilityConfig`.

**Rationale:** Avoids `react-native-snap-carousel` dependency. FlatList is built-in and performant.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| **Auth bypass may cause issues when auth is added** | Use a mock user context that can be swapped for real auth later. Keep navigation structure clean. |
| **Mock data divergence from real API** | Define TypeScript interfaces that match Prisma schema. Review when API integration starts. |
| **FlatList carousel may not feel as smooth as snap-carousel** | Acceptable for 3-5 banners. If smoothness becomes an issue, add `react-native-snap-carousel` later. |
| **No image caching could cause performance issues** | Acceptable for MVP. Add `expo-image` or `react-native-fast-image` in optimization phase. |
| **Hardcoded filter options** | Move to config file or API endpoint when backend supports dynamic filters. |

## Migration Plan

1. **Create components** in `src/components/common/` and `src/components/home/`
2. **Create `HomeScreen.tsx`** in `src/screens/` referencing components
3. **Update root navigator** to use bottom tabs with HomeScreen as default
4. **Add mock data** file with typed interfaces
5. **Test** on both iOS and Android simulators
6. **Rollback:** Revert to previous commit — no database changes involved

## Open Questions

1. **Location data source:** Should location options (Bandung, Gedebage, etc.) come from an API or hardcoded config? → *Defer to API integration phase.*
2. **Banner images:** Should we use remote URLs or bundle promotional images locally? → *Remote URLs for now; can switch to bundled for offline support later.*
3. **Filter behavior:** Should selecting a filter immediately trigger a search, or just update UI state? → *UI state only for now; trigger search on explicit search action.*
