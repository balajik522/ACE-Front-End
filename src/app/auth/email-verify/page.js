/**
 * Email Verification Page
 * This server component renders the email verification flow.
 * Uses Suspense to handle async states while loading the client component.
 */
import { Suspense } from "react";
import EmailVerifyClient from "./EmailVerifyClient";

/**
 * Page component - Server Component
 * Wraps the EmailVerifyClient with Suspense boundary for streaming support
 */
export default function Page() {
  return (
    <Suspense fallback={<div>Verifying...</div>}>
      <EmailVerifyClient />
    </Suspense>
  );
}
