import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
const schema = yup.object({
  name: yup.string().required("Informe seu nome"),
  email: yup.string().email("E-mail inválido").required("Informe seu e-mail"),
  phone: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  consent: yup.boolean().oneOf([true], "Necessário aceitar a política de privacidade"),
  // Honeypot – deve permanecer vazio
  company: yup.string().max(0, "")
});
export type LeadInput = yup.InferType<typeof schema>;
interface VideoSignupProps {
  debug?: boolean;
}
const VideoSignup = ({
  debug = true
}: VideoSignupProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = useForm<LeadInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      consent: false,
      company: ""
    }
  });

  // Watch required fields to enable/disable submit button
  const watchedFields = watch(['name', 'email', 'consent']);
  const isFormValid = watchedFields[0] && watchedFields[1] && watchedFields[2];

  const onSubmit = async (data: LeadInput) => {
    if (debug) console.log('[HeroForm] submit', {
      ...data,
      phone: data.phone ? '(hidden)' : ''
    });
    
    // Honeypot check on client side (backup)
    if (data.company) {
      if (debug) console.warn('[HeroForm] honeypot triggered');
      return;
    }
    
    try {
      setLoading(true);
      
      // Call secure Edge Function
      const { data: result, error } = await supabase.functions.invoke('register-webinar', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          city: data.city,
          state: data.state,
          consent: data.consent,
          company: data.company, // honeypot
        }
      });

      if (error) {
        console.error('[HeroForm] Edge Function error:', error);
        toast({
          title: 'Erro ao enviar',
          description: 'Tente novamente em instantes.'
        });
        return;
      }

      // Check for application-level errors
      if (result?.error) {
        toast({
          title: 'Erro',
          description: result.error
        });
        return;
      }

      toast({
        title: 'Inscrição recebida',
        description: 'Confira seu e-mail para confirmação.'
      });
      setOpen(true);
      
    } catch (e) {
      console.error('[HeroForm] error', e);
      toast({
        title: 'Erro ao enviar',
        description: 'Tente novamente em instantes.'
      });
    } finally {
      setLoading(false);
    }
  };
  return <section id="inscricao" className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div className="w-full">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-secondary">
            <iframe title="Apresentação EDUCAvet" src="https://www.youtube.com/embed/pa4Qv4oN_gw?rel=0" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-border bg-card p-6 shadow">
          <h2 className="text-2xl font-semibold">Inscreva-se gratuitamente</h2>
          <p className="mt-1 text-sm text-muted-foreground">Vagas limitadas. Receba o link de acesso por e-mail.</p>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="name" className="text-sm">Nome completo (obrigatório)</label>
              <Input id="name" placeholder="Seu nome" aria-invalid={!!errors.name} {...register('name')} />
              {errors.name && <p role="alert" className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-sm">E-mail</label>
              <Input id="email" type="email" placeholder="voce@exemplo.com" aria-invalid={!!errors.email} {...register('email')} />
              {errors.email && <p role="alert" className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="text-sm">Telefone</label>
              <Input id="phone" placeholder="(00) 00000-0000" {...register('phone')} />
            </div>
            <div>
              <label htmlFor="city" className="text-sm">Cidade (obrigatório)</label>
              <Input id="city" placeholder="São Paulo" {...register('city')} />
            </div>
            <div>
              <label htmlFor="state" className="text-sm">Estado (obrigatório)</label>
              <Input id="state" placeholder="SP" {...register('state')} />
            </div>
            {/* Honeypot */}
            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register('company')} />
            <div className="flex items-start gap-3">
              <Controller
                name="consent"
                control={control}
                render={({ field }) => (
                  <Checkbox 
                    id="consent" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={!!errors.consent}
                  />
                )}
              />
              <label htmlFor="consent" className="text-sm">
                Concordo com a <a className="underline story-link" href="#politica">Política de Privacidade</a>
              </label>
            </div>
            {errors.consent && <p role="alert" className="-mt-2 text-xs text-destructive">{errors.consent.message}</p>}
          </div>

          <Button type="submit" disabled={loading || !isFormValid} aria-busy={loading} className="mt-6 w-full bg-slate-700 text-white hover:bg-slate-600 text-base disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Enviando...' : 'Quero minha vaga gratuita'}
          </Button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">
              Não recebeu o e-mail? Entre em contato pelo WhatsApp
            </p>
            <a 
              href="https://wa.me/554792165717"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 py-2 rounded-md text-sm font-medium bg-[#25D366] text-white hover:bg-[#20B85A] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </form>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inscrição confirmada!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Em instantes você receberá um e-mail com o link de acesso. Verifique também o spam.
          </p>
        </DialogContent>
      </Dialog>
    </section>;
};
export default VideoSignup;