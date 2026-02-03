"use client";

/* PaginationBar Component
 * Renders pagination controls with previous/next buttons and page numbers
 * Hides when there is only one page of results
 */
export default function PaginationBar({ page, total, onChange }) {
  // Hide pagination for single page results
  if (total <= 1) return null;

  // Generate page number array
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="pagination-wrap">
      {/* Previous Page Button */}
      <button
        className="pg-btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        ← Prev
      </button>

      {/* Page Number Buttons */}
      <div className="pg-pages">
        {pages.map((p) => (
          <button
            key={p}
            className={`pg-page ${p === page ? "active" : ""}`}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next Page Button */}
      <button
        className="pg-btn"
        disabled={page === total}
        onClick={() => onChange(page + 1)}
      >
        Next →
      </button>
    </div>
  );
}
