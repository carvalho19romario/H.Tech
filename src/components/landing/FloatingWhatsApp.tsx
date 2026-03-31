import { MessageCircle } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';

export function FloatingWhatsApp() {
  const { getWhatsappUrl } = useSiteContent();

  return (
    <a
      href={getWhatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp text-whatsapp-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
