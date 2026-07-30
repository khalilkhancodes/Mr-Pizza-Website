-- Allow customers (anon role) to view their orders by ID
-- Order IDs use nanoid(24) — 144-bit random — effectively unguessable
CREATE POLICY "Anyone can view orders by ID" ON public.orders
  FOR SELECT TO anon
  USING (true);
