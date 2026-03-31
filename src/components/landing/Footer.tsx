import { useSiteContent } from '@/contexts/SiteContentContext';

export function Footer() {
  const { content } = useSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={content.company.logo} alt={content.company.name} className="h-8 w-auto brightness-0 invert" />
            <span className="font-bold">{content.company.name}</span>
          </div>
          <p className="text-sm opacity-70">
            © {year} {content.company.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
