const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Fetches portfolio content from the FastAPI backend.
// Returns null on failure so the caller can fall back to local data —
// keeps the site usable even if the backend isn't running.
export async function fetchPortfolio() {
  try {
    const res = await fetch(`${API_URL}/api/portfolio`);
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Portfolio API unavailable, using local fallback data.", err);
    return null;
  }
}
