-- Nizamabad Services – Supabase (PostgreSQL) schema
-- Run in Supabase SQL Editor or via migrations.

-- Service requests from customers
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  address text not null,
  details text default '',
  service_slug text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Index for listing requests by phone
create index if not exists idx_requests_phone on public.requests (phone);
create index if not exists idx_requests_created_at on public.requests (created_at desc);

-- Service providers (by category)
create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  category_slug text not null,
  area text not null,
  rating numeric(3,2) not null default 0,
  rating_count int not null default 0,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

-- Composite index for list-by-category ordered by rating
create index if not exists idx_providers_category_rating
  on public.providers (category_slug asc, rating desc);

-- RLS (optional): allow service role full access; anon can be restricted per table
alter table public.requests enable row level security;
alter table public.providers enable row level security;

-- Policy: service role has full access (backend uses service_role key)
-- WITH CHECK is required for INSERT/UPDATE to be allowed.
create policy "Service role full access requests"
  on public.requests for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role full access providers"
  on public.providers for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
