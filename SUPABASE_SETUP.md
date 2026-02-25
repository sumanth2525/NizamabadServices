# Supabase setup for Nizamabad Services

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Note your **Project URL** and **Service role key** (Settings → API).

## 2. Run the schema

In the Supabase Dashboard → **SQL Editor**, run the contents of `supabase/schema.sql`.  
This creates the `requests` and `providers` tables and indexes.

## 3. Backend environment

Copy `backend/.env.example` to `backend/.env` and set:

- `SUPABASE_URL` – your project URL (e.g. `https://xxxx.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` – the **service_role** key (keep secret; backend only)

## 4. Frontend (optional)

The frontend talks to your **FastAPI backend** only. Set `VITE_API_URL` in the root `.env` (e.g. `http://localhost:8000`) so the app can create requests and list providers.

## 5. Row Level Security (RLS)

The schema enables RLS and adds policies so that the **service_role** key (used by the backend) has full access. Do not expose the service role key in the frontend.
