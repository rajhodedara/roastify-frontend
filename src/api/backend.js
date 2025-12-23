const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function loginWithSpotify() {
  if (!BACKEND_URL) {
    console.error("VITE_BACKEND_URL is not defined");
    alert("Backend is not configured correctly.");
    return;
  }

  window.location.href = `${BACKEND_URL}/login`;
}
