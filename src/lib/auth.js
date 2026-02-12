// Authentication session management using browser cookies

import Cookies from "js-cookie";

// Store auth session cookies
export function setAuthCookie(token, identity, type) {
  Cookies.set("auth_token", token, { expires: 7 });
  Cookies.set("auth_identity", JSON.stringify(identity), { expires: 7 });
  Cookies.set("auth_type", type, { expires: 7 });
}

// Read current auth session from cookies
export function getAuthSession() {
  const token = Cookies.get("auth_token");
  const identity = Cookies.get("auth_identity");
  const type = Cookies.get("auth_type");

  return {
    token,
    identity: identity ? JSON.parse(identity) : null,
    type,
  };
}

// Clear all auth-related cookies
export function clearAuthSession() {
  Cookies.remove("auth_token");
  Cookies.remove("auth_identity");
  Cookies.remove("auth_type");
}

/* 👇 OLD + REQUIRED EXPORTS */

// Backward-compatible auth getter
export function getAuthFromSession() {
  return getAuthSession();
}

// Simple login check using auth token
export function isUserLoggedIn() {
  return !!Cookies.get("auth_token");
}

/* 👇 THIS FIXES AXIOS ERROR */

// Retrieve auth token for API headers
export function getAuthToken() {
  return Cookies.get("auth_token");
}
