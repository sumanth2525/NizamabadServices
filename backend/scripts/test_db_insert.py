#!/usr/bin/env python3
"""
Test Supabase by inserting a test row, then reading it back.
Run from backend/:  python scripts/test_db_insert.py
"""
import os
import sys

backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)
os.chdir(backend_dir)

from dotenv import load_dotenv
load_dotenv()

def main():
    print("Testing Supabase: insert + read...")
    url = os.environ.get("SUPABASE_URL", "")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "") or os.environ.get("SUPABASE_KEY", "")

    if not url or not key:
        print("FAIL: Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env")
        return 1

    try:
        from supabase_client import get_supabase
        supabase = get_supabase()

        # 1. Insert into requests
        test_request = {
            "name": "Test User (delete me)",
            "phone": "9999999999",
            "address": "Test address for DB check",
            "details": "Inserted by scripts/test_db_insert.py",
            "service_slug": "plumbing",
            "status": "pending",
        }
        r = supabase.table("requests").insert(test_request).execute()
        if not r.data or len(r.data) == 0:
            print("FAIL: Insert returned no data")
            return 1
        request_id = r.data[0]["id"]
        print(f"  Inserted into 'requests', id: {request_id}")

        # 2. Read it back
        check = supabase.table("requests").select("*").eq("id", request_id).execute()
        if not check.data or len(check.data) == 0:
            print("FAIL: Could not read back the inserted row")
            return 1
        row = check.data[0]
        assert row["name"] == test_request["name"]
        assert row["phone"] == test_request["phone"]
        print(f"  Read back: name={row['name']}, phone={row['phone']}")

        # 3. Insert into providers
        test_provider = {
            "name": "Test Provider (delete me)",
            "phone": "8888888888",
            "category_slug": "plumbing",
            "area": "Nizamabad city",
            "rating": 0,
            "rating_count": 0,
            "verified": False,
        }
        p = supabase.table("providers").insert(test_provider).execute()
        if not p.data or len(p.data) == 0:
            print("FAIL: Provider insert returned no data")
            return 1
        provider_id = p.data[0]["id"]
        print(f"  Inserted into 'providers', id: {provider_id}")

        print("OK: Insert and read succeeded. Database connection is working.")
        print("  You can delete the test rows in Supabase Dashboard (Table Editor).")
        return 0
    except Exception as e:
        err = str(e)
        if "row-level security" in err.lower() or "42501" in err:
            print(f"FAIL: {e}")
            print("  Fix: In backend/.env use the SERVICE_ROLE key (not the anon key).")
            print("  Supabase Dashboard -> Settings -> API -> project API keys -> service_role (secret).")
        else:
            print(f"FAIL: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
