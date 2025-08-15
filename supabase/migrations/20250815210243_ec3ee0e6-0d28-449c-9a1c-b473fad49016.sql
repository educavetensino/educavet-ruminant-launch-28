-- Create table for webinar registrations
CREATE TABLE public.webinar_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insertions (for registration)
CREATE POLICY "Allow public registrations" 
ON public.webinar_registrations 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy to allow authenticated users to view their own registrations
CREATE POLICY "Users can view all registrations" 
ON public.webinar_registrations 
FOR SELECT 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_webinar_registrations_updated_at
BEFORE UPDATE ON public.webinar_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better performance on email lookups
CREATE INDEX idx_webinar_registrations_email ON public.webinar_registrations(email);
CREATE INDEX idx_webinar_registrations_created_at ON public.webinar_registrations(created_at);