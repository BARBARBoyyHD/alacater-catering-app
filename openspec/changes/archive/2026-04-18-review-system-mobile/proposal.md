## Why

Customers need a way to provide feedback on their catering orders to help others make informed decisions and help merchants improve their service. A review system builds trust within the marketplace.

## What Changes

- Create a Review Submission screen for customers to rate their experience.
- Implement multi-criteria star ratings (Overall, Taste, Quality, Delivery).
- Support image uploads in reviews.
- Display a review list with user avatars on product detail pages.
- Implement "Helpful" (Like) functionality for reviews.
- Allow review editing within a 48-hour window.

## Capabilities

### New Capabilities
- `review-submission`: Interface for creating and submitting order reviews.
- `review-browsing`: Displaying list of reviews for products/providers.
- `review-management`: Editing existing reviews within policy constraints.

### Modified Capabilities
- `order-detail-view`: Add link to submit review for completed orders.
- `product-detail-view`: Integrate review list component.

## Impact

- `ProductDetailScreen`: Updated to show full review list.
- `OrderDetailScreen`: Added "Beri Ulasan" button for completed orders.
- New Screen: `ReviewSubmissionScreen`.
- Backend: New API endpoints for review CRUD and image handling.
