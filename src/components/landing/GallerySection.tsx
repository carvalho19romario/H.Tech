import { motion } from 'framer-motion';
import { useSiteContent } from '@/contexts/SiteContentContext';

const storeImages = [
  { url: '/images/delivery.png', caption: 'Buscamos e entregamos seu aparelho sem custo adicional' },
  { url: '/images/loja-1.webp', caption: 'Nossa loja - Acessórios e produtos' },
  { url: '/images/loja-2.webp', caption: 'H.Tech Box 38 - Capas e acessórios' },
  { url: '/images/loja-3.webp', caption: 'Entrada da loja H.Tech' },
];

export function GallerySection() {
  const { content } = useSiteContent();

  const images = content.gallery.images.length > 0 ? content.gallery.images : storeImages;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {content.gallery.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{content.gallery.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{content.gallery.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-xl overflow-hidden shadow-md ${
                i === 0 ? 'sm:col-span-2 aspect-video' : 'aspect-square'
              }`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
