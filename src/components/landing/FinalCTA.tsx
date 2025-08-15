import { Button } from "@/components/ui/button";

const FinalCTA = () => (
  <section className="container mx-auto px-4 py-12 md:py-16">
    <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/15 via-secondary to-secondary/60 p-8 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold">Garanta sua vaga gratuita</h2>
      <p className="mt-2 text-muted-foreground">Aprenda com quem está no campo todos os dias. Webinar com certificado.</p>
      <a href="#inscricao">
        <Button className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">Quero participar</Button>
      </a>
    </div>
  </section>
);

export default FinalCTA;
