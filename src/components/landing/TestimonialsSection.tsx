import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';

export function TestimonialsSection() {
  const { content } = useSiteContent();
  const { testimonials, company } = content;

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            {testimonials.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{testimonials.title}</h2>
          <p className="text-muted-foreground text-lg">{testimonials.subtitle}</p>

          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-xl">{company.googleRating}</span>
            <span className="text-muted-foreground text-sm">no Google</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.timeAgo}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{item.text}"</p>
              <p className="text-xs text-muted-foreground mt-3">Avaliação do Google</p>
            </motion.div>
          ))}
        </div>

        {company.googleReviewsUrl && (
          <div className="text-center mt-10">
            <a
              href={company.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              ⭐ Ver todas as avaliações no Google
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
