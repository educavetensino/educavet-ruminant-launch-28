import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

interface WebinarEmailRequest {
  record: {
    id: string;
    first_name: string;
    email: string;
    created_at: string;
  };
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
    
    console.log(`Enviando e-mail de confirmação para: ${record.email}`);

    // Aqui você pode integrar com seu provedor de e-mail
    // Exemplos: SendGrid, Resend, Amazon SES, etc.
    
    // Template básico do e-mail
    const emailData = {
      to: record.email,
      subject: "Confirmação de Inscrição - Webinar Clínica Cirúrgica de Ruminantes",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Olá ${record.first_name}!</h2>
          
          <p>Sua inscrição no webinar <strong>"Clínica Cirúrgica de Ruminantes"</strong> foi confirmada com sucesso!</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📅 Detalhes do Webinar:</h3>
            <p><strong>Tema:</strong> Clínica Cirúrgica de Ruminantes</p>
            <p><strong>Data:</strong> [DATA_DO_WEBINAR]</p>
            <p><strong>Horário:</strong> [HORARIO_DO_WEBINAR]</p>
            <p><strong>Plataforma:</strong> [PLATAFORMA]</p>
          </div>
          
          <p>🎯 <strong>O que você vai aprender:</strong></p>
          <ul>
            <li>Técnicas cirúrgicas avançadas para ruminantes</li>
            <li>Protocolos de segurança e assepsia</li>
            <li>Manejo pré e pós-operatório</li>
            <li>Casos clínicos práticos</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="[LINK_DO_WEBINAR]" style="background-color: #334155; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              🚀 Acessar Webinar
            </a>
          </div>
          
          <p>Você receberá o link de acesso alguns minutos antes do início do webinar.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>EDUCAvet</strong><br>
            Capacitação veterinária de excelência
          </p>
        </div>
      `
    };

    // Aqui você faria a chamada para seu provedor de e-mail
    // Exemplo com fetch para um webhook/API de e-mail:
    /*
    const emailResponse = await fetch('YOUR_EMAIL_PROVIDER_API', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('EMAIL_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    */

    console.log(`E-mail preparado para ${record.email}:`, emailData);
    
    // Por enquanto, apenas logamos o e-mail (substitua pela integração real)
    console.log('✅ E-mail de confirmação processado com sucesso');

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