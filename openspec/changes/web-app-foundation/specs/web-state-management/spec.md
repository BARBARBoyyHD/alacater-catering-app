## ADDED Requirements

### Requirement: TanStack Query Provider Setup
The web app SHALL wrap the application in a TanStack Query Provider configured with appropriate default stale time (5 minutes) and retry settings. The QueryClient SHALL be stable across re-renders.

#### Scenario: QueryClient initialized
- **WHEN** the app loads
- **THEN** a QueryClient is created and provided via QueryClientProvider

#### Scenario: Query stale time default
- **WHEN** a query is fetched
- **THEN** the cached data is considered stale after 5 minutes

### Requirement: Server State via TanStack Query
All server-side data (products, orders, providers, reviews) SHALL be fetched and cached using TanStack Query hooks. Mutations SHALL invalidate relevant query caches on success.

#### Scenario: Fetch provider products
- **WHEN** a provider's products are requested
- **THEN** TanStack Query caches the data and returns it on subsequent calls without refetching (until stale)

#### Scenario: Mutation invalidates cache
- **WHEN** a provider creates or updates a product
- **THEN** the products query cache is invalidated and refetched

### Requirement: Client State via Zustand
Client-side UI state (sidebar toggle, filter selections, modal open/close) SHALL be managed using Zustand stores. Each store SHALL be focused and minimal.

#### Scenario: Sidebar toggle state
- **WHEN** a user toggles the dashboard sidebar
- **THEN** the Zustand store updates and all subscribed components re-render

#### Scenario: Filter state persistence during session
- **WHEN** a user sets filters on a list page
- **THEN** the filters persist while navigating within the session

### Requirement: React Hook Form + Zod Integration
All forms in the web app SHALL use React Hook Form with Zod schema validation via `@hookform/resolvers`. Form schemas SHALL be defined in a shared `utils/validation.ts` file.

#### Scenario: Form validation on blur
- **WHEN** a user blurs out of a form field
- **THEN** Zod validation runs and inline errors are displayed for invalid fields

#### Scenario: Form submission with validation
- **WHEN** a user submits a form with valid data
- **THEN** the form submits; with invalid data, errors are shown and submission is blocked

### Requirement: Form State in Zustand
Complex multi-step forms (e.g., provider onboarding, product creation) SHALL use Zustand to persist draft state across steps.

#### Scenario: Draft persists between steps
- **WHEN** a user completes step 1 of a multi-step form and navigates to step 2
- **THEN** step 1 data is preserved in the Zustand store

#### Scenario: Draft cleared on submission
- **WHEN** a multi-step form is successfully submitted
- **THEN** the draft state is reset in the Zustand store
