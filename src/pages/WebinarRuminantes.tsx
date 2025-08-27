import HeadSection from "@/components/landing/HeadSection";
import HeroSection from "@/components/landing/HeroSection";
import VideoSignup from "@/components/landing/VideoSignup";
import SocialTicker from "@/components/landing/SocialTicker";
import BenefitsGrid from "@/components/landing/BenefitsGrid";
import WhatYouWillLearn from "@/components/landing/WhatYouWillLearn";
import Testimonials from "@/components/landing/Testimonials";
import FinalCTA from "@/components/landing/FinalCTA";
import Instructor from "@/components/landing/Instructor";
import FAQ from "@/components/landing/FAQ";
import FooterSimple from "@/components/landing/FooterSimple";
const logoSrc = "/lovable-uploads/b58abba6-9515-4b44-b589-d91b3f71e060.png";

const WebinarRuminantes = () => {
  const title = "Webinar Grátis: Clínica Cirúrgica de Ruminantes | EDUCAvet";
  const description = "Aprenda técnicas práticas para ruminantes no webinar gratuito da EDUCAvet. Inscreva-se e garanta seu certificado.";

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <img 
          src="/lovable-uploads/83382ecb-4acd-4cb4-b077-2202957339c0.png" 
          alt="" 
          className="w-full h-full object-cover fixed"
        />
        {/* Logo transparente no fundo direito */}
        <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none z-0">
          <img 
            src={logoSrc}
            alt="" 
            className="w-32 md:w-48 h-auto"
          />
        </div>
      </div>
      <HeadSection title={title} description={description} />
      <HeroSection />
      <VideoSignup />
      <BenefitsGrid />
      <SocialTicker />
      <WhatYouWillLearn />
      <Testimonials />
      <FinalCTA />
      <Instructor />
      <FAQ />
      <FooterSimple />
    </main>
  );
};

export default WebinarRuminantes;
