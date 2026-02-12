import { NextResponse } from "next/server";

/* ===============================
   ROUTE DEFINITIONS
================================ */

// Public routes that must match exactly
const PUBLIC_EXACT = ["/", "/unauthorized"];

// Public routes allowed by prefix (no auth required)
const PUBLIC_PREFIX = [
  "/about",
  "/contact",
  "/faq",
  "/terms-and-conditions",
  "/events",
  "/explore-events",
  "/explore-categories",
  "/organization-details",
  "/auth",
];

// Routes that require authentication
const PROTECTED_PREFIX = ["/dashboard"];

/* ===============================
   MIDDLEWARE
================================ */

// Next.js middleware for route-level auth protection
export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* --------------------------------
     Skip static assets & API proxy
  --------------------------------- */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/proxy") ||
    pathname.startsWith("/images") ||
    pathname.match(/\.(png|jpg|jpeg|svg|css|js|ico)$/)
  ) {
    return NextResponse.next();
  }

  /* --------------------------------
     Allow unauthorized page always
  --------------------------------- */
  if (pathname === "/unauthorized") {
    return NextResponse.next();
  }

  /* --------------------------------
     Allow exact public routes
  --------------------------------- */
  if (PUBLIC_EXACT.includes(pathname)) {
    return NextResponse.next();
  }

  /* --------------------------------
     Allow public prefix routes
  --------------------------------- */
  if (PUBLIC_PREFIX.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  /* --------------------------------
     Protect restricted routes
  --------------------------------- */
  if (PROTECTED_PREFIX.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("auth_token")?.value;

    // Redirect to unauthorized if not logged in
    if (!token) {
      return NextResponse.redirect(
        new URL("/unauthorized", request.url),
      );
    }
  }

  return NextResponse.next();
}

/* ===============================
   MIDDLEWARE MATCHER
================================ */

// Apply middleware to all routes except API proxy
export const config = {
  matcher: ["/((?!api/proxy).*)"],
};
