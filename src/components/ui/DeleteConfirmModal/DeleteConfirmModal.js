/**
 * DeleteConfirmModal Component
 * Confirmation dialog requiring email verification before account deletion
 */

"use client";

import { useState } from "react";
import "./DeleteConfirmModal.css";

/**
 * DeleteConfirmModal Props
 */
export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  userEmail,
}) {
  const [email, setEmail] = useState("");

  // Don't render if modal is closed
  if (!open) return null;

  // Check if typed email matches user email (case-insensitive)
  const isMatch =
    email.trim().toLowerCase() === userEmail?.toLowerCase();

  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="logo"
          className="delete-logo"
        />

        {/* Instructions */}
        <p className="delete-text">
          Please type your email to confirm deletion
          <br />
          <strong>{userEmail}</strong>
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="delete-input"
        />

        {/* Action Buttons */}
        <div className="delete-btn-row">
          <button
            className="delete-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-confirm-btn"
            disabled={!isMatch}
            onClick={onConfirm}
            style={{
              opacity: isMatch ? 1 : 0.5,
              cursor: isMatch ? "pointer" : "not-allowed",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

