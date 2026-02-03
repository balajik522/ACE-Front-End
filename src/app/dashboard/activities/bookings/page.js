/**
 * BookingEventsPage - Displays user's booked/saved events with pagination
 */

"use client";

import { useEffect, useState } from "react";
import styles from "./Booking.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Context providers for managing global loading state
import { useLoading } from "../../../../context/LoadingContext";

// Icon components for displaying event metadata
import {
  COLOR_SAVED_ICON,
  DATEICON,
  LOCATION_ICON,
  TICKET_ICON,
  VIEW_ICON,
} from "../../../../const-value/config-icons/page";

// API functions for fetching user data
import { getSavedEventsApi } from "../../../../lib/api/auth.api";

// 🔐 SESSION AUTH
import {
  getAuthFromSession,
  isUserLoggedIn,
} from "../../../../lib/auth";

/**
 * Configuration constant for pagination
 * Determines how many events are displayed per page
 */
const PAGE_SIZE = 6;

// Booked events page component
export default function BookingEventsPage() {
  // Context and router hooks
  const { setLoading } = useLoading();
  const router = useRouter();

  // Event data state
  const [events, setEvents] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Authentication state
  const [auth, setAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Effect: Initialize page and check authentication status
  */
  useEffect(() => {
    // Disable global loading spinner for this page
    setLoading(false);

    // Check user login status
    const loggedIn = isUserLoggedIn();
    setIsLoggedIn(loggedIn);

    // Retrieve session auth data if user is logged in
    if (loggedIn) {
      setAuth(getAuthFromSession());
    }
  }, []);

  /* ================= LOAD BOOKED EVENTS ================= */
  const loadEvents = async () => {
    try {
      setLocalLoading(true);

      // Validate user is authenticated with valid identity
      if (!isLoggedIn || !auth?.identity) {
        setEvents([]);
        return;
      }

      // Fetch saved events from API
      const res = await getSavedEventsApi(auth.identity);

      // Handle successful response
      if (res?.status) {
        setEvents(res.data?.events || []);
      } else {
        // Handle API error response
        toast.error(res?.message || "Failed to load booked events");
        setEvents([]);
      }
    } catch {
      toast.error("Something went wrong");
      setEvents([]);
    } finally {
      // Always stop local loading indicator
      setLocalLoading(false);
    }
  };

  /**
   * Effect: Load events when authentication state changes
   */
  useEffect(() => {
    loadEvents();
  }, [isLoggedIn, auth?.identity]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(events.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visibleEvents = events.slice(start, start + PAGE_SIZE);

  // ==========================================================================
  // RENDER STATES
  // ==========================================================================

  /**
   * Renders loading state while events are being fetched
   * Displays a centered message indicating data is loading
   */
  if (localLoading) {
    return (
      <div className={styles.wrapper}>
        <p className="text-center mt-5">Loading booked events...</p>
      </div>
    );
  }

  /**
   * Renders empty state when user has no booked events
   * Displays an illustration and call-to-action to explore events
   */
  if (!events.length) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.emptyState}>
          <img src="/images/no-event-image.png" alt="No Events" />
          <h3>No Booked Events</h3>
          <p>You haven’t booked any events yet</p>
          <button onClick={() => router.push("/events")}>
            Explore Events
          </button>
        </div>
      </div>
    );
  }

  /**
   * Renders the main events grid with pagination
   */
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Booked Events</h2>

      {/* Events Grid */}
      <div className={styles.grid}>
        {visibleEvents.map((e) => (
          <div
            key={e.identity}
            className={styles.card}
            onClick={() => router.push(`/events/${e.slug}`)}
          >
            {/* Event Banner Image */}
            <div className={styles.imageWrap}>
              <img
                src={e.bannerImages?.[0] || "/images/event.png"}
                alt={e.title}
              />
              {/* Offer badge for events with promotions */}
              {e.offers && (
                <span className={styles.offer}>Offers</span>
              )}
            </div>

            {/* Event Details */}
            <div className={styles.content}>
              {/* Title and save status */}
              <div className={styles.topcontent}>
                <h4 title={e.title}>{e.title}</h4>
                <div>{COLOR_SAVED_ICON}</div>
              </div>

              {/* Location and ticket price metadata */}
              <div className={styles.meta}>
                <span>
                  {LOCATION_ICON} {e.location?.city || "N/A"}
                </span>
                <span>
                  {TICKET_ICON} {e.tickets?.[0]?.price || "Free"}
                </span>
              </div>

              {/* Date and view count footer */}
              <div className={styles.bottom}>
                <span>
                  {DATEICON}{" "}
                  {new Date(
                    e.calendars?.[0]?.startDate || e.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <span className={styles.badge}>
                  <div>{VIEW_ICON}</div>
                  <div>{e.viewCount || "0"}</div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {/* Previous page button - disabled on first page */}
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          {/* Page number buttons */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? styles.active : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* Next page button - disabled on last page */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

