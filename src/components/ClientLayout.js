"use client";

import { usePathname } from "next/navigation";
import Navbar from "./global/Navbar/Navbar";

/**
 * ClientLayout - Layout wrapper that conditionally renders Navbar
 * Hides navbar on authentication pages (login, signup, auth routes)
 */
export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Hide navbar on auth-related routes
  const hideNavbar =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  return (
    <>
      {/* Navbar hidden on auth pages */}
      {!hideNavbar && <Navbar/>}
      {children}
    </>
  );
}
