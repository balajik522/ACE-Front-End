// Public Axios instance for unauthenticated API requests

import axios from "axios";

// Configure Axios for public (non-auth) API calls
const apiPublic = axios.create({
  // Use direct API URL on server, proxy route on client
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_URL
      : "/api/proxy",
  withCredentials: false, // No cookies sent for public requests
});

export default apiPublic;
