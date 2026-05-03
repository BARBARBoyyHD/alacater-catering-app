## ADDED Requirements

### Requirement: Order Management Dashboard UI
The system SHALL provide a web-based dashboard for catering providers to manage their orders.

#### Scenario: Dashboard Overview
- **WHEN** a provider logs into the Mitra portal
- **THEN** they see an overview of active orders, including status, customer name, and order value

### Requirement: Order Filtering and Search
The system SHALL allow providers to filter orders by status (Pending, Preparing, Shipping, Delivered) and search by order number or customer name.

#### Scenario: Filter by Status
- **WHEN** a provider selects the "Preparing" status filter
- **THEN** only orders with the "Preparing" status are displayed in the list

### Requirement: Order Detail View
The system SHALL display full details of a selected order, including items, delivery address, and schedule.

#### Scenario: View Order Details
- **WHEN** a provider clicks on an order in the dashboard
- **THEN** a detailed view is shown with all relevant order information
