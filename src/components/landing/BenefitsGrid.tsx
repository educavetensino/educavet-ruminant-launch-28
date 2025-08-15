import { ShieldCheck, Stethoscope, GraduationCap } from "lucide-react";

const items = [];

const BenefitsGrid = () => (
  <section className="container mx-auto px-4 py-12 md:py-16">
    <h2 className="text-center text-2xl md:text-3xl font-semibold">Para quem é este webinar?</h2>
    <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
      Graduandos no último ano e veterinários formados que desejam dominar protocolos clínicos e cirúrgicos de ruminantes, buscando segurança técnica, atualização e valorização profissional.
    </p>

    <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((it) => (
        <article key={it.title} className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow">
          <div className="mb-3 h-10 w-10 rounded-lg bg-primary/15 p-2">{it.icon}</div>
          <h3 className="text-lg font-semibold">{it.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
        </article>
      ))}
    </div>
  </section>
);

export default BenefitsGrid;
