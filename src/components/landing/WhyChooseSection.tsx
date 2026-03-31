import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { Button } from '@/components/ui/button';

export function WhyChooseSection() {
  const { content, getWhatsappUrl } = useSiteContent();
  const { whyChoose } = content;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{whyChoose.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{whyChoose.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {whyChoose.reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-card border hover:shadow-lg transition-shadow"
            >
              <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2 rounded-full px-8 py-6"
          >
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Falar pelo WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
