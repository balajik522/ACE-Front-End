"use client";

import styles from "./OrganizerLeaderboardTable.module.css";

/**
 * OrganizerLeaderboardTable - Displays ranked list of event organizers
 * Shows organizer details with their event counts and view metrics
 */
export default function OrganizerLeaderboardTable({ data = [] }) {
  return (
    <section className={styles.container}>
      {/* Section header */}
      <h3>List of Top Organizers</h3>
      <p>You don’t just host events; you shape experiences. Keep shining!</p>

      {/* TABLE HEADER */}
      <div className={`${styles.row} ${styles.header}`}>
        <span>Organizer Name</span>
        <span>Events Created</span>
        <span>User views</span>
        <span className={styles.rank}>Ranking</span>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <p className={styles.empty}>No organizers found</p>
      )}

      {/* ORGANIZER ROWS */}
      {data.map((org, idx) => (
        <div
          key={org.identity}
          className={`${styles.row} ${styles[`bg${idx % 5}`]}`}
        >
          {/* ORGANIZER */}
          <div className={styles.org}>
            {org.profileImage ? (
              <img
                src={org.profileImage}
                alt={org.organizationName}
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarFallback}>
                {org.organizationName?.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <div className={styles.name}>
                {org.organizationName}
              </div>
              <div className={styles.rating}>
                4.7 ★★★★★
              </div>
            </div>
          </div>

          {/* EVENTS */}
          <span className={styles.number}>
            {org.eventCount ?? org._count?.events ?? 0}
          </span>

          {/* VIEWS */}
          <span className={styles.number}>
            {org.totalViews ?? 1900}
          </span>

          {/* RANK */}
          <span className={styles.rank}>{org.rank}</span>
        </div>
      ))}
    </section>
  );
}
