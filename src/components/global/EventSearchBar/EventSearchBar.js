"use client";

import styles from "./EventSearchBar.module.css";

/**
 * EventSearchBar - Search filter component for event discovery
 * Allows users to filter events by type, location, and date
 */
export default function EventSearchBar({
  whatIcon,
  whereIcon,
  whenIcon,
  onWhatClick,
  onWhereClick,
  onWhenClick,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Search filter row - clickable columns for each filter */}
        <div className={styles.row}>
          <div className={styles.col} onClick={onWhatClick}>
            <div className={styles.icon}>{whatIcon}</div>
            <div>
              <div className={styles.title}>What</div>
              <div className={styles.sub}>Event Type</div>
            </div>
          </div>

          <div className={styles.col} onClick={onWhereClick}>
            <div className={styles.icon}>{whereIcon}</div>
            <div>
              <div className={styles.title}>Where</div>
              <div className={styles.sub}>Location</div>
            </div>
          </div>

          <div className={styles.col} onClick={onWhenClick}>
            <div className={styles.icon}>{whenIcon}</div>
            <div>
              <div className={styles.title}>When</div>
              <div className={styles.sub}>Date</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
