"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./explore-event.css";

import EventSlider from "../../components/global/EventSlider/EventSlider";
import ExploreHero from "../../components/global/ExploreHero/ExploreHero";
import { getAllEventsApi } from "../../lib/api/event.api";
import WhyChoose from "../../components/global/WhyChoose/WhyChoose";
import Footer from "../../components/global/Footer/Footer";
import { useLoading } from "../../context/LoadingContext";

/* ExploreEventsPage Component
 * Landing page displaying event sliders by category
 * Shows ongoing, upcoming, featured, trending, and virtual events
 */
export default function ExploreEventsPage() {
  const [events, setEvents] = useState([]);
  const { setLoading } = useLoading();

  /* Load All Events
   * Fetch events from API on component mount
   */
  const loadEvents = async () => {
    try {
      setLoading(true);

      const res = await getAllEventsApi();

      if (res?.status) {
        setEvents(res.data);
      } else {
        toast.error(res?.message || "Failed to load events");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* Fetch events on mount */
  useEffect(() => {
    loadEvents();
  }, []);

  /* Render Page Sections */
  return (
    <>
      {/* Hero Section */}
      <ExploreHero />

      {/* Event Category Sliders */}
      <EventSlider title="Ongoing Events" data={events} />
      <EventSlider title="Upcoming Events" data={events} />
      <EventSlider title="Featured Events" data={events} />
      <EventSlider title="Trending Events" data={events} />
      <EventSlider title="Virtual Events" data={events} />

      {/* Why Choose Section */}
      <WhyChoose />
      
      {/* Footer */}
      <Footer />
    </>
  );
}
