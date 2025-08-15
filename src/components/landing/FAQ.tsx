import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: 'O webinar é gratuito?', a: 'Sim, totalmente gratuito. Você receberá o link por e-mail após a inscrição.' },
  { q: 'Terei certificado?', a: 'Sim, após a participação você receberá um certificado digital.' },
  { q: 'Haverá replay?', a: 'Sim, por tempo limitado. O acesso será enviado por e-mail.' },
];

const FAQ = () => (
  <section className="container mx-auto px-4 py-12 md:py-16">
    <h2 className="text-center text-2xl md:text-3xl font-semibold">Perguntas frequentes</h2>
    <div className="mx-auto mt-6 max-w-3xl">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
