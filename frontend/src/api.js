// Fetches portfolio content from the FastAPI backend.
// In dev, Vite's proxy forwards /api/* to http://localhost:8000.
// In production, Vercel routes /api/* to the Python function.
// Returns null on failure so the caller can fall back to local data.
export async function fetchPortfolio() {
  try {
    const res = await fetch("/api/portfolio");
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Portfolio API unavailable, using local fallback data.", err);
    return null;
  }
}