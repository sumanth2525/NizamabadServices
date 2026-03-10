-- Drop and recreate requests + providers. Run in Supabase SQL Editor.

-- 1. Drop existing tables (order doesn't matter; no FK between them)
DROP TABLE IF EXISTS public.requests CASCADE;
DROP TABLE IF EXISTS public.providers CASCADE;

-- 2. Create tables
CREATE TABLE public.requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  details text DEFAULT ''::text,
  service_slug text NOT NULL,
  status text NOT NULL DEFAULT 'pending'::text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT requests_pkey PRIMARY KEY (id)
);

CREATE TABLE public.providers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  category_slug text NOT NULL,
  area text NOT NULL,
  rating numeric(3,2) NOT NULL DEFAULT 0,
  rating_count integer NOT NULL DEFAULT 0,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT providers_pkey PRIMARY KEY (id)
);

-- 3. Indexes
CREATE INDEX idx_requests_phone ON public.requests (phone);
CREATE INDEX idx_requests_created_at ON public.requests (created_at DESC);
CREATE INDEX idx_providers_category_rating ON public.providers (category_slug ASC, rating DESC);

-- 4. RLS so backend (service_role) can read/write
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access requests"
  ON public.requests FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access providers"
  ON public.providers FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
