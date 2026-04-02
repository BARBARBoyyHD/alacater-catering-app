# OpenSpec - Alacater Open Specification

**Project:** Alacater  
**Version:** 1.0.0  
**Last Updated:** 2026-04-02  
**Status:** Open Specification (Living Document)

---

## 1. Purpose

This document provides an open, modular specification for the Alacater platform. It serves as a single reference point for developers, stakeholders, and contributors, following DRY principles by referencing detailed documents instead of duplicating content.

---

## 2. Quick Start

### 2.1 What is Alacater?

Alacater is a marketplace platform connecting customers with catering service providers in Indonesia, starting with Bandung and JABODETABEK.

**Vision:** "Temukan Catering Favoritmu, Sekali Klik"

### 2.2 Core Value Proposition

| For Customers | For Providers | For Platform |
|---------------|---------------|--------------|
| Find catering by diet, location, price | Manage orders & menu digitally | Commission + subscription revenue |
| Transparent reviews & ratings | Automated payment processing | Platform fee per transaction |
| Flexible subscription management | Delivery area & fee control | Premium tier subscriptions |

### 2.3 Key Documents Map

```
┌─────────────────────────────────────────────────────────┐
│                    OpenSpec (This Doc)                   │
│              High-level overview & navigation            │
└─────────────────────────────────────────────────────────┘
              │              │              │
              ▼              ▼              ▼
    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
    │   BRD           │  │   PRD           │  │   ITA           │
    │   Business Req  │  │   Product Req   │  │   Tech Arch     │
    │   [§4 BRD]      │  │   [§6 PRD]      │  │   [§2 ITA]      │
    └─────────────────┘  └─────────────────┘  └─────────────────┘
              │              │              │
              ▼              ▼              ▼
    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
    │   SCOPE         │  │   Backlog       │  │   Colors        │
    │   Monetization  │  │   Tasks         │  │   Design System │
    │   [§6 BRD]      │  │   [§5 Backlog]  │  │   [Colors]      │
    └─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 3. Business Model

### 3.1 Revenue Streams

**Detailed in:** [BRD §6](./projects/01.BRD-alacater.md#6-monetization--revenue-model), [SCOPE.md](./projects/SCOPE.md)

| Stream | Free Tier | Premium Tier |
|--------|-----------|--------------|
| **Commission** | 6% per transaction | 3% per transaction |
| **Platform Fee** | Rp5,000 (customer pays) | Rp5,000 (customer pays) |
| **Subscription** | Gratis | Rp499.000/bulan |

### 3.2 Unit Economics (per Rp500.000 transaction)

| Metric | Free Provider | Premium Provider |
|--------|---------------|------------------|
| **Customer Pays** | Rp505.000 (food + fee) | Rp505.000 (food + fee) |
| **Platform Revenue** | Rp35.000 | Rp20.000 |
| **Provider Receives** | Rp470.000 | Rp485.000 |

### 3.3 Target Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| Providers onboarded | 10-20 | Month 3 |
| Active customers | 50 | Month 3 |
| Monthly transactions | 500+ | Month 4 |
| Monthly revenue | Rp25-35M | Month 4 |

---

## 4. User Personas

### 4.1 Customer (Individual)

**Goals:**
- Find catering matching diet preferences (vegan, keto, halal)
- Compare prices and reviews transparently
- Manage subscription flexibly (pause, change address H-1)

**Pain Points Solved:**
- No centralized platform with detailed filters
- Review manipulation on social media
- Manual payment via WhatsApp/transfer

**Reference:** [BRD §4.1](./projects/01.BRD-alacater.md#41-masalah-yang-dihadapi-customer), [PRD §2](./projects/PRD.md#2-persona-singkat)

### 4.2 Provider (Catering Partner)

**Goals:**
- Get new customers without heavy marketing
- Automate order & payment management
- Track financial performance

**Pain Points Solved:**
- Customer acquisition difficulty
- Manual payment verification
- No analytics for business decisions

**Reference:** [BRD §4.2](./projects/01.BRD-alacater.md#42-masalah-yang-dihadapi-mitra-catering), [PRD §2](./projects/PRD.md#2-persona-singkat)

### 4.3 Admin (Platform)

**Goals:**
- Verify and onboard quality providers
- Monitor transactions for fraud
- Mediate disputes

**Reference:** [PRD §2](./projects/PRD.md#2-persona-singkat), [BRD §10.3](./projects/01.BRD-alacater.md#103-untuk-admin-platform)

---

## 5. Core Features (MVP)

### 5.1 Customer Features

| Feature | Description | Status | Reference |
|---------|-------------|--------|-----------|
| **Search & Filter** | Location, price, diet, rating | P0 | [PRD §3](./projects/PRD.md#3-user-stories-inti) |
| **Product Detail** | Menu, pricing, reviews | P0 | [Backlog §6](./projects/05.Product-Backlog.md#epic-6-product-detail--ordering-weeks-11-14) |
| **Checkout** | Cart, shipping, payment | P0 | [PRD §6.1](./projects/PRD.md#61-checkout-total-transparan) |
| **Order Tracking** | Status timeline, delivery schedule | P0 | [Backlog §8](./projects/05.Product-Backlog.md#epic-8-order-management--tracking-weeks-15-18) |
| **Reviews** | Transaction-verified ratings | P0 | [PRD §6.12](./projects/PRD.md#612-rating-paket--menu) |
| **Subscription Management** | Pause, skip, change address (H-1) | P0 | [PRD §5](./projects/PRD.md#5-aturan--kebijakan-kunci) |

### 5.2 Provider Features

| Feature | Description | Status | Reference |
|---------|-------------|--------|-----------|
| **Dashboard** | Orders, revenue, analytics | P0 | [Backlog §3](./projects/05.Product-Backlog.md#epic-3-provider-onboarding--dashboard-weeks-5-8) |
| **Menu Management** | CRUD products, pricing, duration | P0 | [Backlog §4](./projects/05.Product-Backlog.md#epic-4-menu--product-management-weeks-7-10) |
| **Delivery Settings** | Area, fees, calendar, holidays | P0 | [PRD §6.17](./projects/PRD.md#617-konfigurasi-ongkir-di-catering-settings) |
| **Order Management** | Accept/reject, status updates | P0 | [Backlog §8](./projects/05.Product-Backlog.md#epic-8-order-management--tracking-weeks-15-18) |
| **Financial Reports** | Revenue, commission, payout | P0 | [Backlog §10](./projects/05.Product-Backlog.md#epic-10-provider-analytics--finance-weeks-18-20) |

### 5.3 Admin Features

| Feature | Description | Status | Reference |
|---------|-------------|--------|-----------|
| **Provider Verification** | Approve/reject applications | P0 | [BRD §10.3](./projects/01.BRD-alacater.md#103-untuk-admin-platform) |
| **Transaction Monitoring** | View all transactions | P0 | [SCOPE.md](./projects/SCOPE.md) |
| **Dispute Mediation** | Facilitate vendor-led resolution | P0 | [PRD §13](./projects/PRD.md#13-sla-pengantaran-ringkas) |

---

## 6. Technical Architecture Overview

### 6.1 High-Level Stack

**Detailed in:** [ITA §2](./projects/04.Implementation-Technical-Architecture.md#2-technology-stack), [PEP §3](./projects/03.Project-Execution-Plan.md#3-technical-architecture)

```
┌──────────────────────────────────────────────────────────┐
│                   Client Applications                     │
├──────────────────────────────────────────────────────────┤
│  Mobile: React Native 0.76+ (Customer ordering)          │
│  Web: Next.js 15+ (Landing + Provider dashboard)         │
│  Language: TypeScript 5.7+                               │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│                   Backend Services                        │
├──────────────────────────────────────────────────────────┤
│  Database: Supabase PostgreSQL + Prisma ORM              │
│  Auth: Supabase Auth (Email, OAuth, Phone)               │
│  Storage: Supabase Storage (images, documents)           │
│  Realtime: Supabase Realtime (order updates)             │
│  Functions: Supabase Edge Functions (webhooks)           │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│                   Third-Party Services                    │
├──────────────────────────────────────────────────────────┤
│  Payment: Midtrans / Xendit                              │
│  Email: Resend / SendGrid                                │
│  Push: Firebase FCM                                      │
│  Maps: Google Maps API                                   │
│  Monitoring: Sentry + Vercel Analytics                   │
└──────────────────────────────────────────────────────────┘
```

### 6.2 Key Technologies

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend Mobile** | React Native | 0.76+ | Customer app |
| **Frontend Web** | Next.js | 15+ | Landing + Dashboard |
| **State Management** | TanStack Query + Zustand | 5.62+ / 5.0+ | Server + Client state |
| **Database** | PostgreSQL + Prisma | 15+ / 6.x | Data storage |
| **Auth** | Supabase Auth | Latest | User authentication |
| **Hosting** | Vercel | Latest | Deployment |
| **Package Manager** | pnpm | 9.x+ | Dependency management |

**Reference:** [ITA §2](./projects/04.Implementation-Technical-Architecture.md#2-technology-stack)

### 6.3 Repository Structure

```
alacater/
├── next-app/              # Next.js web application
├── react-native-app/      # React Native mobile app
├── database/              # Prisma schema & migrations
├── supabase/              # Edge Functions & config
├── docs/                  # Documentation (this folder)
└── .github/               # CI/CD workflows
```

**Detailed structure:** [ITA §3.2](./projects/04.Implementation-Technical-Architecture.md#32-repository-structure)

---

## 7. Key Business Rules

### 7.1 Ordering & Payment

| Rule | Description | Reference |
|------|-------------|-----------|
| **Payment Model** | One-time per package (no auto-renewal) | [PRD §5](./projects/PRD.md#5-aturan--kebijakan-kunci) |
| **Package Duration** | Defined by provider (e.g., 5/10/15 days) | [PRD §4a](./projects/PRD.md#4a-glossary) |
| **Cutoff Policy** | H-1, 20:00 WIB (default, guardrail 18:00-22:00) | [PRD §5](./projects/PRD.md#5-aturan--kebijakan-kunci) |
| **Shipping** | Final at checkout, set by provider | [PRD §6.17](./projects/PRD.md#617-konfigurasi-ongkir-di-catering-settings) |
| **Platform Fee** | Rp5,000 per transaction (tax-inclusive) | [SCOPE.md](./projects/SCOPE.md) |

### 7.2 Reviews & Ratings

| Rule | Description | Reference |
|------|-------------|-----------|
| **Verification** | Transaction-verified only | [PRD §6.12](./projects/PRD.md#612-rating-paket--menu) |
| **Edit Window** | 48 hours post-delivery | [BRD §10.2](./projects/01.BRD-alacater.md#102-untuk-mitra-catering) |
| **Rating Scope** | Package + Menu items only (no courier) | [PRD §6.12](./projects/PRD.md#612-rating-paket--menu) |

### 7.3 Delivery & Logistics

| Rule | Description | Reference |
|------|-------------|-----------|
| **Delivery Model** | Self-delivery by provider | [SCOPE.md](./projects/SCOPE.md) |
| **Delivery Windows** | Optional (e.g., 10-12, 12-14) | [PRD §4a](./projects/PRD.md#4a-glossary) |
| **Late Tolerance** | 30 minutes (no platform penalty) | [PRD §13](./projects/PRD.md#13-sla-pengantaran-ringkas) |

---

## 8. Design System

### 8.1 Brand Colors

**Detailed in:** [Color Guidelines](./projects/02.Color-Guidelines.md)

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Orange** | `#FF7B00` | CTAs, active states, highlights |
| **Success Green** | `#1B5E3A` | Savings badges, delivered status |
| **Error Red** | `#FF3B30` | Error states, notification badges |
| **Text Primary** | `#333333` | Headings, important text |
| **Background** | `#F5F5F5` | App background |

