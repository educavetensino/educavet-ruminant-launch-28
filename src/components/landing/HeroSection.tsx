import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const LOGO_SRC = "/lovable-uploads/b0ad74de-2abc-40cc-8e16-281cf81c8444.png";

// Ajuste aqui a data/hora do webinar (timezone -03:00)
const WEBINAR_DATETIME = "2025-09-16T18:57:00-03:00";
const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const target = useMemo(() => new Date(WEBINAR_DATETIME).getTime(), []);
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor(diff / (1000 * 60 * 60) % 24);
      const m = Math.floor(diff / (1000 * 60) % 60);
      const s = Math.floor(diff / 1000 % 60);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(id);
  }, [target]);
  const scrollToForm = () => {
    const el = document.getElementById("inscricao");
    el?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <header className="relative overflow-hidden">
      <div className="container mx-auto px-4 pt-12 pb-10 md:py-16">
        <div className="flex flex-col-reverse items-center gap-8 md:grid md:grid-cols-2">
          <motion.div initial={{
          opacity: 0,
          y: 16
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          ease: "easeOut"
        }} className="text-left">
            <img src={LOGO_SRC} alt="Logo EDUCAvet" width={220} height={64} loading="lazy" className="mb-3 h-auto w-32 md:w-44" />
            <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight tracking-tight animate-fade-in">
              Clínica Cirúrgica de Ruminantes
            </h1>
            <p className="mt-4 max-w-prose text-muted-foreground md:text-lg">
              Webinar gratuito e ao vivo para veterinários: aprenda técnicas
              práticas e de alto impacto para atuação em ruminantes.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button onClick={scrollToForm} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Inscreva-se agora
              </Button>
              <a href="#conteudo" className="sm:ml-2">
                <Button variant="secondary" className="hover-scale">
                  Ver conteúdo do curso
                </Button>
              </a>
            </div>

            <div className="mt-6 text-sm text-muted-foreground">
              Início em: <span className="font-medium text-foreground">{timeLeft}</span>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.1
        }} className="w-full">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-border bg-secondary shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.3)]">
              <img 
                src="/lovable-uploads/0fafd445-8497-4e3b-871b-b67fdbc57043.png" 
                alt="Ruminantes - Bovinos no campo" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </header>;
};
export default HeroSection;