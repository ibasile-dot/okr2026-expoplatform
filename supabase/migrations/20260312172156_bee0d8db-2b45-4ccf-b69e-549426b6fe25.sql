CREATE TABLE public.okr_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  okr_number integer NOT NULL,
  owner text NOT NULL DEFAULT '',
  department text NOT NULL DEFAULT '',
  initiative text NOT NULL DEFAULT '',
  tool text NOT NULL DEFAULT '',
  link_notes text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.okr_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.okr_updates FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert" ON public.okr_updates FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.okr_updates FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete" ON public.okr_updates FOR DELETE TO public USING (true);