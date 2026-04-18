## Context

Making the menu carousel items in `ProductDetailScreen` interactive.

## Goals / Non-Goals

**Goals:**
- Make menu items in `ProductDetailScreen` clickable.
- Provide feedback on interaction (e.g., console log or alert for now).

**Non-Goals:**
- Implementing full-blown menu item detail screens (unless requested later).

## Decisions

- Wrap menu item display components in `TouchableOpacity`.
- Handle `onPress` in `ProductDetailScreen`.

## Risks / Trade-offs

- [Risk] Navigating to non-existent screens → Mitigation: Keep interaction simple (Alert) for now.
