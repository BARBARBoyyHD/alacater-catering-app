# GEMINI.md - AI Assistant Guidelines

**Project:** Alacater  
**Version:** 1.0.0  
**Last Updated:** 2026-04-02  
**Related:** [OpenSpec](./openspec.md), [ITA](./docs/projects/2-technical/04.Implementation-Technical-Architecture.md), [BRD](./docs/projects/1-business/01.BRD-alacater.md)

---

## 1. Purpose

This document defines how AI assistants should interact with the Alacater codebase, follow project conventions, and assist developers efficiently.

---

## 2. Core Principles

### 2.1 DRY (Don't Repeat Yourself)

- **Reference, don't duplicate:** Link to existing documentation instead of rewriting
- **Reuse components:** Point to existing UI components before creating new ones
- **Single source of truth:** Each concept documented in one place only

### 2.2 KISS (Keep It Simple, Stupid)

- **Minimal complexity:** Prefer simple solutions over complex architectures
- **Clear naming:** Use descriptive, consistent naming conventions
- **Straightforward logic:** Avoid over-engineering

### 2.3 Component Reusability

- **Modular design:** Create small, focused components
- **Props-driven:** Configure behavior via props, not internal state
- **Type-safe:** Always use TypeScript with proper types

---

## 3. Project Context

### 3.1 Technology Stack

