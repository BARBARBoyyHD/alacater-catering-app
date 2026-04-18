## Context

Implementing `ProductDetailScreen` for the Alacater React Native mobile app. The design will follow the visual specifications provided in `docs/ui/ProductDetailScreen.tsx` and the project's color guidelines.

## Goals / Non-Goals

**Goals:**
- Create a reusable `ProductDetailScreen` that displays comprehensive product information.
- Implement the requested sections: Hero banner, provider info, pricing, description, menu carousel, and reviews.
- Integrate a bottom action bar for user interaction.

**Non-Goals:**
- Backend API integration for this task (slicing focus only).
- Production-level state management (Zustand) integration (beyond basic structure).

## Decisions

- Component-based architecture following `react-native-app` standards (referencing existing `components/common`).
- Styling: Using `StyleSheet` with tokens from `constants/theme.ts`.

## Risks / Trade-offs

- [Risk] Performance with large number of images in carousel → Mitigation: Use standard `FlatList` or `ScrollView` optimizations if needed, but keeping it simple for now.
