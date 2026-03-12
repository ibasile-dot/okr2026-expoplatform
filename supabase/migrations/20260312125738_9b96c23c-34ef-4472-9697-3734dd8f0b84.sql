ALTER TABLE public.automation_idea_updates
  ADD COLUMN IF NOT EXISTS idea text,
  ADD COLUMN IF NOT EXISTS solves text,
  ADD COLUMN IF NOT EXISTS impact text,
  ADD COLUMN IF NOT EXISTS confidence text,
  ADD COLUMN IF NOT EXISTS ease text,
  ADD COLUMN IF NOT EXISTS phase text;
