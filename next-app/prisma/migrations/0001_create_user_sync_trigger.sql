-- Migration for creating a trigger to sync Supabase Auth users to the public.User table

-- First, create the function that will be called by the trigger
CREATE OR REPLACE FUNCTION public.sync_auth_user_to_app_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the user already exists in the public.User table
  IF EXISTS (SELECT 1 FROM public.User WHERE id = NEW.id) THEN
    -- If user exists, update it (e.g., if role or business name changed in metadata)
    UPDATE public.User
    SET
      email = NEW.email,
      emailVerified = NEW.email_confirmed_at,
      name = COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), -- Use name from metadata or email
      business_name = NEW.raw_user_meta_data->>'businessName',
      role = CASE
               WHEN NEW.raw_user_meta_data->>'role' = 'catering_owner' THEN 'PROVIDER'
               -- Add other role mappings here if needed
               ELSE 'CUSTOMER' -- Default role if not specified or unknown
             END,
      updatedAt = now()
    WHERE id = NEW.id;
  ELSE
    -- If user does not exist, insert a new record
    INSERT INTO public.User (id, email, emailVerified, name, business_name, role, passwordHash, createdAt, updatedAt)
    VALUES (
      NEW.id, -- Supabase Auth user ID
      NEW.email,
      NEW.email_confirmed_at,
      COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), -- Use name from metadata or email
      NEW.raw_user_meta_data->>'businessName',
      CASE
        WHEN NEW.raw_user_meta_data->>'role' = 'catering_owner' THEN 'PROVIDER'
        -- Add other role mappings here if needed
        ELSE 'CUSTOMER' -- Default role if not specified or unknown
      END,
      NEW.encrypted_password, -- Store encrypted password from auth
      now(),
      now()
    );
  END IF;

  -- If the role is 'catering_owner', also insert/update the Provider table
  IF NEW.raw_user_meta_data->>'role' = 'catering_owner' THEN
    IF EXISTS (SELECT 1 FROM public.Provider WHERE userId = NEW.id) THEN
      -- Update existing provider record if user metadata changes
      UPDATE public.Provider
      SET
        businessName = NEW.raw_user_meta_data->>'businessName', -- Use businessName from metadata
        isVerified = false, -- Assuming new providers are not verified by default
        subscriptionTier = 'FREE', -- Default subscription
        isActive = true,
        updatedAt = now()
      WHERE userId = NEW.id;
    ELSE
      -- Insert new provider record
      INSERT INTO public.Provider (userId, businessName, slug, isVerified, subscriptionTier, isActive, createdAt, updatedAt)
      VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'businessName',
        -- Generate a slug from business name (simple example, needs more robust logic)
        -- For now, let's use a placeholder or rely on user to set it later via profile
        LOWER(REPLACE(NEW.raw_user_meta_data->>'businessName', ' ', '-')),
        false, -- Default to not verified
        'FREE', -- Default subscription tier
        true,
        now(),
        now()
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger on the auth.users table
-- This trigger will fire after a new user is inserted or an existing user is updated
-- We are specifically interested in new user creations for initial sync
CREATE TRIGGER sync_auth_user_trigger
AFTER INSERT OR UPDATE ON auth.users
FOR EACH ROW
WHEN (pg_trigger_depth() = 0) -- Ensure it only runs once per transaction
EXECUTE FUNCTION public.sync_auth_user_to_app_user();

-- Note: This migration assumes 'public.User' and 'public.Provider' tables already exist
-- with the schema defined in prisma/schema.prisma.
-- It also assumes 'auth.users' table has 'email', 'email_confirmed_at', 'encrypted_password',
-- 'raw_user_meta_data' columns available.
-- The 'slug' generation for Provider is basic and might need a more robust approach
-- (e.g., unique slug generation or user-driven naming).
