## Context
Styling `ProductDetailScreen` to match `docs/ui/ProductDetailScreen.tsx`.

## Goals / Non-Goals
**Goals:**
- Implement all sections: Hero, Provider, Pricing, About, Menu, Reviews, Bottom Bar.
- Use project colors and fonts.
- Add responsiveness.

**Non-Goals:**
- Real backend data (mock data is fine for now).

## Decisions
- Re-use the structure/layout logic from `docs/ui/ProductDetailScreen.tsx` but adapt it to use current local project `Colors` and components.
- Modularize components within `ProductDetailScreen` if it gets too large.

## Risks / Trade-offs
- [Risk] Mismatch between design and implementation → Mitigation: Constant reference to `docs/ui/ProductDetailScreen.tsx`.
