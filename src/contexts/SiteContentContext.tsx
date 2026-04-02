import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  initials: string;
  name: string;
  timeAgo: string;
  text: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  us: string;
  them: string;
}

export interface GalleryImage {
  url: string;
  caption: string;
}

export interface SiteSection {
  enabled: boolean;
}

export interface SiteContent {
  company: {
    name: string;
    phone: string;
    whatsapp: string;
    whatsappMessage: string;
    address: string;
    city: string;
    state: string;
    cep: string;
    addressNote: string;
    hours: string;
    hoursDetail: string;
    logo: string;
    heroImage: string;
    yearsExperience: string;
    devicesCount: string;
    since: string;
    googleReviewsUrl: string;
    googleRating: string;
    mapEmbedUrl: string;
    gtmId: string;
    cnpj: string;
    legalName: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctaText: string;
  };
  whyChoose: {
    title: string;
    subtitle: string;
    reasons: { title: string; description: string }[];
  };
  comparison: {
    title: string;
    subtitle: string;
    rows: ComparisonRow[];
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    items: Service[];
    extras: { title: string; description: string }[];
    highlights: { icon: string; title: string; description: string }[];
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    images: GalleryImage[];
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    securityNote: string;
    ctaText: string;
  };
  sections: {
    hero: SiteSection;
    whyChoose: SiteSection;
    comparison: SiteSection;
    services: SiteSection;
    testimonials: SiteSection;
    gallery: SiteSection;
    contact: SiteSection;
  };
}

