## Why

The current `ProductDetailScreen` displays menu items but they are not interactive. Users need to be able to interact with menu items, likely to view details or add them to their order.

## What Changes

- Implement interaction handlers for menu items in `ProductDetailScreen`.
- Add `TouchableOpacity` to menu items.
- Define a clear interaction flow (e.g., alert or navigation) when a menu item is tapped.

## Capabilities

### New Capabilities
- `product-menu-interaction`: Enables interaction with individual menu items on the product detail screen.

### Modified Capabilities
- `product-detail-view`: Updates requirement to include interactive menu items.

## Impact

- Updates `ProductDetailScreen.tsx`.
- Potentially adds new navigation routes if menu item details are shown.
