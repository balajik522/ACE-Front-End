import { Suspense } from "react";
import EnterOtpClient from "./EnterOtpClient";

// OTP verification page wrapper with suspense boundary
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterOtpClient />
    </Suspense>
  );
}
