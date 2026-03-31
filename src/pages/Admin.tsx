import { useState } from 'react';
import { useSiteContent, SiteContent } from '@/contexts/SiteContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {multiline ? (
        <Textarea value={value} onChange={e => onChange(e.target.value)} className="min-h-[80px]" />
      ) : (
        <Input value={value} onChange={e => onChange(e.target.value)} />
      )}
    </div>
  );
}

export default function Admin() {
  const { content, updateContent, resetContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(JSON.parse(JSON.stringify(content)));
  const { toast } = useToast();

  const update = (path: string, value: any) => {
    const newDraft = JSON.parse(JSON.stringify(draft));
    const keys = path.split('.');
    let obj: any = newDraft;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setDraft(newDraft);
  };

  const save = () => {
    updateContent(draft);
    toast({ title: 'Salvo!', description: 'As alterações foram aplicadas ao site.' });
  };

  const reset = () => {
    resetContent();
    setDraft(JSON.parse(JSON.stringify(content)));
    toast({ title: 'Resetado', description: 'Conteúdo restaurado ao padrão.' });
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Ver site
            </Link>
            <span className="text-xl font-bold">Painel Admin</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={reset} className="gap-1.5">
              <RotateCcw className="w-4 h-4" /> Resetar
            </Button>
            <Button size="sm" onClick={save} className="gap-1.5">
              <Save className="w-4 h-4" /> Salvar alterações
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="empresa" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="empresa">Empresa</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="porque">Por que Escolher</TabsTrigger>
            <TabsTrigger value="comparacao">Comparação</TabsTrigger>
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
            <TabsTrigger value="depoimentos">Depoimentos</TabsTrigger>
            <TabsTrigger value="contato">Contato</TabsTrigger>
            <TabsTrigger value="secoes">Seções</TabsTrigger>
          </TabsList>

          {/* EMPRESA */}
          <TabsContent value="empresa">
            <Card>
              <CardHeader><CardTitle>Informações da Empresa</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Field label="Nome" value={draft.company.name} onChange={v => update('company.name', v)} />
                <Field label="Telefone" value={draft.company.phone} onChange={v => update('company.phone', v)} />
                <Field label="WhatsApp (apenas números)" value={draft.company.whatsapp} onChange={v => update('company.whatsapp', v)} />
                <Field label="Mensagem WhatsApp" value={draft.company.whatsappMessage} onChange={v => update('company.whatsappMessage', v)} />
                <Field label="Endereço" value={draft.company.address} onChange={v => update('company.address', v)} />
                <Field label="Cidade" value={draft.company.city} onChange={v => update('company.city', v)} />
                <Field label="Estado" value={draft.company.state} onChange={v => update('company.state', v)} />
                <Field label="CEP" value={draft.company.cep} onChange={v => update('company.cep', v)} />
                <Field label="Observação endereço" value={draft.company.addressNote} onChange={v => update('company.addressNote', v)} />
                <Field label="Horário" value={draft.company.hours} onChange={v => update('company.hours', v)} />
                <Field label="Detalhe horário" value={draft.company.hoursDetail} onChange={v => update('company.hoursDetail', v)} />
                <Field label="URL do Logo" value={draft.company.logo} onChange={v => update('company.logo', v)} />
                <Field label="URL da Imagem Hero" value={draft.company.heroImage} onChange={v => update('company.heroImage', v)} />
                <Field label="Anos de experiência" value={draft.company.yearsExperience} onChange={v => update('company.yearsExperience', v)} />
                <Field label="Dispositivos atendidos" value={draft.company.devicesCount} onChange={v => update('company.devicesCount', v)} />
                <Field label="Desde" value={draft.company.since} onChange={v => update('company.since', v)} />
                <Field label="URL Google Reviews" value={draft.company.googleReviewsUrl} onChange={v => update('company.googleReviewsUrl', v)} />
                <Field label="Nota Google" value={draft.company.googleRating} onChange={v => update('company.googleRating', v)} />
                <Field label="URL embed do mapa" value={draft.company.mapEmbedUrl} onChange={v => update('company.mapEmbedUrl', v)} multiline />
                <Field label="Google Tag Manager ID (ex: GTM-XXXX)" value={draft.company.gtmId} onChange={v => update('company.gtmId', v)} />
                <Field label="CNPJ" value={draft.company.cnpj} onChange={v => update('company.cnpj', v)} />
                <Field label="Razão Social" value={draft.company.legalName} onChange={v => update('company.legalName', v)} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* HERO */}
          <TabsContent value="hero">
            <Card>
              <CardHeader><CardTitle>Seção Hero</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Field label="Badge" value={draft.hero.badge} onChange={v => update('hero.badge', v)} />
                <Field label="Título" value={draft.hero.title} onChange={v => update('hero.title', v)} />
                <Field label="Destaque (texto colorido)" value={draft.hero.highlight} onChange={v => update('hero.highlight', v)} />
                <Field label="Subtítulo" value={draft.hero.subtitle} onChange={v => update('hero.subtitle', v)} multiline />
                <Field label="Texto do botão CTA" value={draft.hero.ctaText} onChange={v => update('hero.ctaText', v)} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* POR QUE ESCOLHER */}
          <TabsContent value="porque">
            <Card>
              <CardHeader><CardTitle>Por que Escolher</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Field label="Título" value={draft.whyChoose.title} onChange={v => update('whyChoose.title', v)} />
                <Field label="Subtítulo" value={draft.whyChoose.subtitle} onChange={v => update('whyChoose.subtitle', v)} />
                <div className="space-y-4">
                  <Label className="font-bold">Razões</Label>
                  {draft.whyChoose.reasons.map((r, i) => (
                    <div key={i} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">Razão {i + 1}</span>
                        <Button variant="ghost" size="sm" onClick={() => {
                          const reasons = [...draft.whyChoose.reasons];
                          reasons.splice(i, 1);
                          update('whyChoose.reasons', reasons);
                        }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                      <Field label="Título" value={r.title} onChange={v => {
                        const reasons = [...draft.whyChoose.reasons];
                        reasons[i] = { ...reasons[i], title: v };
                        update('whyChoose.reasons', reasons);
                      }} />
                      <Field label="Descrição" value={r.description} onChange={v => {
                        const reasons = [...draft.whyChoose.reasons];
                        reasons[i] = { ...reasons[i], description: v };
                        update('whyChoose.reasons', reasons);
                      }} />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    update('whyChoose.reasons', [...draft.whyChoose.reasons, { title: '', description: '' }]);
                  }} className="gap-1.5"><Plus className="w-4 h-4" /> Adicionar razão</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMPARAÇÃO */}
          <TabsContent value="comparacao">
            <Card>
              <CardHeader><CardTitle>Tabela de Comparação</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Field label="Título" value={draft.comparison.title} onChange={v => update('comparison.title', v)} />
                <Field label="Subtítulo" value={draft.comparison.subtitle} onChange={v => update('comparison.subtitle', v)} />
                {draft.comparison.rows.map((row, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Linha {i + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => {
                        const rows = [...draft.comparison.rows];
                        rows.splice(i, 1);
                        update('comparison.rows', rows);
                      }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                    <Field label="Característica" value={row.feature} onChange={v => {
                      const rows = [...draft.comparison.rows];
                      rows[i] = { ...rows[i], feature: v };
                      update('comparison.rows', rows);
                    }} />
                    <Field label="Nós" value={row.us} onChange={v => {
                      const rows = [...draft.comparison.rows];
                      rows[i] = { ...rows[i], us: v };
                      update('comparison.rows', rows);
                    }} />
                    <Field label="Concorrentes" value={row.them} onChange={v => {
                      const rows = [...draft.comparison.rows];
                      rows[i] = { ...rows[i], them: v };
                      update('comparison.rows', rows);
                    }} />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  update('comparison.rows', [...draft.comparison.rows, { feature: '', us: '', them: '' }]);
                }} className="gap-1.5"><Plus className="w-4 h-4" /> Adicionar linha</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SERVIÇOS */}
          <TabsContent value="servicos">
            <Card>
              <CardHeader><CardTitle>Serviços</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Field label="Badge" value={draft.services.badge} onChange={v => update('services.badge', v)} />
                <Field label="Título" value={draft.services.title} onChange={v => update('services.title', v)} />
                <Field label="Subtítulo" value={draft.services.subtitle} onChange={v => update('services.subtitle', v)} />
                <Label className="font-bold">Serviços</Label>
                {draft.services.items.map((item, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Serviço {i + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => {
                        const items = [...draft.services.items];
                        items.splice(i, 1);
                        update('services.items', items);
                      }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                    <Field label="Ícone (smartphone, battery, cpu, droplets, search, wrench)" value={item.icon} onChange={v => {
                      const items = [...draft.services.items];
                      items[i] = { ...items[i], icon: v };
                      update('services.items', items);
                    }} />
                    <Field label="Título" value={item.title} onChange={v => {
                      const items = [...draft.services.items];
                      items[i] = { ...items[i], title: v };
                      update('services.items', items);
                    }} />
                    <Field label="Descrição" value={item.description} onChange={v => {
                      const items = [...draft.services.items];
                      items[i] = { ...items[i], description: v };
                      update('services.items', items);
                    }} />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  update('services.items', [...draft.services.items, { icon: 'wrench', title: '', description: '' }]);
                }} className="gap-1.5"><Plus className="w-4 h-4" /> Adicionar serviço</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DEPOIMENTOS */}
          <TabsContent value="depoimentos">
            <Card>
              <CardHeader><CardTitle>Depoimentos</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Field label="Badge" value={draft.testimonials.badge} onChange={v => update('testimonials.badge', v)} />
                <Field label="Título" value={draft.testimonials.title} onChange={v => update('testimonials.title', v)} />
                <Field label="Subtítulo" value={draft.testimonials.subtitle} onChange={v => update('testimonials.subtitle', v)} />
                {draft.testimonials.items.map((item, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Depoimento {i + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => {
                        const items = [...draft.testimonials.items];
                        items.splice(i, 1);
                        update('testimonials.items', items);
                      }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                    <Field label="Iniciais" value={item.initials} onChange={v => {
                      const items = [...draft.testimonials.items];
                      items[i] = { ...items[i], initials: v };
                      update('testimonials.items', items);
                    }} />
                    <Field label="Nome" value={item.name} onChange={v => {
                      const items = [...draft.testimonials.items];
                      items[i] = { ...items[i], name: v };
                      update('testimonials.items', items);
                    }} />
                    <Field label="Tempo" value={item.timeAgo} onChange={v => {
                      const items = [...draft.testimonials.items];
                      items[i] = { ...items[i], timeAgo: v };
                      update('testimonials.items', items);
                    }} />
                    <Field label="Texto" value={item.text} onChange={v => {
                      const items = [...draft.testimonials.items];
                      items[i] = { ...items[i], text: v };
                      update('testimonials.items', items);
                    }} multiline />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  update('testimonials.items', [...draft.testimonials.items, { initials: '', name: '', timeAgo: '', text: '' }]);
                }} className="gap-1.5"><Plus className="w-4 h-4" /> Adicionar depoimento</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONTATO */}
          <TabsContent value="contato">
            <Card>
              <CardHeader><CardTitle>Contato</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Field label="Badge" value={draft.contact.badge} onChange={v => update('contact.badge', v)} />
                <Field label="Título" value={draft.contact.title} onChange={v => update('contact.title', v)} />
                <Field label="Subtítulo" value={draft.contact.subtitle} onChange={v => update('contact.subtitle', v)} multiline />
                <Field label="Nota de segurança" value={draft.contact.securityNote} onChange={v => update('contact.securityNote', v)} />
                <Field label="Texto do botão CTA" value={draft.contact.ctaText} onChange={v => update('contact.ctaText', v)} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEÇÕES */}
          <TabsContent value="secoes">
            <Card>
              <CardHeader><CardTitle>Ativar/Desativar Seções</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {(Object.keys(draft.sections) as Array<keyof typeof draft.sections>).map(key => {
                  const labels: Record<string, string> = {
                    hero: 'Hero (topo)', whyChoose: 'Por que Escolher', comparison: 'Tabela Comparação',
                    services: 'Serviços', testimonials: 'Depoimentos', gallery: 'Galeria', contact: 'Contato',
                  };
                  return (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <Label>{labels[key] || key}</Label>
                      <Switch
                        checked={draft.sections[key].enabled}
                        onCheckedChange={v => update(`sections.${key}.enabled`, v)}
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
