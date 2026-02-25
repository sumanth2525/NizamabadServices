# How to run Nizamabad Services

## Frontend only (no backend)

1. **Open terminal** in the project folder: `C:\Users\suman\OneDrive\Desktop\NzbServices`

2. **Install dependencies** (first time only):
   ```bash
   npm install
   ```

3. **Start the app**:
   ```bash
   npm run dev
   ```

4. **Open in browser:**  
   If it doesn’t open automatically, go to **http://localhost:5173**  
   (If 5173 is in use, check the terminal for the port, e.g. http://localhost:5174 or 5175.)

---

## If something goes wrong

### "npm is not recognized" or "command not found"
- Install Node.js from https://nodejs.org (LTS) and restart the terminal.

### "Cannot find module" or build errors
- Run `npm install` again in the project folder.
- Delete `node_modules` and run `npm install` again:
  ```powershell
  Remove-Item -Recurse -Force node_modules
  npm install
  npm run dev
  ```

### Blank white page in browser
- Open DevTools (F12) → **Console** and note any red errors.
- Ensure you’re opening the URL shown in the terminal (e.g. http://localhost:5173).

### Port already in use
- Vite will try the next port (5174, 5175, …). Use the URL printed in the terminal.

---

## With backend (optional)

To use “My Requests”, provider list, and provider registration:

1. Set up Supabase (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)).
2. In `backend` folder: copy `.env.example` to `.env`, set Supabase keys, then:
   ```bash
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
3. In project root: create `.env` with `VITE_API_URL=http://localhost:8000`.
4. Run frontend: `npm run dev`.
