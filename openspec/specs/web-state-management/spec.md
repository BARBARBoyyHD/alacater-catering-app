# Web State Management

The web state management capability handles application state and server synchronization.

## Requirements

### REQ-1: TanStack Query Provider Setup
The web app SHALL wrap the application in a TanStack Query Provider configured with appropriate default stale time (5 minutes) and retry settings.

### REQ-2: Server State via TanStack Query
All server-side data SHALL be fetched and cached using TanStack Query hooks. Mutations SHALL invalidate relevant query caches on success.

### REQ-3: Client State via Zustand
Client-side UI state SHALL be managed using Zustand stores. Each store SHALL be focused and minimal.

### REQ-4: React Hook Form + Zod Integration
All forms in the web app SHALL use React Hook Form with Zod schema validation.

### REQ-5: Form State in Zustand
Complex multi-step forms SHALL use Zustand to persist draft state across steps.
