# Order Detail View

The order detail view capability provides a comprehensive overview of a single order.

## Requirements

### Requirement: Display Order Information
The system SHALL display detailed order information, including Order ID, order date, total price, and items purchased.

#### Scenario: View order info
- **WHEN** user opens the order detail screen
- **THEN** system displays the Order ID, date, and items list

### Requirement: Display Provider Information
The system SHALL display the provider's name, logo, and rating summary on the order detail screen.

#### Scenario: View provider info
- **WHEN** user is on the order detail screen
- **THEN** system shows the catering merchant's business details

### Requirement: Submit Review Link
The system SHALL display a "Beri Ulasan" button for orders with status "Selesai".

#### Scenario: Review prompt for completed order
- **WHEN** order status is "Selesai"
- **THEN** system shows a button to navigate to the review submission screen
