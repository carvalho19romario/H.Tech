import { useSiteContent } from '@/contexts/SiteContentContext';

export function Footer() {
  const { content } = useSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-10 pb-20 md:pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt={content.company.name} className="h-8 w-auto" />
            <span className="font-bold">{content.company.name}</span>
          </div>
          <div className="text-center md:text-right space-y-1">
            <p className="text-sm opacity-70">
              © {year} {content.company.name}. Todos os direitos reservados.
            </p>
            <p className="text-xs opacity-50">
              CNPJ {content.company.cnpj} — {content.company.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
