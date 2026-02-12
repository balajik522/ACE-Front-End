// Axios instance for authenticated (private) API requests

import axios from "axios";
import { getAuthToken, clearAuthSession } from "./auth";

// Configure Axios for private APIs with auth support
const apiPrivate = axios.create({
  // Use direct API URL on server, proxy on client
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_URL
      : "/api/proxy",
  withCredentials: true, // Enable cookies if backend requires them
});

/* ================= REQUEST INTERCEPTOR ================= */

// Attach JWT token to every outgoing request
apiPrivate.interceptors.request.use(
  (config) => {
    // Get auth token from session
    const token = getAuthToken();

    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE INTERCEPTOR ================= */

// Handle auth errors globally
apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    // On unauthorized, clear session and redirect
    if (status === 401 && typeof window !== "undefined") {
      await clearAuthSession();
      window.location.href = "/unauthorized";
    }

    return Promise.reject(error);
  },
);

export default apiPrivate;
