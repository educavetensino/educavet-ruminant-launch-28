// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">EDUCAvet</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Bem-vindo! Acesse nossa nova página do webinar gratuito "Clínica Cirúrgica de Ruminantes".
        </p>
        <a href="/webinar-ruminantes" className="inline-block mt-6 rounded-md bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition">
          Ir para o webinar
        </a>
      </div>
    </div>
  );
};

export default Index;
