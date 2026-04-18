## 1. Project Setup & State Management

- [x] 1.1 Install dependencies: `@react-native-community/datetimepicker`, `midtrans-client-react-native` (or Xendit equivalent) - **Note: Payment SDK skipped for mock data**
- [x] 1.2 Create `src/store/orderStore.ts` using Zustand to manage order draft state
- [x] 1.3 Update navigation config to include `ProductOrder`, `Checkout`, `Payment`, and `Confirmation` screens

## 2. Product Order Screen (Customization)

- [x] 2.1 Create `ProductOrderScreen.tsx` with basic layout
- [x] 2.2 Implement Quantity Selector component
- [x] 2.3 Integrate Date Picker for subscription start date
- [x] 2.4 Build Duration Selection list (5/10/20/60 days)
- [x] 2.5 Display savings badges for longer durations based on business rules
- [x] 2.6 Implement Meal Plan Selection (Lunch/Dinner/Both)
- [x] 2.7 Add Notes input field (optional)
- [x] 2.8 Update `ProductDetailScreen` "Pesan Sekarang" button to navigate to `ProductOrderScreen`

## 3. Checkout Screen (Summary)

- [x] 3.1 Create `CheckoutScreen.tsx`
- [x] 3.2 Implement Order Summary section showing all selected options and subtotal
- [x] 3.3 Implement Delivery Schedule configuration/display
- [x] 3.4 Create Payment Method selection UI

## 4. Payment Integration

- [x] 4.1 Setup Midtrans/Xendit client configuration - **Note: Mocked**
- [x] 4.2 Implement payment initiation logic on "Bayar" button click - **Note: Mocked**
- [x] 4.3 Handle payment callback/redirect within the app - **Note: Mocked**

## 5. Order Confirmation

- [x] 5.1 Create `OrderConfirmationScreen.tsx`
- [x] 5.2 Implement success and failure UI states
- [x] 5.3 Add navigation back to Home or Orders list after confirmation
