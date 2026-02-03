"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  DATEICON,
  HEART_ICON,
  LOCATION_ICON,
  SAVEICON,
  TICKET_ICON,
  VIEW_ICON,
} from "../../../const-value/config-icons/page";

import "./EventSlider.css";
import { useLoading } from "../../../context/LoadingContext";

import { likeEventApi, saveEventApi } from "../../../lib/api/event.api";

/* =========================================
   SESSION AUTHENTICATION
   Manages user authentication state for event interactions
   ========================================= */
import { getAuthFromSession, isUserLoggedIn } from "../../../lib/auth";

/**
 * EventSlider - Horizontal scrollable event cards component
 * Displays events with like, save, and navigation functionality
 */

/* ================= HELPER ================= */
// Helper function to get the lowest ticket price from event tickets
const getLowestTicketPrice = (tickets = []) => {
  if (!Array.isArray(tickets) || tickets.length === 0) return null;

  const prices = tickets
    .filter((t) => typeof t.price === "number")
    .map((t) => t.price);

  return prices.length ? Math.min(...prices) : null;
};

export default function EventSlider({
  title,
  data = [],
  des,
  loading = false,
}) {
  const router = useRouter();
  const sliderRef = useRef(null);
  const { setLoading } = useLoading();

  /* ================= AUTH (SESSION) ================= */
  // Check user authentication status on component mount
  const [auth, setAuth] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const ok = isUserLoggedIn();
    setLoggedIn(ok);

    if (ok) {
      setAuth(getAuthFromSession());
    }
  }, []);

  /* ================= STATE ================= */
  // Track liked/saved events and their like counts
  const [likedCards, setLikedCards] = useState({});
  const [savedCards, setSavedCards] = useState({});
  const [likeCounts, setLikeCounts] = useState({});

  /* ================= INIT FROM API DATA ================= */
  // Initialize state from incoming event data
  useEffect(() => {
    const liked = {};
    const saved = {};
    const counts = {};

    data.forEach((event) => {
      liked[event.identity] = Boolean(event.isLiked);
      saved[event.identity] = Boolean(event.isSaved);
      counts[event.identity] = event.likeCount || 0;
    });

    setLikedCards(liked);
    setSavedCards(saved);
    setLikeCounts(counts);
  }, [data]);

  /* ================= LIKE ================= */
  const handleLike = async (event) => {
    if (!loggedIn || !auth?.identity) {
      toast("Please login to like events", {
        icon: "⚠️",
      });
      return;
    }

    const eventId = event.identity;
    const wasLiked = likedCards[eventId];

    setLikedCards((prev) => ({
      ...prev,
      [eventId]: !wasLiked,
    }));

    setLikeCounts((prev) => ({
      ...prev,
      [eventId]: wasLiked ? (prev[eventId] || 1) - 1 : (prev[eventId] || 0) + 1,
    }));

    const res = await likeEventApi({
      eventIdentity: eventId,
      userIdentity: auth.identity,
    });

    if (!res?.status) {
      // rollback
      setLikedCards((prev) => ({
        ...prev,
        [eventId]: wasLiked,
      }));

      setLikeCounts((prev) => ({
        ...prev,
        [eventId]: prev[eventId],
      }));

      toast.error("Failed to update like");
    }
  };

  /* ================= SAVE ================= */
  const handleSave = async (event) => {
    if (!loggedIn || !auth?.identity) {
      toast("Please login to save events", {
        icon: "⚠️",
      });
      return;
    }

    const eventId = event.identity;
    const wasSaved = savedCards[eventId];

    setSavedCards((prev) => ({
      ...prev,
      [eventId]: !wasSaved,
    }));

    const res = await saveEventApi({
      eventIdentity: eventId,
      userIdentity: auth.identity,
    });

    if (!res?.status) {
      // rollback
      setSavedCards((prev) => ({
        ...prev,
        [eventId]: wasSaved,
      }));

      toast.error("Failed to save event");
    }
  };

  /* ================= SLIDER ================= */
  // Slider navigation handlers
  const slideLeft = () => {
    sliderRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const slideRight = () => {
    sliderRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  const handleClick = (slug) => {
    setLoading(true);
    router.push(`/events/${slug}`);
  };

  const handleCardClick = () => {
    router.push(`/events`);
  };

  /* ================= FORMATTERS ================= */
  // Format date to Indian locale format
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getModeClass = (mode) => {
    if (!mode) return "online";

    switch (mode.toUpperCase()) {
      case "ONLINE":
        return "online";
      case "OFFLINE":
        return "offline";
      case "HYBRID":
        return "hybrid";
      default:
        return "online";
    }
  };

  /* ================= LOADING ================= */
  // Show loading state while fetching events
  if (loading) {
    return (
      <section className="container-fluid mt-4 px-5">
        <h5 className="fw-bold">{title}</h5>
        <p className="text-center py-5">Loading events...</p>
      </section>
    );
  }

  /* ================= EMPTY ================= */
  // Show empty state when no events available
  if (!loading && data.length === 0) {
    return (
      <section className="container-fluid mt-4 px-5">
        <h5 className="fw-bold">{title}</h5>
        <p className="text-center text-muted py-4">No events found</p>
      </section>
    );
  }

  /* ================= UI RENDER ================= */
  return (
    <section className="container-fluid mt-4 px-5">
      {/* SECTION HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h5 className="fw-bold mb-0 land-title">{title}</h5>
          {des && <p className="mt-2">{des}</p>}
        </div>
        <button className="see-all-btn" onClick={handleCardClick}>
          See all
        </button>
      </div>

      <hr />

      {/* SLIDER NAVIGATION */}
      <div className="d-flex justify-content-end gap-4 mb-3">
        <button className="scroll-rounded-circle" onClick={slideLeft}>
          ❮
        </button>
        <button className="scroll-rounded-circle" onClick={slideRight}>
          ❯
        </button>
      </div>

      {/* EVENT CARDS SLIDER */}
      <div
        className="d-flex gap-3 overflow-hidden"
        ref={sliderRef}
        style={{ scrollBehavior: "smooth" }}
      >
        {data.map((event) => {
          const calendar = event.calendars?.[0];
          const isLiked = likedCards[event.identity];
          const isSaved = savedCards[event.identity];
          const lowestPrice = getLowestTicketPrice(event.tickets);

          return (
            <div key={event.identity} className="card event-card">
              {/* EVENT BANNER IMAGE */}
              <img
                src={event.bannerImages?.[0] || "/images/event.png"}
                className="event-img"
                alt={event.title}
                onClick={() => handleClick(event.slug)}
              />

              {/* EVENT DETAILS */}
              <div className="card-body p-3">
                {/* TITLE, SAVE, LIKE */}
                <div className="d-flex justify-content-between align-items-start mt-2">
                  <span className="fw-semibold card-titel">{event.title}</span>

                  {/* SAVE BUTTON */}
                  <span onClick={() => handleSave(event)}>
                    <SAVEICON active={isSaved} />
                  </span>

                  {/* LIKE BUTTON */}
                  <div
                    onClick={() => handleLike(event)}
                    className="text-center"
                  >
                    <HEART_ICON active={isLiked} />
                    <p>{likeCounts[event.identity] ?? 0}</p>
                  </div>
                </div>

                {/* EVENT METADATA */}
                <div className="mt-2 event-details">
                  {/* Location + Ticket Price */}
                  <div className="d-flex justify-content-between">
                    <span>
                      <span>
                        {LOCATION_ICON}{" "}
                        {event.location?.city ||
                          event.org?.city ||
                          (event.mode === "ONLINE" ? "Online Event" : "N/A")}
                      </span>
                    </span>

                    <span>
                      {TICKET_ICON}{" "}
                      {lowestPrice === null
                        ? "N/A"
                        : lowestPrice === 0
                          ? "Free"
                          : `₹${lowestPrice}`}
                    </span>
                  </div>

                  {/* Date + Event Mode */}
                  <div className="mt-2 d-flex justify-content-between align-items-center">
                    <span>
                      {DATEICON} {formatDate(calendar?.startDate)}
                    </span>

                    <span className={`mode-text ${getModeClass(event.mode)}`}>
                      <span className="mode-dot"></span>
                      {event.mode || "ONLINE"}
                    </span>
                  </div>
                </div>

                {/* FOOTER - Views + Category */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="view-badge">
                    {VIEW_ICON} {event.viewCount || 0}
                  </span>

                  <span className="badge-paid">
                    {event.categoryName || "No category"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
