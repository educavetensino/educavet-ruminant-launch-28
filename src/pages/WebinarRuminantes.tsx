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
const logoSrc = "/lovable-uploads/7fbd0d21-182a-407a-9142-69b993955e4c.png";

const WebinarRuminantes = () => {
  const title = "Webinar Grátis: Clínica Cirúrgica de Ruminantes | EDUCAvet";
  const description = "Aprenda técnicas práticas para ruminantes no webinar gratuito da EDUCAvet. Inscreva-se e garanta seu certificado.";

  return (
    <main className="relative min-h-screen">
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
