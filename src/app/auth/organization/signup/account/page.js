import { Suspense } from "react";
import SignupAccountClient from "./SignupAccountClient";

// Account creation page wrapper with suspense boundary
export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignupAccountClient />
    </Suspense>
  );
}

