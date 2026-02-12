import { jwtDecode } from "jwt-decode";

/**
 * Read a cookie value by name (client-side only)
 */
export function getCookie(name) {
  // Prevent access during SSR
  if (typeof document === "undefined") return null;

  // Find matching cookie entry
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

  // Decode and return value if found
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

/**
 * Decode and extract auth details from authToken cookie
 */
export function getAuthFromCookie() {
  try {
    // Read auth token from cookies
    const token = getCookie("authToken");
    if (!token) return null;

    // Decode JWT payload
    const decoded = jwtDecode(token);

    // Normalize and return auth data
    return {
      identity: decoded?.data?.identity || null,
      email: decoded?.data?.email || null,
      type: decoded?.data?.type || null, // "org" | "user"
      roleId: decoded?.data?.roleId || null,
      exp: decoded?.exp, // Token expiry
    };
  } catch (err) {
    // Handle invalid or expired token
    console.error("JWT decode failed", err);
    return null;
  }
}
