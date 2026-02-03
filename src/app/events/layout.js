export const metadata = {
  /* Page Title */
  title: "All Events | ACE",
  
  /* Search Engine Description */
  description:
    "description: Explore all college events with filters like category, mode, perks, certifications and more.",
    
  /* Canonical URL for SEO */
  alternates: {
    canonical: "/events",
  },
  
  /* Open Graph / Social Media Preview */
  openGraph: {
    title: "All College Events",
    description:
      "Description: Find upcoming, trending and popular college events in one place.",
    url: "/events",
    siteName: "ACE – All College Events",
    images: [
      {
        url: "/images/test-events-og.png",
        width: 1200,
        height: 630,
        alt: "All College Events",
      },
    ],
    type: "website",
  },
  
  /* Twitter Card Preview */
  twitter: {
    card: "summary_large_image",
    title: "Twitter – Events Listing",
    description:
      "Twitter Description: Browse and filter college events easily.",
    images: ["/images/test-events-og.png"],
  },
};

/* Events Layout Component
 * Simple wrapper for events pages
 * Provides consistent layout structure
 */
export default function EventsLayout({ children }) {
  return <>{children}</>; 
}
