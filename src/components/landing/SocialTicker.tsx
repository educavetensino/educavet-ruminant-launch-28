import { Instagram, Linkedin, Youtube } from "lucide-react";
const SocialTicker = () => {
  const items = [{
    icon: <Instagram />,
    label: 'Instagram',
    href: 'https://www.instagram.com/educavet/'
  }, {
    icon: <Linkedin />,
    label: 'LinkedIn',
    href: 'https://br.linkedin.com/school/educavetensino/'
  }, {
    icon: <Youtube />,
    label: 'YouTube',
    href: 'https://www.youtube.com/@educavet'
  }];
  return <section className="bg-secondary/40 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 max-w-md mx-auto">
          {items.map(it => <a key={it.label} href={it.href} className="group flex items-center justify-center gap-3 rounded-lg border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg py-4 px-6">
              <span className="text-foreground/80 group-hover:text-foreground transition-colors">{it.icon}</span>
              <span className="text-base font-medium">{it.label}</span>
            </a>)}
        </div>
      </div>
    </section>;
};
export default SocialTicker;