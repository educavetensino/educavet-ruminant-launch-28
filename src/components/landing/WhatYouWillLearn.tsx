const topics = [
  'Avaliação pré-operatória em ruminantes',
  'Técnicas de anestesia e analgesia',
  'Protocolos de assepsia e antissepsia',
  'Principais cirurgias: rumenotomia, cesariana, herniorrafia',
  'Cuidados pós-operatórios e complicações',
  'Boas práticas e bem-estar animal'
];

const WhatYouWillLearn = () => (
  <section id="conteudo" className="container mx-auto px-4 py-12 md:py-16">
    <h2 className="text-center text-2xl md:text-3xl font-semibold">O que você vai aprender?</h2>
    <div className="mx-auto mt-8 max-w-4xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t, index) => (
          <article 
            key={t} 
            className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
              </div>
            </div>
            <h3 className="text-base font-medium leading-relaxed">{t}</h3>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WhatYouWillLearn;
