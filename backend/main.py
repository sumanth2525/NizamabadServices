from datetime import datetime, timezone
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware

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
