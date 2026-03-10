# Nizamabad Services – Project Prompt

A concise specification for AI assistants and developers working on this codebase.

---

## 1. Overview

**Nizamabad Services** is a Customer-to-Business (C2B) local service directory for Nizamabad district, Telangana, India. Users browse service categories, view providers by area, submit service requests, and contact providers. Providers can register themselves.

- **Tagline:** *Book trusted Nizamabad services for home, auto & agriculture in under 5 minutes.*
- **Promise:** Under 5 minutes via email + WhatsApp
- **Hours:** 6:00 AM – 8:00 PM
- **Area:** Nizamabad district, Telangana

---

## 2. Tech Stack

| Layer    | Tech |
|----------|------|
| Frontend | React 19, Vite 7, TypeScript, Tailwind CSS 4, React Router 7, Lucide icons |
| Backend  | FastAPI (Python) |
| Database | Supabase (PostgreSQL) via `supabase` Python client |

---

## 3. Service Categories (13 total)

| Slug | Name (EN) | Name (TE) |
|------|-----------|-----------|
| `plumbing` | Plumbing | ప్లంబింగ్ |
| `electrician` | Electrician | ఎలక్ట్రీషియన్ |
| `vehicle-auto` | Vehicle & Auto | వాహనం మరియు ఆటో |
| `home-cleaning` | Home Cleaning | ఇంటి శుభ్రత |
| `bathroom-tiles` | Bathroom & Tiles | బాత్రూమ్ మరియు టైల్స్ |
| `painting` | Painting | పెయింటింగ్ |
| `carpentry-furniture` | Carpentry & Furniture | కార్పెంట్రీ మరియు ఫర్నిచర్ |
| `pest-control` | Pest Control | పీస్ట్ కంట్రోల్ |
| `ac-appliance` | AC & Appliance | AC మరియు ఉపకరణం |
| `locks-security` | Locks & Security | లాక్‌లు మరియు భద్రత |
| `photography` | Photography | ఫోటోగ్రఫీ |
| `catering-tiffin` | Catering & Tiffin | కేటరింగ్ మరియు టిఫిన్ |
| `agriculture-farm` | Agriculture & Farm | వ్యవసాయం మరియు వ్యవసాయం |

Use these slugs for `service_slug` (requests) and `category_slug` (providers).

---

## 4. Service Areas (5)

- `Nizamabad city`
- `Armoor`
- `Bodhan`
- `Nizamabad rural`
- `Other`

Empty area (`""`) means "All areas".

---

## 5. API Endpoints

| Method | Endpoint | Input | Output |
|--------|----------|-------|--------|
| GET | `/health` | — | `{ status, time }` |
| GET | `/health/db` | — | DB connection status |
| POST | `/requests` | `name, phone, address, details?, service_slug` | `{ ok, request_id }` |
| GET | `/requests?phone=...` | `phone` (query) | List of requests for that phone |
| POST | `/providers` | `name, phone, category_slug, area` | `{ ok, provider_id }` |
| GET | `/providers/{category_slug}?area=...` | `category_slug`, optional `area` | List of providers (ordered by rating) |
| GET | `/analytics` | — | Aggregate stats for Insight board |

---

## 6. Database (Supabase)

**Table: `public.requests`**
- `id` (uuid), `name`, `phone`, `address`, `details`, `service_slug`, `status` (default `'pending'`), `created_at`
- RLS: service_role only

**Table: `public.providers`**
- `id`, `name`, `phone`, `category_slug`, `area`, `rating`, `rating_count`, `verified`, `created_at`
- RLS: service_role only

Schema: `supabase/schema.sql`.

---

## 7. User Flows

1. **Home** – Browse 13 service categories; select area in header; language toggle (EN/TE).
2. **Request flow** – Pick category → see providers (filtered by area) → submit request form → POST `/requests`.
3. **Provider contact** – List providers → click provider → call / WhatsApp (external).
4. **Register provider** – Menu → Register as provider → form → POST `/providers`.
5. **My Requests** – Enter phone → GET `/requests?phone=...` → list of requests.
6. **Support** – WhatsApp, Email, Facebook links.
7. **Insight** – Analytics dashboard (requests per day, totals, goals).

---

## 8. Frontend Structure

- **Pages:** Home, Request, ProviderContact, RegisterProvider, MyRequests, Support, Insight, Menu, Auth
- **Context:** `AreaContext` (area + localStorage key `nizamabad-services-area`)
- **i18n:** English / Telugu (`nizamabad-services-lang`)
- **Data:** `src/data/services.ts` (SERVICES array), `src/data/constants.ts` (AREAS, APP_NAME, etc.)
- **API client:** `src/api/client.ts` – health, createRequest, listRequests, createProvider, listProviders, getAnalytics

---

## 9. Environment

**Root `.env`:**
- `VITE_API_URL` (e.g. `http://localhost:8000`)
- Optional: `VITE_WHATSAPP_NUMBER`, `VITE_SUPPORT_EMAIL`, `VITE_FACEBOOK_URL`, etc.

**`backend/.env`:**
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

---

## 10. Design Notes

- Responsive, mobile-first.
- Language toggle EN/TE on all pages.
- Area selector in header affects provider listing.
- No login/auth; phone lookup for My Requests.
- Support via WhatsApp / Email / Facebook.

---

## 11. Commands

```bash
# Frontend
npm install && npm run dev

# Backend
cd backend && pip install -r requirements.txt && uvicorn main:app --reload

# Tests
npm run test                    # Frontend (Vitest)
cd backend && pytest tests/ -v  # Backend
```

---

*Use this prompt to get quick context on business rules, API, data model, and structure when editing the Nizamabad Services codebase.*
