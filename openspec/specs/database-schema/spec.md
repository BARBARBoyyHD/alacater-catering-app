# Database Schema

The database schema capability defines the data structures and relations for the Alacater platform.

## Requirements

### REQ-1: Prisma Schema Definition
The database SHALL be defined using Prisma schema (`prisma/schema.prisma`) with all core models: User, Customer, Provider, Product, DurationOption, MealPlanOption, AdditionalMenu, Order, OrderItem, Review, DeliveryArea, OperatingHours, ProviderHoliday, Notification.

### REQ-2: Database Migration Management
All database schema changes SHALL be managed via Prisma migrations. The initial migration SHALL create all tables defined in the schema.

### REQ-3: Row Level Security (RLS) Policies
All database tables SHALL have RLS enabled. Policies SHALL ensure users can only access their own data and providers can only access their own resources.

### REQ-4: Enum Types
The database SHALL include enum types: SubscriptionTier (FREE, PREMIUM), ProductCategory (WEIGHT_LOSS, MUSCLE_GAIN, KETO, VEGAN, HALAL, BALANCED, CUSTOM), OrderStatus (pending, paid, preparing, shipping, delivered, failed).

### REQ-5: Database Seed Scripts
Seed scripts SHALL populate the database with initial data for development: sample providers, products, and test orders.

### REQ-6: Supabase Connection Pooling
The Prisma client SHALL connect via Supabase's connection pooler (Supavisor) using the transaction pooler port (6543).
