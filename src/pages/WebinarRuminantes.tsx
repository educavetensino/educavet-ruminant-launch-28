import HeadSection from "@/components/landing/HeadSection";
import Navigation from "@/components/ui/navigation";
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
const logoSrc = "/lovable-uploads/f68f215d-8270-4d71-8e35-41ec4bb781b8.png";

const WebinarRuminantes = () => {
  const title = "Webinar Grátis: Clínica Cirúrgica de Ruminantes | EDUCAvet";
  const description = "Aprenda técnicas práticas para ruminantes no webinar gratuito da EDUCAvet. Inscreva-se e garanta seu certificado.";

  return (
    <main className="relative min-h-screen">
      {/* Logo transparente no fundo direito */}
      <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none z-0">
        <img 
          src={logoSrc}
          alt="" 
          className="w-32 md:w-48 h-auto"
        />
      </div>
      <HeadSection title={title} description={description} />
      <Navigation />
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
