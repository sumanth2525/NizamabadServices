#!/usr/bin/env python3
"""
Test inserting one provider into Supabase. Run from backend/:  python scripts/test_provider_insert.py
"""
import os
import sys

backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)
os.chdir(backend_dir)

from dotenv import load_dotenv
load_dotenv()


def main():
    print("Test: insert one provider...")
    url = os.environ.get("SUPABASE_URL", "")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "") or os.environ.get("SUPABASE_KEY", "")

    if not url or not key:
        print("FAIL: Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env")
        return 1

    try:
        from supabase_client import get_supabase
        supabase = get_supabase()

        test_provider = {
            "name": "Test Provider (delete me)",
            "phone": "8888888888",
            "category_slug": "plumbing",
            "area": "Nizamabad city",
            "rating": 0,
            "rating_count": 0,
            "verified": False,
        }
        r = supabase.table("providers").insert(test_provider).execute()
        if not r.data or len(r.data) == 0:
            print("FAIL: Insert returned no data")
            return 1

        row = r.data[0]
        provider_id = row["id"]
        print(f"  Inserted provider id: {provider_id}")
        print(f"  name={row['name']}, phone={row['phone']}, category_slug={row['category_slug']}, area={row['area']}")

        # Read it back
        check = supabase.table("providers").select("*").eq("id", provider_id).execute()
        if not check.data or len(check.data) == 0:
            print("FAIL: Could not read back the inserted provider")
            return 1
        print("  Read back: OK")

        print("-" * 40)
        print("OK: Provider insert works. You can delete the test row in Supabase Table Editor (providers).")
        return 0
    except Exception as e:
        err = str(e)
        if "row-level security" in err.lower() or "42501" in err:
            print(f"FAIL: {e}")
            print("  Fix: In backend/.env use the SERVICE_ROLE key (not the anon key).")
            print("  Supabase Dashboard -> Settings -> API -> service_role (secret).")
        else:
            print(f"FAIL: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
