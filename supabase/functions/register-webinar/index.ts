import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebinarRegistrationRequest {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  consent: boolean;
  company?: string; // honeypot field
}

// Rate limiting: Simple in-memory store (consider Redis for production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // requests per window
const RATE_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const clientData = requestCounts.get(clientIP);
  
  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(clientIP, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (clientData.count >= RATE_LIMIT) {
    return false;
  }
  
  clientData.count++;
  return true;
}

function validateInput(data: WebinarRegistrationRequest): string[] {
  const errors: string[] = [];
  
  // Check honeypot
  if (data.company && data.company.length > 0) {
    errors.push('Invalid submission detected');
  }
  
  // Validate required fields
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Nome é obrigatório');
  }
  
  if (!data.email || data.email.trim().length === 0) {
    errors.push('E-mail é obrigatório');
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('E-mail inválido');
  }
  
  if (!data.consent) {
    errors.push('Consentimento é obrigatório');
  }
  
  // Validate field lengths (prevent abuse)
  if (data.name && data.name.length > 100) {
    errors.push('Nome muito longo');
  }
  
  if (data.email && data.email.length > 255) {
    errors.push('E-mail muito longo');
  }
  
  if (data.phone && data.phone.length > 20) {
    errors.push('Telefone muito longo');
  }
  
  return errors;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    
    console.log(`Registration attempt from IP: ${clientIP}`);
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(JSON.stringify({ 
        error: 'Muitas tentativas. Tente novamente em 15 minutos.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data: WebinarRegistrationRequest = await req.json();
    console.log(`Processing registration for email: ${data.email}`);
    
    // Validate input
    const validationErrors = validateInput(data);
    if (validationErrors.length > 0) {
      console.log(`Validation failed: ${validationErrors.join(', ')}`);
      return new Response(JSON.stringify({ 
        error: 'Dados inválidos',
        details: validationErrors 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase client with service role key for secure operations
    const supabaseServiceRole = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check for duplicate email
    const { data: existingRegistration, error: checkError } = await supabaseServiceRole
      .from('webinar_registrations')
      .select('email')
      .eq('email', data.email.toLowerCase().trim())
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Database check error:', checkError);
      return new Response(JSON.stringify({ 
        error: 'Erro interno. Tente novamente.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (existingRegistration) {
      console.log(`Duplicate email attempt: ${data.email}`);
      // Don't reveal if email exists, just return success
      return new Response(JSON.stringify({ 
        message: 'Inscrição realizada com sucesso!' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insert registration
    const { error: insertError } = await supabaseServiceRole
      .from('webinar_registrations')
      .insert({
        first_name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone?.trim() || null,
        city: data.city?.trim() || null,
        state: data.state?.trim() || null,
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(JSON.stringify({ 
        error: 'Erro ao salvar inscrição. Tente novamente.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Registration successful for: ${data.email}`);

    return new Response(JSON.stringify({ 
      message: 'Inscrição realizada com sucesso!' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Unexpected error in register-webinar function:', error);
    return new Response(JSON.stringify({ 
      error: 'Erro interno. Tente novamente.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);