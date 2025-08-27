import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Navigation = () => {
  const logoSrc = "/lovable-uploads/213c64a8-2323-4f86-b613-f91afc57109a.png";
  
  const handleWhatsAppContact = () => {
    // Número do WhatsApp - ajustar conforme necessário
    const phoneNumber = "5511999999999"; // Exemplo
    const message = "Olá! Gostaria de saber mais sobre o webinar de Clínica Cirúrgica de Ruminantes.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logoSrc}
              alt="EDUCAvet" 
              className="h-16 w-auto"
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
  );
};

export default Navigation;