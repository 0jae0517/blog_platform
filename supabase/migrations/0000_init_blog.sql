CREATE TABLE IF NOT EXISTS public.posts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    excerpt text NOT NULL,
    category text NOT NULL,
    image_url text NOT NULL,
    read_time text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" 
    ON public.posts FOR SELECT 
    USING ( true );
