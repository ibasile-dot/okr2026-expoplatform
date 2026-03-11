CREATE TABLE public.okr_metric_values (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  okr_number INTEGER NOT NULL,
  kr_number INTEGER NOT NULL,
  row_index INTEGER NOT NULL,
  column_key TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (okr_number, kr_number, row_index, column_key)
);

ALTER TABLE public.okr_metric_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.okr_metric_values
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.okr_metric_values
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON public.okr_metric_values
  FOR UPDATE USING (true) WITH CHECK (true);