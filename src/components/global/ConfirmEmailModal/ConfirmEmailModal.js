"use client";

// React hooks for state management and side effects
import { useState, useEffect } from "react";
import "./ConfirmEmailModal.css";

/**
 * ConfirmEmailModal Component
 * Email confirmation dialog that requires user to type their email
 * Used for verifying user identity before critical actions
 */
export default function ConfirmEmailModal({
  open,
  email,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  // User input state
  const [input, setInput] = useState("");

  // Reset input when modal opens
  useEffect(() => {
    if (open) setInput("");
  }, [open]);

  // Don't render if hidden
  if (!open) return null;

  // Validation: input must match email exactly
  const isValid = input === email;

  return (
    <div className="confirm-backdrop">
      <div className="confirm-modal">
        <h3>{title}</h3>
        <p>
          {description}
          <br />
          <strong>{email}</strong>
        </p>

        {/* Email input with paste/drop prevention */}
        <input
          type="email"
          placeholder="Type your email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          autoComplete="off"
          spellCheck={false}
        />

        {/* Action buttons */}
        <div className="confirm-actions">
          <button className="btn-cancel" onClick={onCancel}>
            {cancelText}
          </button>

          <button
            className="btn-confirm"
            disabled={!isValid}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

