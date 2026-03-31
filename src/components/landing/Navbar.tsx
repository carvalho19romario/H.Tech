import { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre Nós', href: '#sobre' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
];

export function Navbar() {
  const { content, getWhatsappUrl } = useSiteContent();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <img src={content.company.logo} alt={content.company.name} className="h-8 w-auto" />
          <span className="font-bold text-lg hidden sm:inline">{content.company.name.split(' ')[0]}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </a>
          ))}
          <Button asChild size="sm" className="bg-foreground hover:bg-foreground/90 text-primary-foreground gap-2 rounded-full">
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Fale Conosco
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          {navItems.map(item => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block text-sm font-medium py-2">
              {item.label}
            </a>
          ))}
          <Button asChild className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2 rounded-full">
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Fale Conosco
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
