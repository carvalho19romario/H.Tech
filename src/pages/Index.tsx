import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { WhyChooseSection } from '@/components/landing/WhyChooseSection';
import { ComparisonSection } from '@/components/landing/ComparisonSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { GallerySection } from '@/components/landing/GallerySection';
import { Footer } from '@/components/landing/Footer';
import { FloatingWhatsApp } from '@/components/landing/FloatingWhatsApp';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { useGTM } from '@/hooks/useGTM';

const Index = () => {
  const { content } = useSiteContent();
  useGTM();
  const s = content.sections;

  return (
    <div className="min-h-screen">
      <Navbar />
      {s.hero.enabled && <HeroSection />}
      {s.whyChoose.enabled && <div id="sobre"><WhyChooseSection /></div>}
      {s.comparison.enabled && <ComparisonSection />}
      {s.services.enabled && <div id="servicos"><ServicesSection /></div>}
      {s.testimonials.enabled && <div id="depoimentos"><TestimonialsSection /></div>}
      {s.gallery.enabled && <div id="galeria"><GallerySection /></div>}
      {s.contact.enabled && <ContactSection />}
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
