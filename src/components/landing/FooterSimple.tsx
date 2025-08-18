const FooterSimple = () => (
  <footer className="border-t border-border py-8">
    <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground md:flex-row">
      <p>© {new Date().getFullYear()} EDUCAvet. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default FooterSimple;
