#!/usr/bin/env python3
"""
Test Supabase API keys: connection, URL format, and key type (service_role vs anon).
Run from backend/:  python scripts/test_supabase_keys.py
"""
import os
import re
import sys

backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)
os.chdir(backend_dir)

from dotenv import load_dotenv
load_dotenv()

SUPABASE_URL_PATTERN = re.compile(r"^https://[a-zA-Z0-9-]+\.supabase\.co/?$")


def main():
    print("Supabase API key check")
    print("-" * 40)

    url = (os.environ.get("SUPABASE_URL") or "").strip()
    key = (os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_KEY") or "").strip()

    # 1. Env vars present
    if not url:
        print("FAIL: SUPABASE_URL is missing in backend/.env")
        return 1
    if not key:
        print("FAIL: SUPABASE_SERVICE_ROLE_KEY is missing in backend/.env")
        print("  Use the 'service_role' (secret) key from Supabase → Settings → API.")
        return 1
    print("  SUPABASE_URL: set")
    print("  SUPABASE_SERVICE_ROLE_KEY: set")

    # 2. URL format
    if not SUPABASE_URL_PATTERN.match(url):
        print("WARN: SUPABASE_URL should look like https://xxxx.supabase.co")
    else:
        print("  URL format: ok")

    # 2b. Detect key type from JWT payload (anon vs service_role)
    try:
        import base64
        import json
        parts = key.split(".")
        if len(parts) >= 2:
            payload_b64 = parts[1]
            payload_b64 += "=" * (4 - len(payload_b64) % 4)
            payload = json.loads(base64.urlsafe_b64decode(payload_b64))
            role = payload.get("role") or payload.get("user_role") or "?"
            print(f"  Key role (from JWT): {role}")
            if role == "anon":
                print("  -> You are using the ANON key. Switch to service_role in Supabase -> Settings -> API.")
            elif role == "service_role":
                print("  -> Correct key type for backend (service_role).")
    except Exception:
        print("  Key role: (could not decode JWT)")

    # 3. Connection + read
    try:
        from supabase_client import get_supabase
        supabase = get_supabase()
        r = supabase.table("requests").select("id").limit(1).execute()
        print("  Connection: ok (table 'requests' reachable)")
    except RuntimeError as e:
        print(f"FAIL: {e}")
        return 1
    except Exception as e:
        err = str(e).lower()
        if "401" in err or "unauthorized" in err or "invalid" in err or "jwt" in err:
            print("FAIL: Invalid or expired API key. Check SUPABASE_SERVICE_ROLE_KEY in backend/.env")
        else:
            print(f"FAIL: Connection error: {e}")
        return 1

    # 4. Write test (distinguishes service_role vs anon)
    try:
        test_row = {
            "name": "Key test (delete me)",
            "phone": "0000000000",
            "address": "Key test",
            "service_slug": "plumbing",
            "status": "pending",
        }
        ins = supabase.table("requests").insert(test_row).execute()
        if not ins.data or len(ins.data) == 0:
            print("  Write test: no data returned (unexpected)")
        else:
            row_id = ins.data[0]["id"]
            supabase.table("requests").delete().eq("id", row_id).execute()
            print("  Write test: ok (insert + delete)")
        print("-" * 40)
        print("OK: API keys are valid. Using service_role (full access).")
        return 0
    except Exception as e:
        err = str(e)
        if "row-level security" in err.lower() or "42501" in err:
            print("  Write test: blocked by RLS")
            print("-" * 40)
            print("WARN: Connection works but INSERT is blocked.")
            print("  You are likely using the ANON key instead of the SERVICE_ROLE key.")
            print("  Supabase Dashboard -> Settings -> API -> use 'service_role' (secret), not 'anon'.")
            return 1
        print(f"  Write test failed: {e}")
        print("-" * 40)
        print("FAIL: Could not write to database.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
