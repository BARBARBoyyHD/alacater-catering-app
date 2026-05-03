## ADDED Requirements

### Requirement: Email Notifications for Providers
The system SHALL send email notifications to providers for critical order events (e.g., New Order Paid).

#### Scenario: Send New Order Email
- **WHEN** an order status changes to "PAID"
- **THEN** an email notification is sent to the provider's registered email address

### Requirement: In-App Notifications
The system SHALL display in-app notifications in the Mitra portal for status updates and new orders.

#### Scenario: Display In-App Alert
- **WHEN** a new order is received
- **THEN** a notification badge and message appear in the provider's dashboard header

### Requirement: Push Notifications for Status Changes
The system SHALL trigger push notifications (via Mobile app) for customers when their order status is updated by the provider.

#### Scenario: Notify Customer of Shipment
- **WHEN** a provider marks an order as "SHIPPING"
- **THEN** a push notification is sent to the customer's mobile device
