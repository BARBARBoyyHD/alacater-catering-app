# Review Submission

The review submission capability allows customers to provide feedback on their completed orders.

## Requirements

### Requirement: Multi-criteria Rating
The system SHALL allow users to rate their order based on four criteria: Overall, Taste, Food Quality, and Delivery.

#### Scenario: Rate experience
- **WHEN** user is on the review submission screen
- **THEN** system displays four sets of star ratings (1-5 stars)

### Requirement: Text Review Input
The system SHALL provide a text area for users to write a detailed review (minimum 10 characters).

#### Scenario: Write review
- **WHEN** user enters text into the review field
- **THEN** system saves the text as part of the review

### Requirement: Image Upload in Review
The system SHALL allow users to upload up to 3 images with their review.

#### Scenario: Upload review images
- **WHEN** user selects images from their device
- **THEN** system displays thumbnails of the selected images before submission
