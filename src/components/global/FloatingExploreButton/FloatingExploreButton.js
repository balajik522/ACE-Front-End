"use client";

import { useEffect, useState } from "react";
import "./FloatingExploreButton.css";

/**
 * FloatingExploreButton - Scroll to top/explore section button
 * Appears when user scrolls past a certain point
 */
export default function FloatingExploreButton({ targetRef }) {
  // Track scroll visibility
  const [visible, setVisible] = useState(false);

  // Show button after scrolling 250px
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll to target section
  const handleScroll = () => {
    if (!targetRef?.current) return;

    window.scrollTo({
      top: targetRef.current.offsetTop - 80, // header gap
      behavior: "smooth",
    });
  };

  // Hide when not visible
  if (!visible) return null;

  return (
    <button className="floating-explore-btn" onClick={handleScroll}>
      {/* Up arrow icon */}
      <svg
        width="20"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 19V5M12 5L5 12M12 5L19 12"
          stroke="white"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
