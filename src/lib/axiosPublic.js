import axios from "axios";

// ============================================
// PUBLIC API CLIENT
// Axios instance for unauthenticated requests
// ============================================

const apiPublic = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_URL
      : "/api/proxy",
  withCredentials: false,
});

export default apiPublic;
