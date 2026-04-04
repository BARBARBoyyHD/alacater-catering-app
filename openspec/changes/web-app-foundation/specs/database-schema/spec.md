## ADDED Requirements

### Requirement: Prisma Schema Definition
The database SHALL be defined using Prisma schema (`prisma/schema.prisma`) with all core models: User, Customer, Provider, Product, DurationOption, MealPlanOption, AdditionalMenu, Order, OrderItem, Review, DeliveryArea, OperatingHours, ProviderHoliday, Notification.

#### Scenario: Prisma schema includes User model
- **WHEN** the Prisma schema is inspected
- **THEN** a User model exists with id, email, role, name, phone, createdAt, updatedAt fields

#### Scenario: Prisma schema includes Provider model
- **WHEN** the Prisma schema is inspected
- **THEN** a Provider model exists with relations to User, Products, Orders, Reviews, DeliveryAreas

#### Scenario: Prisma schema includes Product model
- **WHEN** the Prisma schema is inspected
- **THEN** a Product model exists with relations to Provider, DurationOptions, MealPlanOptions, OrderItems, Reviews

### Requirement: Database Migration Management
All database schema changes SHALL be managed via Prisma migrations. The initial migration SHALL create all tables defined in the schema.

#### Scenario: Initial migration creates all tables
- **WHEN** `prisma migrate dev` is run for the first time
- **THEN** all tables (users, customers, providers, products, orders, etc.) are created in Supabase

#### Scenario: Migration tracking
- **WHEN** a migration is applied
- **THEN** the `_prisma_migrations` table records the migration name and timestamp

### Requirement: Row Level Security (RLS) Policies
All database tables SHALL have RLS enabled. Policies SHALL ensure users can only access their own data and providers can only access their own resources.

#### Scenario: Users can only view own data
- **WHEN** a user queries the users table
- **THEN** only their own row is returned (WHERE auth.uid() = id)

#### Scenario: Providers can only view own orders
- **WHEN** a provider queries the orders table
- **THEN** only orders for their products are returned

#### Scenario: Anyone can view active providers
- **WHEN** a query selects from the providers table
- **THEN** all active providers are visible (WHERE is_active = true)

#### Scenario: Only order customer can create review
- **WHEN** a review is inserted
- **THEN** the insert succeeds only if the reviewer is the customer of that order

### Requirement: Enum Types
The database SHALL include enum types: SubscriptionTier (FREE, PREMIUM), ProductCategory (WEIGHT_LOSS, MUSCLE_GAIN, KETO, VEGAN, HALAL, BALANCED, CUSTOM), OrderStatus (pending, paid, preparing, shipping, delivered, failed).

#### Scenario: SubscriptionTier enum exists
- **WHEN** the database is queried for enum types
- **THEN** SubscriptionTier with values FREE and PREMIUM exists

#### Scenario: ProductCategory enum exists
- **WHEN** the database is queried for enum types
- **THEN** ProductCategory with all 7 category values exists

#### Scenario: OrderStatus enum exists
- **WHEN** the database is queried for enum types
- **THEN** OrderStatus with all 6 status values exists

### Requirement: Database Seed Scripts
Seed scripts SHALL populate the database with initial data for development: sample providers, products, and test orders.

#### Scenario: Seed script runs successfully
- **WHEN** `prisma db seed` is executed
- **THEN** sample providers, products, and test orders exist in the database

#### Scenario: Seed data includes realistic content
- **WHEN** seeded data is inspected
- **THEN** providers have realistic names, products have varied categories, and prices are reasonable

### Requirement: Supabase Connection Pooling
The Prisma client SHALL connect via Supabase's connection pooler (Supavisor) using the transaction pooler port (6543).

#### Scenario: Prisma connects through pooler
- **WHEN** the DATABASE_URL includes the pooler endpoint
- **THEN** Prisma connects via port 6543 with `?pgbouncer=true`

#### Scenario: Connection limit respected
- **WHEN** many concurrent queries are executed
- **THEN** the connection pooler manages connections without exceeding the pool limit
