import axios from "axios";
import { getAuthToken, clearAuthSession } from "./auth";

// ============================================
// PRIVATE API CLIENT
// Axios instance with auth token and interceptors
// ============================================

const apiPrivate = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_URL
      : "/api/proxy",
  withCredentials: true, // Enable cookie-based authentication
});

/* ================= REQUEST INTERCEPTOR ================= */
apiPrivate.interceptors.request.use(
  (config) => {
    // Retrieve JWT token from session storage
    const token = getAuthToken();

    // Add Bearer token to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE INTERCEPTOR ================= */
apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401 && typeof window !== "undefined") {
      // Clear session and redirect to unauthorized page
      await clearAuthSession();
      window.location.href = "/unauthorized";
    }

    return Promise.reject(error);
  },
);

export default apiPrivate;
