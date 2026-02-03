"use client";
import "./DeleteConfirmModal.css";

/**
 * DeleteConfirmModal Component
 * Confirmation dialog for destructive actions like event deletion
 */
export default function DeleteConfirmModal({ open, onClose, onConfirm }) {
  // Don't render if hidden
  if (!open) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h5>Delete Event</h5>
        <p>Are you sure you want to delete this event?</p>

        {/* Action buttons */}
        <div className="delete-modal-actions">
          <button className="btn btn-light" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

