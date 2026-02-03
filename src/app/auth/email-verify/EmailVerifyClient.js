"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BTN_EMAIL_VERIFY_FAILED,
  BTN_EMAIL_VERIFY_SUCCESS,
  MSG_EMAIL_VERIFY_FAILED,
  MSG_EMAIL_VERIFY_LOADING,
  MSG_EMAIL_VERIFY_SUCCESS,
  STORAGE_TOKEN,
  SUB_TITLE_EMAIL_VERIFY,
  SUB_TITLE_EMAIL_VERIFY_FAILED,
  SUB_TITLE_EMAIL_VERIFY_SUCCESS,
  TITLE_EMAIL_VERIFY,
  TITLE_EMAIL_VERIFY_FAILED,
  TITLE_EMAIL_VERIFY_SUCCESS,
} from "../../../const-value/config-message/page";

import { verifyEmailApi } from "../../../lib/api/auth.api";
import { useLoading } from "../../../context/LoadingContext"; 

// Client-side component for handling email verification logic.
export default function EmailVerifyClient() {
  // Retrieve query parameters to get the verification token.
  const searchParams = useSearchParams();
  const token = searchParams.get(STORAGE_TOKEN);

  // Access global loading state context.
  const { setLoading } = useLoading(); 

  // Local state to track verification status (loading, success, failed).
  const [status, setStatus] = useState(MSG_EMAIL_VERIFY_LOADING);
  // loading | success | failed

  // Effect to trigger verification when the component mounts or token changes.
  useEffect(() => {
    // If no token is present, mark verification as failed immediately.
    if (!token) {
      setStatus(MSG_EMAIL_VERIFY_FAILED);
      return;
    }

    // Async function to call the verification API.
    async function verify() {
      try {
        setLoading(true); 

        // Call API to verify the token.
        const res = await verifyEmailApi(token);

        if (res?.status) {
          // Check if the user is on a mobile device.
          const isMobile = /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
          );

          // If mobile, attempt to open the app via deep link.
          if (isMobile) {
            // mobile deep link
            window.location.href = "myapp://email-verify?status=success";
          }

          // Update state to success.
          setStatus(MSG_EMAIL_VERIFY_SUCCESS);
        } else {
          // Update state to failed if API returns false status.
          setStatus(MSG_EMAIL_VERIFY_FAILED);
        }
      } catch (err) {
        // Handle any errors during the API call.
        setStatus(MSG_EMAIL_VERIFY_FAILED);
      } finally {
        // Ensure loading state is turned off.
        setLoading(false); 
      }
    }

    verify();
  }, [token, setLoading]);

  return (
    // Main container centered on the screen.
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg p-4 text-center"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        {/* LOGO */}
        <div className="mb-3">
          <img src="/images/logo.png" alt="logo" style={{ height: 60 }} />
        </div>

        {/* LOADING */}
        {status === MSG_EMAIL_VERIFY_LOADING && (
          <>
            <div className="spinner-border text-primary mb-3" />
            <h5 className="fw-bold">{TITLE_EMAIL_VERIFY}</h5>
            <p className="text-muted">{SUB_TITLE_EMAIL_VERIFY}</p>
          </>
        )}

        {/* SUCCESS */}
        {status === MSG_EMAIL_VERIFY_SUCCESS && (
          <>
            <h4 className="fw-bold text-success">
              {TITLE_EMAIL_VERIFY_SUCCESS}
            </h4>
            <p className="text-muted">{SUB_TITLE_EMAIL_VERIFY_SUCCESS}</p>

            <a
              href="/auth/organization/login"
              className="btn btn-success w-100 mt-3"
            >
              {BTN_EMAIL_VERIFY_SUCCESS}
            </a>
          </>
        )}

        {/* FAILED */}
        {status === MSG_EMAIL_VERIFY_FAILED && (
          <>
            <h4 className="fw-bold text-danger">
              {TITLE_EMAIL_VERIFY_FAILED}
            </h4>
            <p className="text-muted">{SUB_TITLE_EMAIL_VERIFY_FAILED}</p>

            <button
              className="btn btn-outline-secondary w-100 mt-3"
              onClick={() => window.location.reload()}
            >
              {BTN_EMAIL_VERIFY_FAILED}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
