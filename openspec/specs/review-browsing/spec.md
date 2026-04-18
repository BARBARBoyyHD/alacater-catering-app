# Review Browsing

The review browsing capability allows users to view feedback from other customers.

## Requirements

### Requirement: Review List with Avatars
The system SHALL display a list of reviews including the user's avatar, name, rating, date, and review text.

#### Scenario: View review list
- **WHEN** user navigates to the reviews section of a product
- **THEN** system displays all verified reviews for that product

### Requirement: Helpful Vote
The system SHALL allow users to mark a review as "Helpful".

#### Scenario: Like a review
- **WHEN** user taps the "Helpful" button on a review
- **THEN** system increments the helpful count for that review
