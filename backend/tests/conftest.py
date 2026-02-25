"""
Pytest fixtures: mock Supabase so tests don't need real credentials.
"""
import pytest
from unittest.mock import MagicMock, patch


def make_mock_supabase():
    """Build a chainable mock for supabase.table().select().eq().order().execute() etc."""
    mock = MagicMock()

    # insert().execute() returns object with .data = [{"id": "..."}]
    insert_result = MagicMock()
    insert_result.data = [{"id": "test-id-123"}]
    mock.table.return_value.insert.return_value.execute.return_value = insert_result

    # select().eq().order().execute() for requests (list by phone)
    list_result = MagicMock()
    list_result.data = []
    eq_return = MagicMock()
    eq_return.order.return_value.execute.return_value = list_result
    eq_return.eq.return_value.order.return_value.execute.return_value = list_result
    mock.table.return_value.select.return_value.eq.return_value = eq_return

    return mock


@pytest.fixture
def mock_supabase():
    """Patch get_supabase to return a mock client (no real DB)."""
    mock = make_mock_supabase()
    with patch("main.get_supabase", return_value=mock):
        yield mock


@pytest.fixture
def client(mock_supabase):
    """FastAPI TestClient with mocked Supabase."""
    from fastapi.testclient import TestClient
    from main import app
    return TestClient(app)
