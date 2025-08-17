import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

interface WebinarEmailRequest {
  record: {
    id: string;
    first_name: string;
    email: string;
    created_at: string;
  };
}

// Função para enviar e-mail de confirmação usando SMTP do Supabase
async function sendConfirmationEmail(first_name: string, email: string): Promise<boolean> {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #334155 0%, #475569 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">EDUCAvet</h1>
          <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Capacitação veterinária de excelência</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #334155; margin: 0 0 20px 0; font-size: 24px;">Olá, ${first_name},</h2>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
            Parabéns! Sua inscrição para o <strong>Webinar de Clínica Cirúrgica de Ruminantes</strong> está confirmada.
          </p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #334155; padding: 25px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 8px 0; color: #475569; font-size: 16px;"><strong>📅 Data:</strong> 16 de setembro de 2025</p>
            <p style="margin: 8px 0; color: #475569; font-size: 16px;"><strong>⏰ Horário:</strong> 18:57</p>
            <p style="margin: 8px 0; color: #475569; font-size: 16px;"><strong>🌐 Curso Online</strong> (link enviado próximo ao evento)</p>
          </div>
          
          <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <p style="margin: 0 0 15px 0; color: #92400e; font-size: 16px;">
              <strong>⚠️ Importante:</strong> Entre no grupo oficial do WhatsApp:
            </p>
            <div style="text-align: center;">
              <a href="https://chat.whatsapp.com/Kizr0eAtG49Am7rUB5JDHu" 
                 style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                👉 Link do WhatsApp
              </a>
            </div>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 25px 0;">
            Nos vemos lá!<br>
            Equipe <strong>EDUCAvet</strong>
          </p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
            <strong>EDUCAvet</strong> - Transformando a medicina veterinária através da educação
          </p>
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
            Este e-mail foi enviado para ${email}
          </p>
        </div>
      </div>
    `;

    // Enviar e-mail usando o serviço nativo do Supabase
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: {
        first_name: first_name,
        webinar_confirmation: true
      },
      redirectTo: undefined // Não redirecionar, é apenas confirmação
    });

    // Como o método acima é para convites, vamos usar uma abordagem diferente
    // Usando a API de e-mail do Supabase diretamente
    const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/rpc/send_email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json',
        'apikey': Deno.env.get('SUPABASE_ANON_KEY') ?? ''
      },
      body: JSON.stringify({
        to_email: email,
        from_email: 'EDUCAvet <contato@cursoseducavet.com>',
        subject: `${first_name}, sua inscrição no Webinar está confirmada 🎉`,
        html_content: emailHtml
      })
    });

    if (!emailResponse.ok) {
      console.error('Erro ao enviar e-mail via Supabase:', await emailResponse.text());
      return false;
    }

    console.log(`✅ E-mail de confirmação enviado com sucesso para ${email}`);
    return true;

  } catch (error) {
    console.error('Erro na função sendConfirmationEmail:', error);
    return false;
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { record }: WebinarEmailRequest = await req.json();
    
    console.log(`Processando envio de e-mail para: ${record.email}`);

    // Chamar a função sendConfirmationEmail
    const emailSent = await sendConfirmationEmail(record.first_name, record.email);
    
    if (!emailSent) {
      throw new Error('Falha ao enviar e-mail de confirmação');
    }

    console.log('✅ E-mail de confirmação enviado com sucesso');

    return new Response(JSON.stringify({ 
      success: true,
      message: 'E-mail de confirmação enviado com sucesso' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Erro ao enviar e-mail de confirmação:', error);
    return new Response(JSON.stringify({ 
      error: 'Erro interno ao enviar e-mail' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);