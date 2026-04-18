## Context

The marketplace lacks a feedback loop between customers and providers. This design introduces a comprehensive review system including submission, browsing, and limited editing capabilities.

## Goals / Non-Goals

**Goals:**
- Provide a user-friendly interface for rating and reviewing catering services.
- Integrate reviews into the product discovery flow (Product Detail).
- Support multimedia feedback (images).
- Implement business logic for verified reviews and edit windows.

**Non-Goals:**
- Review moderation system (Admin panel only).
- Advanced sentiment analysis or automated filtering.

## Decisions

- **Architecture**: Create a `ReviewSubmissionScreen` at `app/reviews/new.tsx`.
- **Navigation**:
  - `OrderDetailScreen` → `ReviewSubmissionScreen` (for completed orders).
  - `ProductDetailScreen` → `ReviewListScreen` (for browsing all reviews).
- **State Management**: Use **TanStack Query** for all review data. Invalidate product and provider queries after submission to update averages.
- **Image Handling**: Use `expo-image-picker` for selecting photos. Upload to Supabase Storage `review-images` bucket.
- **UI Components**:
  - **StarRating**: Custom component using `Ionicons` for interactive star selection.
  - **ReviewCard**: Reusable component for displaying user feedback.

## Risks / Trade-offs

- **[Risk]** Spammed/Fake Reviews → **Mitigation**: Backend MUST enforce transaction-verified reviews (only allow reviews for orders with `status: 'Selesai'`).
- **[Risk]** Performance with many reviews → **Mitigation**: Implement pagination for review lists.
