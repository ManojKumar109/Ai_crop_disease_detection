-- Create profiles table for user information
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create detections table for disease detection history
CREATE TABLE public.detections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  image_url text NOT NULL,
  disease_name text NOT NULL,
  is_healthy boolean NOT NULL DEFAULT false,
  confidence numeric(5,2) NOT NULL,
  remedy text,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on detections
ALTER TABLE public.detections ENABLE ROW LEVEL SECURITY;

-- Detections policies
CREATE POLICY "Users can view their own detections"
  ON public.detections
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own detections"
  ON public.detections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own detections"
  ON public.detections
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', 'User'),
    new.email
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for leaf images
INSERT INTO storage.buckets (id, name, public)
VALUES ('leaf-images', 'leaf-images', true);

-- Storage policies for leaf images
CREATE POLICY "Users can upload their own leaf images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'leaf-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own leaf images"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'leaf-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anyone can view public leaf images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'leaf-images');

CREATE POLICY "Users can delete their own leaf images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'leaf-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );