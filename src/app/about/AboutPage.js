"use client";

// Import individual sections of the About page.
import JourneyNumbers from "../../components/global/About/JourneyNumbers/JourneyNumbers";
import StandFor from "../../components/global/About/StandFor/StandFor";
import StoryBehindFest from "../../components/global/About/StoryBehindFest/StoryBehindFest";
import VoiceOfTrust from "../../components/global/About/VoiceOfTrust/VoiceOfTrust";
import Footer from "../../components/global/Footer/Footer";
import WhyChoose from "../../components/global/WhyChoose/WhyChoose";


/**
 * The main component for the "About Us" page.
 * It assembles various sections to create the full page.
 */
export default function AboutPage() {
  return (
    <>
      {/* Renders the story behind the festival. */}      
      <StoryBehindFest />
      {/* Renders what the organization stands for. */}
      <StandFor />
      {/* Renders key numbers and statistics about the journey. */}
      <JourneyNumbers />
      {/* Renders testimonials or voices of trust. */}
      <VoiceOfTrust />
      {/* Renders the "Why Choose Us" section. */}      
      <WhyChoose />
      {/* Renders the common footer for the page. */}
      <Footer/>
    </>
  );
}
