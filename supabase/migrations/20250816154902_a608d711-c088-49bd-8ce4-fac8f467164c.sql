-- Remove public INSERT policy on webinar_registrations now that we have secure Edge Function
DROP POLICY IF EXISTS "Allow public registrations" ON public.webinar_registrations;

-- Add basic validation trigger for extra protection
CREATE OR REPLACE FUNCTION public.validate_webinar_registration()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Validate required fields
  IF NEW.first_name IS NULL OR trim(NEW.first_name) = '' THEN
    RAISE EXCEPTION 'Nome é obrigatório';
  END IF;
  
  IF NEW.email IS NULL OR trim(NEW.email) = '' THEN
    RAISE EXCEPTION 'E-mail é obrigatório';
  END IF;
  
  -- Basic email format validation
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Formato de e-mail inválido';
  END IF;
  
  -- Normalize email to lowercase
  NEW.email = lower(trim(NEW.email));
  
  -- Trim other fields
  NEW.first_name = trim(NEW.first_name);
  NEW.phone = CASE WHEN NEW.phone IS NOT NULL THEN trim(NEW.phone) ELSE NULL END;
  NEW.city = CASE WHEN NEW.city IS NOT NULL THEN trim(NEW.city) ELSE NULL END;
  NEW.state = CASE WHEN NEW.state IS NOT NULL THEN trim(NEW.state) ELSE NULL END;
  
  RETURN NEW;
END;
$$;

-- Create trigger for validation
CREATE TRIGGER validate_webinar_registration_trigger
  BEFORE INSERT OR UPDATE ON public.webinar_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_webinar_registration();