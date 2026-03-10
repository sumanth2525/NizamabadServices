# Nizamabad Services

Customer-to-Business (C2B) local service directory for Nizamabad district, Telangana.  
**Stack: React (Vite + TypeScript), Python (FastAPI), Supabase.**

- **Frontend:** React 19, Vite 7, Tailwind CSS 4, React Router 7, Lucide icons.
- **Backend:** FastAPI, Supabase (PostgreSQL) via `supabase` Python client.
- **Features:** Home (service categories), request flow (providers by category), provider registration, Support (WhatsApp/Email/Facebook), My Requests, EN/TE language toggle.

## Quick start

### 1. Supabase

- Create a project at [supabase.com](https://supabase.com).
- Run `supabase/schema.sql` in the SQL Editor.
- Copy `backend/.env.example` → `backend/.env` and set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for details.

**Test Supabase API keys** (after setting `backend/.env`):
- **Key check:** `cd backend && python scripts/test_supabase_keys.py` — validates URL, connection, and that you're using the **service_role** key (not anon). If INSERT is blocked by RLS, it tells you to switch to the service_role key.
- **Connection only:** `python scripts/test_db_connection.py` — quick read test.
- **API:** Start the backend, then open `http://localhost:8000/health/db` — returns 200 if DB is connected.

### 2. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

API: `http://localhost:8000`. Docs: `http://localhost:8000/docs`.

### 3. Frontend

```bash
npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:8000
npm run dev
```

App: `http://localhost:5173`.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start Vite dev server    |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run test` | Frontend tests (Vitest)  |

Backend: `uvicorn main:app --reload`. Run backend tests: `cd backend && pytest tests/ -v`.

## Connection tests

- **Frontend** (`npm run test`): `src/api/connection.test.ts` – API client with no backend URL (returns no-backend / empty), and with mocked `fetch` for health, providers, requests, create request/provider.
- **Backend** (`cd backend && pytest tests/test_connection.py -v`): Health endpoint, GET/POST requests and providers with **mocked Supabase** (no real DB or credentials needed).

## Config

- **Root `.env`:** `VITE_API_URL`, optional `VITE_WHATSAPP_NUMBER`, `VITE_SUPPORT_EMAIL`, `VITE_FACEBOOK_URL`, `VITE_WHATSAPP_MESSAGE`.
- **`backend/.env`:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`; optional SMTP/Twilio for notifications.

## Project spec

See the full specification (business info, design, categories, API) in your project prompt or `PROJECT_PROMPT.md` if you add it.
