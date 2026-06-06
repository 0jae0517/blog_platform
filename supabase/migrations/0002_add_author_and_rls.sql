ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES auth.users(id);

CREATE POLICY "Users can insert their own posts"
    ON public.posts FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts"
    ON public.posts FOR UPDATE
    TO authenticated
    USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts"
    ON public.posts FOR DELETE
    TO authenticated
    USING (auth.uid() = author_id);
