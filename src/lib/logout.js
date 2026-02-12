"use client";

// Client-side logout handler for users and organizers

export async function logoutUser() {
  try {
    // Call logout API to clear server-side session/cookies
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
  } finally {
    // Always clear client state and redirect to home
    sessionStorage.clear();
    window.location.href = "/";
  }
}

// Organizer logout uses the same logic
export const logoutOrganizer = logoutUser;
