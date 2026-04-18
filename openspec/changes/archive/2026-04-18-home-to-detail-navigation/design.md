## Context
Implementing navigation from Home to Product Detail screen in React Native.

## Goals / Non-Goals
**Goals:**
- Enable clicking on product cards in `HomeScreen` to navigate to `ProductDetailScreen`.
- Pass the product ID to the detail screen for fetching/displaying data.

**Non-Goals:**
- Handling complex nested navigation (sticking to flat stack for now).

## Decisions
- Update `HomeScreen` and its sub-components to accept navigation props.
- Add `ProductDetailScreen` to the navigation stack.

## Risks / Trade-offs
- [Risk] Navigating to non-existent screen name → Mitigation: Use typed route names.
