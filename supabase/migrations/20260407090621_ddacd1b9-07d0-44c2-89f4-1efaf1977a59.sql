
-- Add assigned_to and notes to enquiries
ALTER TABLE public.enquiries ADD COLUMN assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.enquiries ADD COLUMN notes text;

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name text,
  phone text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert profiles" ON public.profiles FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update profiles" ON public.profiles FOR UPDATE USING (is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update enquiries RLS to support assigned users
DROP POLICY IF EXISTS "Only admins can view enquiries" ON public.enquiries;
CREATE POLICY "Admins and assigned users can view enquiries" ON public.enquiries
  FOR SELECT USING (is_admin() OR assigned_to = auth.uid());

DROP POLICY IF EXISTS "Only admins can update enquiries" ON public.enquiries;
CREATE POLICY "Admins and assigned users can update enquiries" ON public.enquiries
  FOR UPDATE USING (is_admin() OR assigned_to = auth.uid())
  WITH CHECK (is_admin() OR assigned_to = auth.uid());
