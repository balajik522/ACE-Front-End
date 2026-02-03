"use client";

import styles from "./HeroBanner.module.css";

/**
 * HeroBanner - Animated title banner component
 * Displays animated text with color cycling effect
 */
export default function HeroBanner({ text }) {
  // Split text into words for animation
  const words = text.split(" ");

  return (
    <>
      {/* Animated title with staggered word colors */}
      <h1 className={`${styles.title} ${styles.center}`}>
        {words.map((word, i) => (
          <span
            key={i}
            className={styles.word}
            style={{ animationDelay: `${i * 0.35}s` }}
          >
            {word}&nbsp;
          </span>
        ))}
      </h1>

      {/* Subtitle description */}
      <p className={styles.subtitle}>
        Discover events that match your vibe — anytime, anywhere.
      </p>
    </>
  );
}
