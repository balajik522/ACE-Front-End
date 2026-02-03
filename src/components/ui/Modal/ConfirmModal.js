/**
 * ConfirmModal Component
 * Confirmation dialog with title, description, and action buttons
 */

"use client";

import styles from "./Modal.module.css";

/**
 * ConfirmModal Functional Component
 */
export default function ConfirmModal({
  open,
  title,
  description,
  image,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        {/* Optional Image */}
        {image && (
          <div style={{ textAlign: "center", marginTop: 12 }} className="text-center">
            <img src={image} alt="confirmation" style={{ width: 120 }} />
          </div>
        )}

        {/* Header */}
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          {/* <span className={styles.closeBtn} onClick={onCancel}>
            ✕
          </span> */}
        </div>

        {/* Content */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <p style={{ lineHeight: 1.6 }}>{description}</p>
        </div>

        {/* Footer */}
        <div
          className={styles.modalFooter}
          style={{ justifyContent: "center" }}
        >
          <button className={styles.outlineBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.primaryBtn} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

