import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const { content, getWhatsappUrl } = useSiteContent();
  const { hero, company } = content;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-secondary/40 via-background to-background">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-foreground text-primary-foreground text-sm font-medium">
              {hero.badge}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {hero.title}{' '}
              <span className="text-gradient">{hero.highlight}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              {hero.subtitle}
            </p>

            <Button
              asChild
              size="lg"
              className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2 text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                {hero.ctaText}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img
                src={company.heroImage}
                alt={`${company.name} - Centro de serviço credenciado`}
                className="w-full h-auto object-cover rounded-2xl"
                loading="eager"
              />
              <div className="absolute top-4 left-4">
                <img
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
