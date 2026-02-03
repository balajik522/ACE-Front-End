/* Root Layout Component
 * Main application wrapper that provides global context and providers
 * Includes Google OAuth, loading state, and client layout
 */
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ClientLayout from "../components/ClientLayout";
import Providers from "../components/Providers";
import { Poppins } from "next/font/google";
import { LoadingProvider } from "../context/LoadingContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {/* Loading Context - Manages global loading states */}
          <LoadingProvider>
            {/* App Providers - React Query and other context providers */}
            <Providers>
              {/* Client Layout - Header, Footer, and main structure */}
              <ClientLayout>{children}</ClientLayout>
            </Providers>
          </LoadingProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
