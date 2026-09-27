# Saad Elmilouay — Portfolio

A two-part portfolio site: a React + Material UI frontend, and a FastAPI
backend that serves your content as JSON. To update your resume, projects,
or stats, edit `backend/main.py` — the frontend re-fetches automatically.

If the backend isn't running, the frontend falls back to a local copy of
the same data (`frontend/src/data/fallbackData.js`), so it never breaks.

**Interactive features:**
- **Custom cursor** — a small dot with a trailing ring that expands over
  links and buttons. Automatically disabled on touch devices, and skips
  the smoothing animation if the visitor has "reduce motion" set.
- **Side-pin navigation** — dots on the right edge of the screen track
  which section is in view and jump to any section on click.
- **Scroll animations** — sections fade/slide in as you scroll to them,
  again respecting "reduce motion".
- **Dark mode** — follows the visitor's OS setting by default, with a
  manual toggle (moon/sun icon, top right) that's remembered on their
  next visit via `localStorage`.

## Project structure

```
portfolio-app/
├── backend/
│   ├── main.py           # FastAPI app + all portfolio content
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── theme.js       # MUI theme (colors, type)
        ├── api.js         # fetches from the backend
        ├── data/fallbackData.js
        └── components/    # Nav, Hero, Projects, Experience, Skills, Footer
```

## Run it locally

**1. Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at http://localhost:8000 — check http://localhost:8000/docs for the
interactive API explorer.

**2. Frontend**

```bash
cd frontend
npm install
cp .env.example .env   # points the frontend at localhost:8000
npm run dev
```

Runs at http://localhost:5173.

## Deploying it for real

- **Backend**: Render, Railway, or Fly.io all support FastAPI directly —
  point them at `backend/`, start command `uvicorn main:app --host 0.0.0.0 --port $PORT`.
- **Frontend**: Vercel or Netlify — point them at `frontend/`, build
  command `npm run build`, output directory `dist`. Set the environment
  variable `VITE_API_URL` to your deployed backend's URL.
- Once deployed, update `allow_origins` in `backend/main.py` from `"*"` to
  your actual frontend domain, for security.

## Editing your content

Everything on the page — name, tagline, projects, stats, experience,
skills — lives in one place: `backend/main.py`, in the `PORTFOLIO_DATA`
object. Change it there and both the API and the site update.
