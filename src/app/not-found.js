"use client";

import { useRouter } from "next/navigation";
import "./not-found.css";

/* NotFound Component
 * Displays 404 error page when users navigate to non-existent routes
 * Provides navigation back to previous page
 */
export default function NotFound() {
  const router = useRouter();

  return (
    <div className="nf-wrapper">
      <div className="nf-content">
        {/* 404 Illustration Image */}
        <img
          src="/images/page-not-found-image.png"
          alt="Page Not Found"
          className="nf-image"
        />
        
        {/* Error Title */}
        <h2 className="nf-title">Page Not Found</h2>
        <h3 className="nf-error">ERROR</h3>

        {/* Error Description */}
        <p className="nf-desc">
          It seems like the page you're looking for doesn’t exist or has been
          moved. <br />
          But don’t worry, you can get back on track!
        </p>

        {/* Back Navigation Button */}
        <button className="nf-btn" onClick={() => router.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
}
