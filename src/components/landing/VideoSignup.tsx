import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
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
    if (data.company) {
      if (debug) console.warn('[HeroForm] honeypot triggered');
      return;
    }
    try {
      setLoading(true);
      // Fase 1: mock de envio. Substituir por integração Supabase/Edge Function.
      await new Promise(r => setTimeout(r, 900));
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
              <label htmlFor="name" className="text-sm">Nome completo (opcional)</label>
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
              <label htmlFor="city" className="text-sm">Cidade (opcional)</label>
              <Input id="city" placeholder="São Paulo" {...register('city')} />
            </div>
            <div>
              <label htmlFor="state" className="text-sm">Estado (opcional)</label>
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