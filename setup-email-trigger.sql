-- Script para configurar trigger automático de envio de e-mail
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Criar função que dispara o envio de e-mail automaticamente
CREATE OR REPLACE FUNCTION public.trigger_webinar_email()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Chama a edge function para envio de e-mail
  PERFORM
    net.http_post(
      url := format('%s/functions/v1/send-webinar-email', current_setting('app.supabase_url')),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', format('Bearer %s', current_setting('app.supabase_service_role_key'))
      ),
      body := jsonb_build_object(
        'record', jsonb_build_object(
          'id', NEW.id,
          'first_name', NEW.first_name,
          'email', NEW.email,
          'created_at', NEW.created_at
        )
      )
    );
  
  RETURN NEW;
END;
$$;

-- 2. Criar trigger que dispara após INSERT na tabela webinar_registrations
DROP TRIGGER IF EXISTS webinar_email_trigger ON public.webinar_registrations;
CREATE TRIGGER webinar_email_trigger
  AFTER INSERT ON public.webinar_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_webinar_email();

-- 3. Comentário para documentação
COMMENT ON FUNCTION public.trigger_webinar_email() IS 'Trigger automático que envia e-mail de confirmação imediatamente após nova inscrição no webinar';

-- 4. Verificar se o trigger foi criado corretamente
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name,
  proname as function_name
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE tgname = 'webinar_email_trigger';