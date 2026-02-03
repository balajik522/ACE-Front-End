export const dynamic = "force-dynamic";

import EventsFilterPage from "./EventsFilterPage";

/* Events Page Component
 * Server-side page that renders the events filter page
 * Force dynamic to ensure fresh data on each request
 */
export default function Page() {
  return <EventsFilterPage />;
}
