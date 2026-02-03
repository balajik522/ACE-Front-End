"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./HeroBannerCarousel.module.css";

/**
 * HeroBannerCarousel - 3D carousel for hero banner images
 * Displays images in a rotating carousel with 3D positioning effects
 */
export default function HeroBannerCarousel({ images = [], interval = 4500 }) {
  const n = images.length;
  const [centerIdx, setCenterIdx] = useState(0);
  const timerRef = useRef(null);

  // Auto-rotate carousel
  useEffect(() => {
    if (!n) return;

    timerRef.current = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % n);
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [n, interval]);

  // Calculate position class based on index relative to center
  const getPosClass = (imgIdx) => {
    if (n === 1) return styles.posCenter;

    const diff = (imgIdx - centerIdx + n) % n;

    if (diff === 0) return styles.posCenter;
    if (diff === 1) return styles.posRight;
    if (diff === 2) return styles.posRightFar;
    if (diff === 3) return styles.posRightXFar;

    if (diff === n - 1) return styles.posLeft;
    if (diff === n - 2) return styles.posLeftFar;
    if (diff === n - 3) return styles.posLeftXFar;

    return styles.posHidden;
  };

  return (
    <div className={styles.carouselRoot}>
      {/* Cards stage - carousel container */}
      <div className={styles.cardsStage}>
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`${styles.cardItem} ${getPosClass(idx)}`}
          >
            <img src={src} alt={`banner-${idx}`} draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
