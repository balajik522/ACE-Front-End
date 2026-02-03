"use client";
import { useState } from "react";
import "./OfferModal.css";

/**
 * OfferModal Component
 * Modal for editing event offers/discounts
 */
export default function OfferModal({ value = "", onClose, onSave }) {
  // Local state for offer text
  const [offer, setOffer] = useState(value);

  return (
    <div className="child-overlay" onClick={onClose}>
      <div className="child-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER with back button */}
        <div className="modal-header">
          <button className="back-btn" onClick={onClose}>←</button>
          <h3>Offer Details</h3>
        </div>

        {/* BODY with textarea input */}
        <div className="modal-body">
          <label>Offers </label>
          
          <textarea
            placeholder="Enter offers"
            value={offer}
            maxLength={50}
            onChange={(e) => setOffer(e.target.value)}
          />
          {/* Character counter */}
          <div className="char-count">{offer.length}/50</div>
        </div>

        {/* FOOTER with action buttons */}
        <div className="modal-footer">
          <button className="outline-btn" onClick={onClose}>Reset</button>
          <button
            className="primary-btn"
            onClick={() => onSave(offer)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

