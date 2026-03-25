
-- Add plant_name and leaf_type columns to detections
ALTER TABLE public.detections ADD COLUMN IF NOT EXISTS plant_name text;
ALTER TABLE public.detections ADD COLUMN IF NOT EXISTS leaf_type text;

-- Create a security definer function to get all detections for admin view
CREATE OR REPLACE FUNCTION public.get_all_detections()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  user_name text,
  user_email text,
  plant_name text,
  leaf_type text,
  disease_name text,
  confidence numeric,
  is_healthy boolean,
  image_url text,
  remedy text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    d.id,
    d.user_id,
    p.name as user_name,
    p.email as user_email,
    d.plant_name,
    d.leaf_type,
    d.disease_name,
    d.confidence,
    d.is_healthy,
    d.image_url,
    d.remedy,
    d.created_at
  FROM public.detections d
  LEFT JOIN public.profiles p ON d.user_id = p.id
  ORDER BY d.created_at DESC;
$$;
