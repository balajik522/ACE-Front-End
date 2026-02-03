"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventDetailsView from "../../../components/global/EventDetailsView/EventDetailsView";
import { getEventBySlugApi } from "../../../lib/api/event.api";
import { isUserLoggedIn } from "../../../lib/auth";

/* EventClient Component
 * Client-side wrapper for event details page
 * Fetches private event data for authenticated users
 */
export default function EventClient({ event }) {
  const router = useRouter();
  const [eventData, setEventData] = useState(event);

  /* Load private event details when user is authenticated */
  useEffect(() => {
    // 🔐 ONLY CLIENT CAN CHECK LOGIN
    if (!isUserLoggedIn()) return;

    const loadPrivateEvent = async () => {
      const res = await getEventBySlugApi(event.slug);

      // 👇 hit PRIVATE API
      if (res?.status) {
        setEventData(res.data);
      }
    };

    loadPrivateEvent();
  }, [event.slug]);

  /* Render event details view with back navigation */
  return (
    <EventDetailsView
      event={eventData}
      onBack={() => router.back()}
    />
  );
}
