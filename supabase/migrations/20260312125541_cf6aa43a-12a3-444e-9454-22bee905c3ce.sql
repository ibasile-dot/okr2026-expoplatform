CREATE TABLE public.automation_idea_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id text NOT NULL UNIQUE,
  status text,
  notes text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.automation_idea_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.automation_idea_updates FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert" ON public.automation_idea_updates FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.automation_idea_updates FOR UPDATE TO public USING (true) WITH CHECK (true);
