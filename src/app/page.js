import LandingPage from "./home/LandingPage";
import { getAllEventsApi } from "../lib/api/event.api";
import { getAllOrganizationsApi } from "../lib/api/organizer.api";

/* SEO Metadata
 * Page title and description for search engines and social sharing
 */
export const metadata = {
  title: "All College Events | Discover Events Near You",
  description:
    "Explore college events, workshops, hackathons, concerts and more.",
};

/* Home Page Component
 * Server-side page that fetches events and organizations
 * Passes initial data to client-side landing page
 */
export default async function Page() {
  
  // Fetch events and organizations from API
  const eventsRes = await getAllEventsApi(false);
  const orgRes = await getAllOrganizationsApi();

  // Render landing page with initial data
  return (
    <LandingPage
      initialEvents={eventsRes?.data || []}
      initialOrganization={orgRes?.data || []}
    />
  );
}
