import { Suspense } from "react";
import ForgotPasswordClient from "./ForgotPasswordClient";

// Forgot password page wrapper with suspense boundary
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordClient />
    </Suspense>
  );
}
