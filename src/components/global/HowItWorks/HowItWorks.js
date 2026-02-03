"use client";

import styles from "./HowItWorks.module.css";

/**
 * HowItWorks - Information section explaining platform functionality
 * Displays animated illustration showing how the platform works
 */
export default function HowItWorks() {
  return (
    <section className={styles.root}>
      {/* Section title */}
      <h2 className={styles.title}>
        How All College Event Works
      </h2>

      {/* Process illustration */}
      <img
        src="/images/animationImage.png"
        alt="How All College Event Works"
        className={styles.animation}
      />
    </section>
  );
}