| Layer | Technology | Reference |
|-------|------------|-----------|
| **Mobile** | React Native 0.76+ | [ITA §2.1](./docs/projects/2-technical/04.Implementation-Technical-Architecture.md#21-frontend-applications) |
| **Web** | Next.js 15+ | [ITA §2.1](./docs/projects/2-technical/04.Implementation-Technical-Architecture.md#21-frontend-applications) |
| **Database** | Supabase PostgreSQL + Prisma | [ITA §2.2](./docs/projects/2-technical/04.Implementation-Technical-Architecture.md#22-backend--infrastructure) |
| **State** | TanStack Query + Zustand | [ITA §2.1](./docs/projects/2-technical/04.Implementation-Technical-Architecture.md#21-frontend-applications) |
| **UI** | Custom (per Color Guidelines) | [Color Guidelines](./docs/projects/3-design/02.Color-Guidelines.md) |

### 3.2 Key Documents

| Document | Purpose | Location |
|----------|---------|----------|
| **BRD** | Business requirements | [`docs/projects/1-business/01.BRD-alacater.md`](./docs/projects/1-business/01.BRD-alacater.md) |
| **PRD** | Product requirements | [`docs/projects/1-business/PRD.md`](./docs/projects/1-business/PRD.md) |
| **SCOPE** | Project scope & monetization | [`docs/projects/1-business/SCOPE.md`](./docs/projects/1-business/SCOPE.md) |
| **ITA** | Technical architecture | [`docs/projects/2-technical/04.Implementation-Technical-Architecture.md`](./docs/projects/2-technical/04.Implementation-Technical-Architecture.md) |
| **Backlog** | Task breakdown | [`docs/projects/4-planning/05.Product-Backlog.md`](./docs/projects/4-planning/05.Product-Backlog.md) |
| **Colors** | Design system | [`docs/projects/3-design/02.Color-Guidelines.md`](./docs/projects/3-design/02.Color-Guidelines.md) |

---

## 4. Code Generation Guidelines

### 4.5 Mandatory Pre-Flight UI Check
Before writing any UI code (React Native or Next.js), the agent MUST perform a pre-flight check:
1. **Read Requirement:** Open `docs/projects/3-design/02.Color-Guidelines.md` and relevant project files.
2. **Verification:** Confirm the color tokens (`Colors.primary`, `Colors.textPrimary`, etc.) that will be used.
3. **Output:** Before writing code, output a block titled `### Pre-Flight UI Check`:
   ```
   ### Pre-Flight UI Check
   - [ ] Color Guidelines read
   - [ ] Tokens identified: [list tokens]
   ```
4. **Execution:** Only proceed to code generation after this check is complete.

### 4.1 TypeScript Standards

```typescript
// ✅ DO: Use explicit types, interfaces for props
interface ProductCardProps {
  product: Product;
  onPress: (id: string) => void;
  variant?: 'default' | 'featured';
}

// ❌ DON'T: Use any or implicit types
const ProductCard = ({ product, onPress }: any) => { ... }
```

### 4.2 Component Structure

```typescript
// ✅ DO: Functional components with clear separation
export function ProductCard({ product, onPress }: ProductCardProps) {
  // Hooks first
  const { t } = useTranslation();
  
  // Derived state
  const discountedPrice = calculateDiscount(product);
  
  // Render
  return (
    <Card style={styles.card}>
      {/* Content */}
    </Card>
  );
}
```

### 4.3 Color Usage

Always reference the [Color Guidelines](./docs/projects/3-design/02.Color-Guidelines.md):

```typescript
import { Colors } from '@/constants/colors';

// ✅ DO: Use defined color tokens
backgroundColor: Colors.primary;        // #FF7B00
color: Colors.textPrimary;              // #333333

// ❌ DON'T: Hardcode hex values
backgroundColor: '#FF7B00';
```

### 4.4 File Naming

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `ProductCard.tsx` |
| **Screens** | PascalCase + Screen | `CheckoutScreen.tsx` |
| **Hooks** | camelCase + use | `useProducts.ts` |
| **Utils** | camelCase | `formatCurrency.ts` |
| **Types** | PascalCase | `product.types.ts` |

---

## 5. Architecture Patterns

### 5.1 Directory Structure

```
react-native-app/
├── src/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable components
│   │   ├── common/       # Base components (Button, Card)
│   │   ├── product/      # Product-specific
│   │   └── order/        # Order-specific
│   ├── hooks/            # Custom hooks
│   ├── services/         # API clients
│   ├── store/            # Zustand stores
│   ├── utils/            # Helper functions
│   └── constants/        # Colors, config
```

### 5.2 State Management

| Type | Tool | Usage |
|------|------|-------|
| **Server State** | TanStack Query | API data, caching, sync |
| **Client State** | Zustand | UI state, filters, auth |
| **Form State** | React Hook Form | Forms with Zod validation |

### 5.3 API Patterns

```typescript
// ✅ DO: Use TanStack Query for server state
const { data: products, isLoading } = useQuery({
  queryKey: ['products', { category }],
  queryFn: () => api.getProducts({ category }),
});

// ✅ DO: Use mutations for writes
const createOrder = useMutation({
  mutationFn: (data) => api.createOrder(data),
  onSuccess: () => queryClient.invalidateQueries(['orders']),
});
```

---

## 6. Database & Schema

### 6.1 Prisma Reference

All database models defined in [ITA §4](./docs/projects/2-technical/04.Implementation-Technical-Architecture.md#4-database-schema-prisma):

**Key Models:**
- `User`, `Customer`, `Provider`
- `Product`, `Order`, `OrderItem`
- `Review`, `DeliveryArea`, `Notification`

### 6.2 Query Patterns

```typescript
// ✅ DO: Use Prisma's type-safe queries
const product = await prisma.product.findUnique({
  where: { id: productId },
  include: {
    provider: true,
    durationOptions: { where: { isActive: true } },
    reviews: { orderBy: { createdAt: 'desc' }, take: 5 },
  },
});
```

---

## 7. Business Rules Reference

### 7.1 Monetization (from [SCOPE.md](./docs/projects/1-business/SCOPE.md))

| Tier | Commission | Platform Fee | Subscription |
|------|------------|--------------|--------------|
| **Free** | 6% | Rp5,000 (customer) | Gratis |
| **Premium** | 3% | Rp5,000 (customer) | Rp499.000/bulan |

### 7.2 Key Policies (from [PRD.md](./docs/projects/1-business/PRD.md))

- **Cutoff:** H-1, 20:00 WIB (default) for subscription changes
- **Payment:** One-time per package (no auto-renewal)
- **Shipping:** Final at checkout, set by provider in Catering Settings
- **Reviews:** Transaction-verified only, 48h edit window

---

## 8. Testing Standards

### 8.1 Test Coverage Requirements

| Test Type | Coverage Target | Tools |
|-----------|-----------------|-------|
| **Unit** | ≥80% components | Jest |
| **Integration** | All API calls | MSW, Supabase Local |
| **E2E** | Critical journeys | Detox |

### 8.2 Test Structure

```typescript
// ✅ DO: Describe blocks with clear scenarios
describe('ProductCard', () => {
  describe('when product has discount', () => {
    it('displays savings badge', () => { ... });
    it('shows crossed original price', () => { ... });
  });
});
```

---

## 9. Security & Compliance

### 9.1 Authentication

- **Provider:** Supabase Auth (Email, OAuth, Phone)
- **Session:** Persisted securely via React Native secure storage
- **RLS:** Row Level Security on all database tables

### 9.2 Data Protection

- **PII:** Encrypt personal data (phone, address)
- **Payment:** PCI DSS compliant via Midtrans/Xendit
- **Compliance:** UU PDP (Indonesia data protection)

---

## 10. Performance Guidelines

### 10.1 Mobile Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| **TTI** | <3s | React Native Performance |
| **FPS** | ≥55 | Reanimated profiler |
| **Bundle** | <50MB | App size analyzer |

### 10.2 Optimization Techniques

- **Lazy loading:** Load screens on demand
- **Image optimization:** Use cached, resized images
- **Query caching:** TanStack Query with appropriate staleTime
- **Memoization:** useMemo/useCallback for expensive calculations

---

## 11. Documentation Standards

### 11.1 Code Comments

```typescript
// ✅ DO: Comment WHY, not WHAT
// Using debounced search to avoid excessive API calls
const debouncedSearch = useMemo(
  () => debounce((query) => searchProducts(query), 300),
  []
);

// ❌ DON'T: State the obvious
// Set loading to true
setLoading(true);
```

### 11.2 API Documentation

All API endpoints documented in [ITA §5](./docs/projects/2-technical/04.Implementation-Technical-Architecture.md#5-api-specification) (if exists) or via OpenAPI spec.

---

## 12. Decision-Making Framework

When making implementation decisions, follow this hierarchy:

1. **Check BRD/PRD** → Business requirements first
2. **Check ITA** → Technical architecture constraints
3. **Check Color Guidelines** → Design system compliance
4. **Check existing code** → Follow established patterns
5. **Ask user** → If unclear or multiple valid approaches

---

## 13. Common Tasks Reference

### 13.1 Adding a New Screen

1. Create screen in `src/screens/`
2. Add route to navigation config
3. Create associated hooks/services
4. Write tests
5. Update [Backlog](./docs/projects/4-planning/05.Product-Backlog.md) status

### 13.2 Adding a New Component

1. Check if reusable (place in `components/common/`)
2. Define TypeScript props interface
3. Follow Color Guidelines
4. Add Storybook story (if applicable)
5. Write unit tests

### 13.3 Adding API Endpoint

1. Define Prisma schema (if DB change)
2. Create Edge Function or API route
3. Add TypeScript types
4. Create client-side hook with TanStack Query
5. Test with MSW mocks

---

## 14. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1.0 | 2026-04-18 | Organized docs into sub-folders |
| 1.0.0 | 2026-04-02 | Initial creation with DRY/KISS principles |

---

**Maintained by:** Alacater Engineering Team  
**Next Review:** 2026-05-01
