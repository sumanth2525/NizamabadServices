from datetime import datetime, timezone
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from dotenv import load_dotenv
load_dotenv()

from supabase_client import get_supabase
from supabase import Client
from models import CreateRequestIn, CreateProviderIn


def notify_request_created(request_id: str, body: CreateRequestIn) -> None:
    """Optional: send email + WhatsApp to admin. Configure via SMTP/Twilio env vars."""
    # Placeholder: set NOTIFY_EMAIL, SMTP_* and optionally TWILIO_* in .env
    pass


def notify_provider_registered(provider_id: str, body: CreateProviderIn) -> None:
    """Optional: send email to admin."""
    pass


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    # cleanup if needed


app = FastAPI(title="Nizamabad Services API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def db() -> Client:
    return get_supabase()


@app.get("/health")
def health():
    return {"status": "ok", "time": datetime.now(tz=timezone.utc).isoformat()}


@app.get("/health/db")
def health_db():
    """Test database (Supabase) connection. Returns 200 if connected, 503 otherwise."""
    try:
        supabase = get_supabase()
        supabase.table("requests").select("id").limit(1).execute()
        return {"status": "ok", "database": "connected"}
    except RuntimeError as e:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "error", "database": "not_configured", "detail": str(e)},
        )
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "error", "database": "connection_failed", "detail": str(e)},
        )


@app.post("/requests")
def create_request(body: CreateRequestIn, supabase: Client = Depends(db)):
    row = {
        "name": body.name,
        "phone": body.phone,
        "address": body.address,
        "details": body.details or "",
        "service_slug": body.service_slug,
        "status": "pending",
    }
    try:
        r = supabase.table("requests").insert(row).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    data = r.data
    if not data:
        raise HTTPException(status_code=500, detail="Insert failed")
    request_id = data[0].get("id")
    notify_request_created(str(request_id), body)
    return {"ok": True, "request_id": request_id}


@app.get("/requests")
def list_requests(phone: str = Query(..., min_length=10), supabase: Client = Depends(db)):
    try:
        r = supabase.table("requests").select("*").eq("phone", phone).order("created_at", desc=True).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return r.data or []


@app.post("/providers")
def create_provider(body: CreateProviderIn, supabase: Client = Depends(db)):
    row = {
        "name": body.name,
        "phone": body.phone,
        "category_slug": body.category_slug,
        "area": body.area,
        "rating": 0,
        "rating_count": 0,
        "verified": False,
    }
    try:
        r = supabase.table("providers").insert(row).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    data = r.data
    if not data:
        raise HTTPException(status_code=500, detail="Insert failed")
    provider_id = data[0].get("id")
    notify_provider_registered(str(provider_id), body)
    return {"ok": True, "provider_id": provider_id}


@app.get("/providers/{category_slug}")
def list_providers(
    category_slug: str,
    area: str | None = Query(None, description="Filter providers by area (e.g. Nizamabad city, Armoor)"),
    supabase: Client = Depends(db),
):
    try:
        q = (
            supabase.table("providers")
            .select("id, name, phone, category_slug, area, rating, rating_count, verified, created_at")
            .eq("category_slug", category_slug)
        )
        if area and area.strip():
            q = q.eq("area", area.strip())
        r = q.order("rating", desc=True).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return r.data or []


@app.get("/analytics")
def get_analytics(supabase: Client = Depends(db)):
    """
    Aggregate analytics from Supabase for the Insight board.
    Returns: requests_per_day (this week), total_requests, total_providers,
             last_week_requests, daily_goals (last 7 days with request count per day).
    """
    from datetime import timedelta

    now = datetime.now(tz=timezone.utc)
    # Week starts on Sunday
    today = now.date()
    start_this_week = today - timedelta(days=(today.weekday() + 1) % 7)
    end_this_week = start_this_week + timedelta(days=7)
    start_last_week = start_this_week - timedelta(days=7)

    try:
        # All requests for this week + last week + last 7 days (we'll filter in code)
        r = (
            supabase.table("requests")
            .select("id, created_at")
            .gte("created_at", start_last_week.isoformat())
            .lt("created_at", end_this_week.isoformat())
            .execute()
        )
        requests = r.data or []

        # Requests per day this week (Sun=0 .. Sat=6)
        per_day = [0] * 7
        for row in requests:
            created = row.get("created_at")
            if not created:
                continue
            try:
                dt = datetime.fromisoformat(created.replace("Z", "+00:00")).date()
            except Exception:
                continue
            if start_this_week <= dt < end_this_week:
                idx = (dt - start_this_week).days
                if 0 <= idx < 7:
                    per_day[idx] += 1

        # Last 7 days for "daily goals" (which days had at least one request)
        days_with_requests = [False] * 7
        for i in range(7):
            d = today - timedelta(days=6 - i)
            for row in requests:
                created = row.get("created_at")
                if not created:
                    continue
                try:
                    dt = datetime.fromisoformat(created.replace("Z", "+00:00")).date()
                except Exception:
                    continue
                if dt == d:
                    days_with_requests[i] = True
                    break
        goals_done = sum(1 for x in days_with_requests if x)
        goals_total = 7

        # Last week total count
        last_week_count = 0
        for row in requests:
            created = row.get("created_at")
            if not created:
                continue
            try:
                dt = datetime.fromisoformat(created.replace("Z", "+00:00")).date()
            except Exception:
                continue
            if start_last_week <= dt < start_this_week:
                last_week_count += 1

        # Total requests and total providers (all time)
        r_all = supabase.table("requests").select("id").execute()
        total_requests = len(r_all.data or [])
        p_all = supabase.table("providers").select("id").execute()
        total_providers = len(p_all.data or [])

        return {
            "requests_per_day": per_day,
            "total_requests": total_requests,
            "total_providers": total_providers,
            "last_week_requests": last_week_count,
            "goals_done": goals_done,
            "goals_total": goals_total,
            "days_with_requests": days_with_requests,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
