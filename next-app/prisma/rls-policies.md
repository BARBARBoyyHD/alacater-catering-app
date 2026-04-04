# Supabase RLS Policies - Full Access for All Tables

Run these SQL statements in your Supabase SQL Editor to enable Row Level Security and create full access policies for authenticated users on all tables.

---

## 1. User

```sql
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "User" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 2. Customer

```sql
ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "Customer" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 3. Provider

```sql
ALTER TABLE "Provider" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "Provider" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 4. Product

```sql
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "Product" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 5. DurationOption

```sql
ALTER TABLE "DurationOption" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "DurationOption" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 6. MealPlanOption

```sql
ALTER TABLE "MealPlanOption" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "MealPlanOption" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 7. AdditionalMenu

```sql
ALTER TABLE "AdditionalMenu" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "AdditionalMenu" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 8. Order

```sql
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "Order" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 9. OrderItem

```sql
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "OrderItem" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 10. Review

```sql
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "Review" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 11. DeliveryArea

```sql
ALTER TABLE "DeliveryArea" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "DeliveryArea" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 12. OperatingHours

```sql
ALTER TABLE "OperatingHours" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "OperatingHours" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 13. ProviderHoliday

```sql
ALTER TABLE "ProviderHoliday" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "ProviderHoliday" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 14. Notification

```sql
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access" 
ON "Notification" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

---

## Quick: Run All at Once

Copy and paste the entire block below into your Supabase SQL Editor:

```sql
-- Enable RLS and create full access policies for all tables

-- 1. User
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "User" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Customer
ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "Customer" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Provider
ALTER TABLE "Provider" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "Provider" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Product
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "Product" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. DurationOption
ALTER TABLE "DurationOption" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "DurationOption" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. MealPlanOption
ALTER TABLE "MealPlanOption" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "MealPlanOption" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. AdditionalMenu
ALTER TABLE "AdditionalMenu" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "AdditionalMenu" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Order
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "Order" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 9. OrderItem
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "OrderItem" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 10. Review
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "Review" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 11. DeliveryArea
ALTER TABLE "DeliveryArea" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "DeliveryArea" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 12. OperatingHours
ALTER TABLE "OperatingHours" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "OperatingHours" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 13. ProviderHoliday
ALTER TABLE "ProviderHoliday" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "ProviderHoliday" FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 14. Notification
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access" ON "Notification" FOR ALL TO authenticated USING (true) WITH CHECK (true);
```
