"use client";

// ============================================
// LOGOUT FUNCTIONS
// Clears session and redirects to home
// ============================================

export async function logoutUser() {
  try {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
  } finally {
    sessionStorage.clear();
    window.location.href = "/";
  }
}

export const logoutOrganizer = logoutUser;
