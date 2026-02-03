"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUserProfileApi } from "../../../lib/api/user.api";
import { getOrganizationProfileApi } from "../../../lib/api/organizer.api";

// Session-based authentication (no Redux)
import { getAuthFromSession, isUserLoggedIn } from "../../../lib/auth";

import "./Navbar.css";
import {
  EXPLORE_ICON,
  LOCATION_ICON,
} from "../../../const-value/config-icons/page";

/**
 * Navbar - Main navigation header component
 * Displays logo, search, location, create event button, and user profile
 */
export default function Navbar() {
  const router = useRouter();

  /* ================= SESSION AUTH STATE ================= */
  // Track login status and user authentication data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState(null);

  const [mounted, setMounted] = useState(false);
  const [initial, setInitial] = useState("U");
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= INITIAL MOUNT ================= */
  // Check authentication status on component mount
  useEffect(() => {
    setMounted(true);

    const loggedIn = isUserLoggedIn();
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const sessionAuth = getAuthFromSession();
      setAuth(sessionAuth);

      // Get first letter of email for avatar fallback
      if (sessionAuth?.email) {
        setInitial(sessionAuth.email.charAt(0).toUpperCase());
      }
    }
  }, []);

  /* =========================================
   LOAD PROFILE IMAGE
   Fetches and displays user/organizer profile image
   ========================================= */
  useEffect(() => {
    async function loadProfile() {
      if (!isLoggedIn || !auth?.identity || !auth?.type) return;

      try {
        let res;

        if (auth.type === "org") {
          // Load organization profile
          res = await getOrganizationProfileApi(auth.identity);
        } else {
          // Load user profile
          res = await getUserProfileApi(auth.identity);
        }

        if (res?.status && res.data) {
          // Extract image from various possible fields
          const image =
            res.data.profileImage ||
            res.data.logo ||
            res.data.bannerImages?.[0] ||
            null;

          if (image) {
            setProfileImage(image);
          }
        }
      } catch {
        // Handle errors gracefully - suppress errors to prevent navbar from breaking
      }
    }

    loadProfile();
  }, [isLoggedIn, auth]);

  // Prevent hydration mismatch
  if (!mounted) return null;

  /* ================= HANDLERS ================= */

  // Navigate to event creation or login based on auth status
  const handleCreateEventClick = () => {
    // not logged in
    if (!isLoggedIn) {
      router.push("/auth/organization/login");
      return;
    }

    // logged in but USER
    if (auth?.type === "user") {
      router.push("/auth/organization/login");
      return;
    }

    // logged in & ORGANIZER
    if (auth?.type === "org") {
      router.push("/dashboard/space/create");
      return;
    }

    // fallback
    router.push("/auth/organization/login");
  };

  const handleSignup = () => {
    setMenuOpen(false);
    router.push("/auth/user/login");
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    router.push("/dashboard");
  };

  /* ================= UI RENDER ================= */
  return (
    <nav className="nav-container">
      {/* LEFT - LOGO + EXPLORE BUTTON */}
      <div className="nav-left">
        <img
          src="/images/logo.png"
          alt="logo"
          className="nav-logo"
          onClick={() => router.push("/")}
        />
        <button className="nav-explore">Explore {EXPLORE_ICON}</button>
      </div>

      {/* CENTER - SEARCH + ACTIONS */}
      <div className="nav-center">
        <div className="nav-search-box">
          <input
            type="text"
            placeholder="Search anything"
            className="search-input"
          />
        </div>

        <button className="nav-location-btn">{LOCATION_ICON}</button>

        <button className="nav-create" onClick={handleCreateEventClick}>
          + Create Event
        </button>

        {!isLoggedIn && (
          <button className="nav-sinup" onClick={handleSignup}>
            Sign In
          </button>
        )}
      </div>

      {/* RIGHT - PROFILE AVATAR */}
      {isLoggedIn && (
        <div className={`nav-right ${menuOpen ? "open" : ""}`}>
          <button className="nav-avatar-btn" onClick={handleProfileClick}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="nav-profile-image"
                onError={() => setProfileImage(null)}
              />
            ) : (
              <div className="nav-letter-avatar">{initial}</div>
            )}
          </button>
        </div>
      )}

      {/* HAMBURGER MENU TOGGLE */}
      <button
        className={`nav-hamburger ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
}
