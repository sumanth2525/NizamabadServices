-- Run this in Supabase SQL Editor if inserts fail with "row-level security policy".
-- It drops existing policies and recreates them with WITH CHECK so INSERT works.

drop policy if exists "Service role full access requests" on public.requests;
drop policy if exists "Service role full access providers" on public.providers;

create policy "Service role full access requests"
  on public.requests for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role full access providers"
  on public.providers for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
