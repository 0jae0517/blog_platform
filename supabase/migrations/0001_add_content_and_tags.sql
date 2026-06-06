ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content text DEFAULT '';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
