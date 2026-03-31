import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const { content, getWhatsappUrl } = useSiteContent();
  const { contact, company } = content;

  return (
    <section className="py-20 lg:py-28 bg-background" id="contato">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            {contact.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{contact.title}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{contact.subtitle}</p>
          <p className="text-sm mt-2">{contact.securityNote}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border bg-card text-center"
          >
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">Endereço</h3>
            <p className="text-sm text-muted-foreground">{company.address}</p>
            <p className="text-sm text-muted-foreground">{company.city} - {company.state}</p>
            <p className="text-sm text-muted-foreground">CEP {company.cep}</p>
            {company.addressNote && (
              <p className="text-xs text-primary mt-2">({company.addressNote})</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl border bg-card text-center"
          >
            <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">Telefone</h3>
            <p className="text-sm text-muted-foreground">{company.phone}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl border bg-card text-center"
          >
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">Horário</h3>
            <p className="text-sm text-muted-foreground">{company.hours}</p>
            <p className="text-sm text-muted-foreground">{company.hoursDetail}</p>
          </motion.div>
        </div>

        {/* Map */}
        {company.mapEmbedUrl && (
          <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden border shadow-lg">
            <iframe
              src={company.mapEmbedUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa - ${company.name}`}
            />
          </div>
        )}

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2 rounded-full px-10 py-7 text-lg shadow-lg"
          >
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-6 h-6" />
              {contact.ctaText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
