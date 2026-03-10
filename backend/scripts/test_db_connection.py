#!/usr/bin/env python3
"""
Test Supabase database connection. Run from project root or backend:
  python backend/scripts/test_db_connection.py
  or from backend/:  python scripts/test_db_connection.py
"""
import os
import sys

# Ensure backend is on path and load .env from backend/
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)
os.chdir(backend_dir)

from dotenv import load_dotenv
load_dotenv()

def main():
    print("Testing Supabase connection...")
    url = os.environ.get("SUPABASE_URL", "")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "") or os.environ.get("SUPABASE_KEY", "")

    if not url or not key:
        print("FAIL: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env")
        print("  Copy backend/.env.example to backend/.env and add your Supabase credentials.")
        return 1

    try:
        from supabase_client import get_supabase
        supabase = get_supabase()
        # Simple query to verify connection and that tables exist
        r = supabase.table("requests").select("id").limit(1).execute()
        print("OK: Database connected. Table 'requests' is reachable.")
        return 0
    except Exception as e:
        print(f"FAIL: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
