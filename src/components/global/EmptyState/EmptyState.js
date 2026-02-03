"use client";
import "./EmptyState.css";

/**
 * EmptyState Component
 * Reusable placeholder for empty content states
 * Displays an image, title, and subtitle when no data is available
 */
export default function EmptyState({
  image = "/images/no-event-image.png",
  title = "No events created yet",
  subtitle = "Start by creating your first event",
}) {
  return (
    <div className="empty-state">
      <img src={image} alt="Empty" />
      <h6>{title}</h6>
      <p>{subtitle}</p>
    </div>
  );
}

