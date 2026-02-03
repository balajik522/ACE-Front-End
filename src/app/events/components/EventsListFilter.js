"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  DATEICON,
  LOCATION_ICON,
  SAVEICON,
  HEART_ICON,
} from "../../../const-value/config-icons/page";

import { useLoading } from "../../../context/LoadingContext";
import { likeEventApi, saveEventApi } from "../../../lib/api/event.api";

// 🔐 SESSION AUTH
import {
  getAuthFromSession,
  isUserLoggedIn,
} from "../../../lib/auth";

/* EventsListFilter Component
 * Displays event cards with like/save functionality
 */
export default function EventsListFilter({ events = [] }) {
  const router = useRouter();
  const { setLoading } = useLoading();

  /* ================= AUTH (SESSION) ================= */
  const [auth, setAuth] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const ok = isUserLoggedIn();
    setLoggedIn(ok);

    if (ok) {
      setAuth(getAuthFromSession());
    }
  }, []);

  /* ================= STATES ================= */
  const [likedCards, setLikedCards] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [savedCards, setSavedCards] = useState({});

  /* ================= INIT FROM API DATA ================= */
  useEffect(() => {
    const liked = {};
    const counts = {};
    const saved = {};

    events.forEach((e) => {
      liked[e.identity] = !!e.isLiked;
      counts[e.identity] = e.likeCount || 0;
      saved[e.identity] = !!e.isSaved;
    });

    setLikedCards(liked);
    setLikeCounts(counts);
    setSavedCards(saved);
  }, [events]);

  /* ================= LIKE HANDLER ================= */
  const handleLike = async (e) => {
    if (!loggedIn || !auth?.identity) {
      toast("Please login to like events", { icon: "⚠️" });
      return;
    }

    const eventId = e.identity;
    const wasLiked = likedCards[eventId];

    setLikedCards((prev) => ({
      ...prev,
      [eventId]: !wasLiked,
    }));

    setLikeCounts((prev) => ({
      ...prev,
      [eventId]: wasLiked
        ? (prev[eventId] || 1) - 1
        : (prev[eventId] || 0) + 1,
    }));

    const res = await likeEventApi({
      eventIdentity: eventId,
      userIdentity: auth?.identity,
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

  /* ================= SAVE HANDLER ================= */
  const handleSave = async (e) => {
    if (!loggedIn || !auth?.identity) {
      toast("Please login to save events", { icon: "⚠️" });
      return;
    }

    const eventId = e.identity;
    const wasSaved = savedCards[eventId];

    setSavedCards((prev) => ({
      ...prev,
      [eventId]: !wasSaved,
    }));

    const res = await saveEventApi({
      eventIdentity: eventId,
       userIdentity: auth?.identity,
    });

    if (!res?.status) {
      // rollback
      setSavedCards((prev) => ({
        ...prev,
        [eventId]: wasSaved,
      }));

      toast.error("Failed to update save");
    }
  };

  /* ================= ROUTE ================= */
  const handleClick = (slug) => {
    if (!slug) return;
    setLoading(true);
    router.push(`/events/${slug}`);
  };

  /* ================= EMPTY ================= */
  if (!events.length) {
    return (
      <div className="events-empty">
        <img src="/images/no-event-image.png" alt="no image" />
        <p className="mt-5">No events found</p>
      </div>
    );
  }

  /* ================= UI RENDER ================= */
  return (
    <div className="events-list">
      {/* EVENT CARDS LIST */}
      {events.map((e) => {
        const startDate = e.calendars?.[0]?.startDate || e.createdAt;

        return (
          <div key={e.identity} className="event-row-card floating-card">
            {/* EVENT IMAGE */}
            <div
              className="floating-image"
              onClick={() => handleClick(e.slug)}
            >
              <img
                src={e.bannerImages?.[0] || "/images/no-image.png"}
                alt={e.title}
              />
            </div>

            {/* EVENT CONTENT */}
            <div className="event-content">
              {/* TITLE ROW - LIKE/SAVE ACTIONS */}
              <div className="event-title-row">
                <h6 className="event-title">{e.title}</h6>

                {/* LIKE + SAVE SECTION */}
                <div className="d-flex gap-3 like-save-section">
                  {/* LIKE BUTTON */}
                  <span
                    onClick={() => handleLike(e)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="text-center">
                      <HEART_ICON active={likedCards[e.identity]} />
                      <div>{likeCounts[e.identity] ?? 0}</div>
                    </div>
                  </span>

                  {/* SAVE BUTTON */}
                  <span
                    onClick={() => handleSave(e)}
                    style={{ cursor: "pointer" }}
                  >
                    <SAVEICON active={savedCards[e.identity]} />
                  </span>
                </div>
              </div>

              {/* Event Category Tag */}
              <span className="tag networking">
                {e.categoryName || "Networking"}
              </span>

              {/* Event Date */}
              <div className="event-meta-sub">
                <span>
                  {DATEICON}{" "}
                  {new Date(startDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Event Location and Mode */}
              <div className="event-meta">
                <span>
                  {LOCATION_ICON} {e.location?.city || "N/A"}
                </span>

                {/* MODE BADGE */}
                <span className={`mode-text ${e.mode?.toLowerCase()}`}>
                  <span className="mode-dot" />
                  {e.mode || "Offline"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