### 8.2 Component Library

All UI components follow the Color Guidelines:

- **Buttons:** Primary (`#FF7B00`), Secondary (white with orange border)
- **Cards:** White background, optional light orange for selected
- **Inputs:** Gray border (`#CCCCCC`), orange on focus
- **Status Badges:** Color-coded (blue=shipping, green=delivered, red=cancelled)

**Reference:** [Color Guidelines](./projects/02.Color-Guidelines.md)

---

## 9. Development Roadmap

### 9.1 Phase Timeline

**Detailed in:** [PEP §4](./projects/03.Project-Execution-Plan.md#4-project-timeline--milestones), [Backlog](./projects/05.Product-Backlog.md)

| Phase | Weeks | Focus | Milestone |
|-------|-------|-------|-----------|
| **Phase 0** | 1-2 | Discovery & Planning | Design sign-off |
| **Phase 1** | 3-6 | Foundation & Core API | APIs functional |
| **Phase 2** | 7-12 | Customer Experience | Mobile app beta-ready |
| **Phase 3** | 13-16 | Provider Dashboard | Dashboard production-ready |
| **Phase 4** | 17-18 | Integration & Testing | All tests passing |
| **Phase 5** | 19-20 | Soft Launch | 10+ providers, 20+ transactions |
| **Phase 6** | 21-24 | Iteration & Scale | Public launch ready |

### 9.2 Current Status

| Epic | Progress | Next Sprint |
|------|----------|-------------|
| Foundation & Setup | Not started | Week 1 |
| Authentication | Not started | Week 3 |
| Provider Onboarding | Not started | Week 5 |
| Menu Management | Not started | Week 7 |
| Customer Discovery | Not started | Week 9 |

**Live backlog:** [Product Backlog](./projects/05.Product-Backlog.md)

---

## 10. API Endpoints (Summary)

### 10.1 Core Resources

| Resource | Methods | Description |
|----------|---------|-------------|
| `/auth` | POST | Authentication (signup, login, OAuth) |
| `/users` | GET, PUT, DELETE | User profile management |
| `/providers` | GET, POST, PUT, DELETE | Provider CRUD |
| `/products` | GET, POST, PUT, DELETE | Product CRUD |
| `/orders` | GET, POST, PUT | Order creation & tracking |
| `/reviews` | GET, POST, PUT, DELETE | Review management |
| `/delivery-areas` | GET, POST, PUT, DELETE | Provider delivery zones |

**Full API spec:** [ITA §5](./projects/04.Implementation-Technical-Architecture.md#5-api-specification) (if exists) or separate OpenAPI document

### 10.2 Webhooks

| Webhook | Source | Purpose |
|---------|--------|---------|
| `/webhooks/payment` | Midtrans/Xendit | Payment status updates |
| `/webhooks/shipping` | (Future) | Delivery status updates |

---

## 11. Database Schema (Summary)

### 11.1 Core Models

**Full schema:** [ITA §4](./projects/04.Implementation-Technical-Architecture.md#4-database-schema-prisma)

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `User` | Authentication & profiles | email, phone, role |
| `Customer` | Customer preferences | dietaryPreferences, allergies, loyaltyPoints |
| `Provider` | Catering business info | businessName, isVerified, subscriptionTier |
| `Product` | Menu items | name, category, basePrice, dietTags |
| `Order` | Transaction records | status, totalAmount, deliverySchedule |
| `Review` | Ratings & feedback | rating, comment, images |
| `DeliveryArea` | Provider coverage | city, district, fee |

### 11.2 Key Relationships

```
User ──┬── Customer ── Orders ── OrderItems ── Product ── Provider
       └── Provider ──┘              │
                                     └── Reviews
```

---

## 12. Security & Compliance

### 12.1 Security Measures

| Area | Implementation | Reference |
|------|----------------|-----------|
| **Authentication** | Supabase Auth (JWT, RLS) | [ITA §2.2](./projects/04.Implementation-Technical-Architecture.md#22-backend--infrastructure) |
| **Authorization** | Row Level Security on all tables | [ITA §4](./projects/04.Implementation-Technical-Architecture.md#4-database-schema-prisma) |
| **Data Encryption** | TLS in transit, encryption at rest | [BRD §9](./projects/01.BRD-alacater.md#9-security--compliance) |
| **Payment Security** | PCI DSS via Midtrans/Xendit | [BRD §9](./projects/01.BRD-alacater.md#9-security--compliance) |

### 12.2 Compliance

| Regulation | Status | Reference |
|------------|--------|-----------|
| **UU PDP** (Indonesia Data Protection) | Compliant | [BRD §9](./projects/01.BRD-alacater.md#9-security--compliance) |
| **PCI DSS** | Compliant (via gateway) | [BRD §9](./projects/01.BRD-alacater.md#9-security--compliance) |
| **Food Safety** | Halal certification required | [BRD §9](./projects/01.BRD-alacater.md#9-security--compliance) |

---

## 13. Monitoring & Analytics

### 13.1 KPIs

| Category | Metric | Target |
|----------|--------|--------|
| **Business** | Monthly transactions | 500+ |
| **Business** | Provider retention | ≥80% |
| **Business** | Customer D30 repurchase | ≥30% |
| **Technical** | API latency (p95) | <500ms |
| **Technical** | Page load time | <2s |
| **Technical** | Uptime | ≥99.5% |

**Reference:** [PRD §11](./projects/PRD.md#11-monitoring-kpi), [PEP §6.2](./projects/03.Project-Execution-Plan.md#62-revenue-projection-post-launch)

### 13.2 Tools

| Tool | Purpose |
|------|---------|
| **Vercel Analytics** | Performance, web vitals |
| **Sentry** | Error tracking |
| **PostHog** (optional) | Product analytics |

---

## 14. Contributing

### 14.1 For Developers

1. **Read the docs:** Start with this OpenSpec, then dive into detailed documents
2. **Follow conventions:** See [QWEN.md](./QWEN.md) for coding standards
3. **Check the backlog:** [Product Backlog](./projects/05.Product-Backlog.md) has all tasks
4. **Test your changes:** Follow testing standards in [QWEN.md §8](./QWEN.md#8-testing-standards)

### 14.2 For Stakeholders

1. **Business requirements:** [BRD](./projects/01.BRD-alacater.md)
2. **Product features:** [PRD](./projects/PRD.md)
3. **Scope & monetization:** [SCOPE.md](./projects/SCOPE.md)
4. **Timeline:** [PEP](./projects/03.Project-Execution-Plan.md)

### 14.3 Document Maintenance

- **Update this doc** when high-level changes occur
- **Link to details** instead of duplicating content
- **Version control:** Update version number and date on changes

---

## 15. Glossary

| Term | Definition |
|------|------------|
| **H-1** | Cutoff day (1 day before delivery), default 20:00 WIB |
| **Provider** | Catering partner selling on platform |
| **Customer** | Individual ordering catering |
| **Package Duration** | Number of days in a subscription package (e.g., 5/10/15 days) |
| **Delivery Window** | Time slot for delivery (e.g., 10-12, 12-14) |
| **RLS** | Row Level Security (Supabase/PostgreSQL) |
| **Edge Function** | Serverless function (Supabase/Deno) |

**Reference:** [PRD §4a](./projects/PRD.md#4a-glossary)

---

## 16. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-02 | Initial open specification with DRY/KISS principles |

---

**Maintained by:** Alacater Product & Engineering Team  
**License:** Internal Use Only  
**Next Review:** 2026-05-01
