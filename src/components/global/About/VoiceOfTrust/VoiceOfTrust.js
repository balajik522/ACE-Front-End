"use client";

// Component styles for VoiceOfTrust section
import styles from "./VoiceOfTrust.module.css";

// Sample testimonial data for trust indicators
const DATA = [
  { emoji: "🥰", name: "Jerome Bell", role: "Organizer" },
  { emoji: "😊", name: "Jerome Bell", role: "User" },
  { emoji: "🥰", name: "Jerome Bell", role: "Organizer" },
  { emoji: "😊", name: "Jerome Bell", role: "User" },
  { emoji: "🥰", name: "Jerome Bell", role: "Organizer" },
  { emoji: "😊", name: "Jerome Bell", role: "User" },
];

/**
 * VoiceOfTrust Component
 * Displays testimonials in an infinite marquee animation
 * Shows user/organizer reviews in scrolling rows
 */
export default function VoiceOfTrust() {
  return (
    <section className={styles.wrapper}>
      <h2>
        Voice Of <span>Trust</span>
      </h2>

      {/* ROW 1 */}
      <div className={styles.marquee}>
        <div className={`${styles.track} ${styles.left}`}>
          {[...DATA, ...DATA].map((item, i) => (
            <Card key={`row1-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className={styles.marquee}>
        <div className={`${styles.track} ${styles.right}`}>
          {[...DATA, ...DATA].map((item, i) => (
            <Card key={`row2-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Card Component
 * Individual testimonial card with user info and review
 */
function Card({ item }) {
  return (
    <div className={styles.card}>
      <div className={styles.topSection}>
        <h4 style={{display:"flex" , flexDirection:"column"}}>{item.name}  <span>{item.role}</span></h4>
        <div className={styles.emoji}>{item.emoji}</div>
      </div>
      <p>
        I absolutely love using Evenjo! I bought tickets for Adele’s concert in
        Dallas, and it was smooth and good.
      </p>
    </div>
  );
}

