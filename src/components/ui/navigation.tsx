import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Navigation = () => {
  const logoSrc = "/lovable-uploads/7fbd0d21-182a-407a-9142-69b993955e4c.png";
  
  const handleWhatsAppContact = () => {
    // Número do WhatsApp - ajustar conforme necessário
    const phoneNumber = "5511999999999"; // Exemplo
    const message = "Olá! Gostaria de saber mais sobre o webinar de Clínica Cirúrgica de Ruminantes.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <nav className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src={logoSrc}
                alt="EDUCAvet" 
                className="h-16 w-auto mt-6"
              />
            </div>
            
            {/* Botão Entre em contato */}
            <div className="flex items-center">
              <Button 
                onClick={handleWhatsAppContact}
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium px-6 py-2 rounded-full flex items-center gap-2 transition-colors"
              >
                <MessageCircle size={20} />
                Entre em contato
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-4">
        <Separator className="w-full" />
      </div>
    </>
  );
};

export default Navigation;