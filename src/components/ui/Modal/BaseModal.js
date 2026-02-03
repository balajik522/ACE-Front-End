/**
 * BaseModal Component
 * Generic modal wrapper with header, body, and footer sections
 */

/**
 * BaseModal Functional Component
 */
export default function BaseModal({ title, onClose, children, footer }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Header with title and close button */}
        <div className="modal-header">
          <h3>{title}</h3>
          <span className="close" onClick={onClose}>✕</span>
        </div>

        {/* Main content area */}
        <div className="modal-body">{children}</div>

        {/* Optional footer */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

