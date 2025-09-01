import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const logoSrc = "/lovable-uploads/213c64a8-2323-4f86-b613-f91afc57109a.png";

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
  return <header className="relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{
            opacity: 0,
            y: 20
          }} 
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }} 
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            Clínica Cirúrgica de Ruminantes
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Webinar gratuito e ao vivo para veterinários: aprenda técnicas práticas e de alto impacto para atuação em ruminantes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={scrollToForm} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
              Inscreva-se agora
            </Button>
            <a href="#conteudo">
              <Button variant="secondary" size="lg" className="hover-scale px-8 py-4 text-lg">
                Ver conteúdo do curso
              </Button>
            </a>
          </div>

          <div className="text-lg text-muted-foreground">
            Início em: <span className="font-semibold text-foreground">{timeLeft}</span>
          </div>
        </motion.div>
      </div>
    </header>;
};
export default HeroSection;