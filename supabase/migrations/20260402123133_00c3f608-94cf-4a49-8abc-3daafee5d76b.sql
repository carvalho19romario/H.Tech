CREATE TABLE public.site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site content"
  ON public.site_content FOR SELECT
  USING (true);

CREATE POLICY "Allow update site content"
  ON public.site_content FOR UPDATE
  USING (true);

CREATE POLICY "Allow insert site content"
  ON public.site_content FOR INSERT
  WITH CHECK (true);