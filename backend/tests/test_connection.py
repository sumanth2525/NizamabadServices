"""
Connection tests: API health and endpoints with mocked Supabase (no real DB).
Run with: pytest tests/test_connection.py -v
"""
import pytest
from fastapi.testclient import TestClient


def test_health_returns_ok_and_time(client: TestClient):
    """GET /health returns 200 with status and time (no DB connection)."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "time" in data


def test_health_connection_no_db_required():
    """Health endpoint works without Supabase (app load may still import get_supabase)."""
    from main import app
    c = TestClient(app)
    r = c.get("/health")
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


def test_requests_list_connection(client: TestClient):
    """GET /requests?phone=... returns 200 and array (mocked DB)."""
    response = client.get("/requests", params={"phone": "9876543210"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_providers_list_connection(client: TestClient):
    """GET /providers/{slug} returns 200 and array (mocked DB)."""
    response = client.get("/providers/plumbing")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_providers_list_with_area_param(client: TestClient):
    """GET /providers/{slug}?area=... returns 200 (mocked DB)."""
    response = client.get("/providers/electrician", params={"area": "Nizamabad city"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_request_connection(client: TestClient):
    """POST /requests with valid body returns 200 and request_id (mocked DB)."""
    response = client.post(
        "/requests",
        json={
            "name": "Test User",
            "phone": "9876543210",
            "address": "Test Address",
            "service_slug": "plumbing",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data.get("ok") is True
    assert "request_id" in data


def test_create_provider_connection(client: TestClient):
    """POST /providers with valid body returns 200 and provider_id (mocked DB)."""
    response = client.post(
        "/providers",
        json={
            "name": "Test Provider",
            "phone": "9876543210",
            "category_slug": "plumbing",
            "area": "Nizamabad city",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data.get("ok") is True
    assert "provider_id" in data


def test_create_request_validation_fails_without_phone(client: TestClient):
    """POST /requests with missing phone returns 422."""
    response = client.post(
        "/requests",
        json={
            "name": "Test",
            "address": "Address",
            "service_slug": "plumbing",
        },
    )
    assert response.status_code == 422


def test_requests_list_requires_phone(client: TestClient):
    """GET /requests without phone returns 422."""
    response = client.get("/requests")
    assert response.status_code == 422


def test_health_db_returns_connected_when_mock_works(client: TestClient):
    """GET /health/db returns 200 and database connected when Supabase is available (mocked)."""
    response = client.get("/health/db")
    assert response.status_code == 200
    data = response.json()
    assert data.get("status") == "ok"
    assert data.get("database") == "connected"