const defaultContent: SiteContent = {
  company: {
    name: "H.Tech Balneário Camboriú",
    phone: "(47) 3360-0899",
    whatsapp: "554733600899",
    whatsappMessage: "Não apague essa linha, protocolo 54615 - Olá, vi seu anúncio no google e gostaria de uma informação",
    address: "Rua 1520, 111 - Loja 38, Centro",
    city: "Balneário Camboriú",
    state: "SC",
    cep: "88330-532",
    addressNote: "Em frente à Igreja Matriz",
    hours: "Todos os dias",
    hoursDetail: "9h às 21h",
    logo: "/logo.svg",
    heroImage: "/images/centro.webp",
    yearsExperience: "+9",
    devicesCount: "+25 mil",
    since: "2016",
    googleReviewsUrl: "https://www.google.com/search?q=htech+balneario+camboriu",
    googleRating: "5.0",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.8!2d-48.6356!3d-26.9908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU5JzI3LjAiUyA0OMKwMzgnMDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1",
    gtmId: "GTM-WVCLMMNJ",
    cnpj: "35.143.695/0001-45",
    legalName: "H. TECH COMERCIO E MANUTENCAO DE ELETRONICOS LTDA",
  },
  hero: {
    badge: "Especialistas Credenciados",
    title: "Especialistas Credenciados nas Melhores Marcas em",
    highlight: "Balneário Camboriú",
    subtitle: "Especialistas em otimização de dispositivos das melhores marcas | Atendimento premium | Equipe certificada | Garantia de qualidade",
    ctaText: "Falar pelo WhatsApp",
  },
  whyChoose: {
    title: "Por que escolher nossos serviços?",
    subtitle: "Somos reconhecidos oficialmente pelas maiores marcas do mercado",
    reasons: [
      { title: `+9 anos de experiência em Balneário Camboriú`, description: "Atendendo com excelência e qualidade desde 2016" },
      { title: "Especialistas credenciados nas melhores marcas", description: "Realizamos soluções com peças originais e serviços especializados com qualidade garantida" },
      { title: "Peças originais com garantia de fábrica", description: "Acesso direto a peças originais e treinamento especializado" },
      { title: "+25 mil aparelhos atendidos com excelência", description: "Experiência comprovada em diversos modelos e marcas" },
      { title: "Atendimento rápido e seguro, sem enrolação", description: "Avaliação precisa e soluções eficientes para seu dispositivo" },
    ],
  },
  comparison: {
    title: "Por que escolher a H.Tech?",
    subtitle: "Veja a diferença entre nosso serviço e o da concorrência",
    rows: [
      { feature: "Especialistas certificados nas melhores marcas", us: "Sim, com credenciamento oficial", them: "Muitas vezes não são credenciados" },
      { feature: "Peças 100% originais com garantia de fábrica", us: "Sempre", them: "Genéricas e sem garantia" },
      { feature: "Avaliação rápida e gratuita", us: "Em minutos", them: "Pode cobrar só pra olhar" },
      { feature: `+9 anos de experiência`, us: "Em Balneário Camboriú, com reputação", them: "Muitas vezes recém-abertos" },
      { feature: "Atendimento via WhatsApp imediato", us: "Fale agora mesmo", them: "Resposta demorada ou nem respondem" },
      { feature: "Solução em até 1h (dependendo do modelo)", us: "Sem enrolação", them: "Dias de espera" },
    ],
  },
  services: {
    badge: "Nossos Serviços",
    title: "Alguns dos serviços que oferecemos",
    subtitle: "Soluções completas para seu dispositivo com garantia e qualidade",
    items: [
      { icon: "smartphone", title: "Substituição de tela", description: "Substituição de tela para qualquer marca com peças originais" },
      { icon: "battery", title: "Substituição de bateria", description: "Substituição de bateria com garantia e certificação" },
      { icon: "cpu", title: "Solução para placas", description: "Solução avançada para placas com equipamentos de última geração" },
      { icon: "droplets", title: "Recuperação de celular molhado", description: "Técnicas avançadas para recuperação de dispositivos com danos por líquidos" },
      { icon: "search", title: "Avaliação gratuita", description: "Avaliação gratuita e orçamento sem compromisso" },
      { icon: "wrench", title: "Serviços adicionais", description: "Câmeras, botões, alto-falantes, conectores e mais" },
    ],
    extras: [
      { title: "Soluções para dispositivos", description: "Para diversos modelos e marcas" },
      { title: "Entrega no mesmo dia", description: "Para sua comodidade" },
      { title: "Reciclagem de baterias", description: "Descarte ecologicamente correto" },
    ],
    highlights: [
      { icon: "zap", title: "Solução rápida", description: "Resolvemos em até 1h (dependendo do modelo)" },
      { icon: "shield", title: "Segurança total", description: "Seu aparelho em boas mãos: total sigilo e segurança de dados" },
      { icon: "award", title: "Peças originais", description: "Peças 100% originais com garantia de fábrica" },
    ],
  },
  testimonials: {
    badge: "Depoimentos",
    title: "O que nossos clientes dizem",
    subtitle: "Confira as avaliações reais de quem já utilizou nossos serviços",
    items: [
      { initials: "WA", name: "Willian Augusto", timeAgo: "2 meses atrás", text: "Ótimo serviço, resolveram meu problema em menos de uma hora, recomendo" },
      { initials: "WV", name: "Wilson Vagner", timeAgo: "11 meses atrás", text: "Excelente atendimento, serviço de alta qualidade, indico com nota 1.000" },
      { initials: "MS", name: "Maria Santos", timeAgo: "uma semana atrás", text: "Ótimo atendimento e produtos!!!" },
      { initials: "LR", name: "Letícia Reichardt", timeAgo: "11 meses atrás", text: "Excelente atendimento! Muito atencioso e super rápido pra solucionar o problema! Recomendo de olhos fechados." },
      { initials: "JC", name: "Jean Carlos Souza", timeAgo: "10 meses atrás", text: "Fomos muito bem atendidos são top de mais sempre viemos aqui nesta loja são top parabéns." },
      { initials: "CM", name: "Carlos Mendes", timeAgo: "há 2 semanas", text: "Serviço rápido e profissional. Trocaram a tela do meu celular em menos de 1 hora. Recomendo!" },
    ],
  },
  gallery: {
    badge: "Nossa Loja",
    title: "Conheça nossa estrutura",
    subtitle: "Ambiente moderno, organizado e com tecnologia de ponta para melhor atender você",
    images: [],
  },
  contact: {
    badge: "Fale Conosco",
    title: "Fale com um especialista agora",
    subtitle: "Está com urgência? Clique no botão abaixo e fale direto com nosso time pelo WhatsApp.",
    securityNote: "🔒 Atendimento rápido, transparente e seguro.",
    ctaText: "Quero um orçamento agora",
  },
  sections: {
    hero: { enabled: true },
    whyChoose: { enabled: true },
    comparison: { enabled: true },
    services: { enabled: true },
    testimonials: { enabled: true },
    gallery: { enabled: true },
    contact: { enabled: true },
  },
};

const STORAGE_KEY = 'htech-site-content';

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetContent: () => void;
  getWhatsappUrl: () => string;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultContent, ...JSON.parse(stored) };
      }
    } catch {}
    return defaultContent;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: SiteContent) => setContent(newContent);
  const resetContent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(defaultContent);
  };

  const getWhatsappUrl = () =>
    `https://wa.me/${content.company.whatsapp}?text=${encodeURIComponent(content.company.whatsappMessage)}`;

  return (
    <SiteContentContext.Provider value={{ content, updateContent, resetContent, getWhatsappUrl }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider');
  return ctx;
}
