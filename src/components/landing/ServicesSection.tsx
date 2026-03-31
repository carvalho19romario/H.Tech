import { motion } from 'framer-motion';
import { Smartphone, Battery, Cpu, Droplets, Search, Wrench, Zap, Shield, Award, MessageCircle } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ElementType> = {
  smartphone: Smartphone, battery: Battery, cpu: Cpu, droplets: Droplets,
  search: Search, wrench: Wrench, zap: Zap, shield: Shield, award: Award,
};

export function ServicesSection() {
  const { content, getWhatsappUrl } = useSiteContent();
  const { services } = content;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            {services.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{services.title}</h2>
          <p className="text-muted-foreground text-lg">{services.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {services.items.map((service, i) => {
            const Icon = iconMap[service.icon] || Wrench;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl border bg-card hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Extras row */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {services.extras.map((extra, i) => (
            <div key={i} className="text-center px-6">
              <h4 className="font-bold">{extra.title}</h4>
              <p className="text-sm text-muted-foreground">{extra.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2 rounded-full px-8 py-6"
          >
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Solicitar orçamento
            </a>
          </Button>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {services.highlights.map((h, i) => {
            const Icon = iconMap[h.icon] || Zap;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-secondary/50"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-1">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{h.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
