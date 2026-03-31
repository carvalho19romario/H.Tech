import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';

export function ComparisonSection() {
  const { content } = useSiteContent();
  const { comparison, company } = content;

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{comparison.title}</h2>
          <p className="text-muted-foreground text-lg">{comparison.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto overflow-hidden rounded-2xl border bg-card shadow-lg"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-foreground text-primary-foreground font-bold text-sm md:text-base">
            <div className="p-4 md:p-5">Característica</div>
            <div className="p-4 md:p-5 text-center bg-primary">{company.name.split(' ')[0]}</div>
            <div className="p-4 md:p-5 text-center opacity-70">Concorrentes</div>
          </div>

          {comparison.rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 text-sm md:text-base ${i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}>
              <div className="p-4 md:p-5 font-medium">{row.feature}</div>
              <div className="p-4 md:p-5 text-center bg-primary/5">
                <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                  <Check className="w-4 h-4" /> {row.us}
                </span>
              </div>
              <div className="p-4 md:p-5 text-center text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <X className="w-4 h-4 text-destructive" /> {row.them}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
