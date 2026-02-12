"use client";

// Client-side auth session helpers using cookies

import Cookies from "js-cookie";

/* ========== SAVE AUTH (LOGIN) ========== */

// Persist auth data after successful login
export function setAuthCookie(token, identity, type) {
  Cookies.set("auth_token", token, { expires: 7 });
  Cookies.set("auth_identity", JSON.stringify(identity), { expires: 7 });
  Cookies.set("auth_type", type, { expires: 7 });
}

/* ========== GET AUTH ========== */

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

/* ========== OLD NAMES (VERY IMPORTANT) ========== */

// Backward-compatible auth accessor
export function getAuthFromSession() {
  return getAuthSession();
}

// Check if user is logged in
export function isUserLoggedIn() {
  return !!Cookies.get("auth_token");
}

/* ========== LOGOUT ========== */

// Clear all auth-related cookies
export function clearAuthSession() {
  Cookies.remove("auth_token");
  Cookies.remove("auth_identity");
  Cookies.remove("auth_type");
}
