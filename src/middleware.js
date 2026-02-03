import { NextResponse } from "next/server";

/* ===============================
   ROUTES
================================ */

const PUBLIC_EXACT = ["/", "/unauthorized"];

// Routes with public access by prefix
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

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* --------------------------------
     Exclude static assets, API proxy routes, and common file extensions
  --------------------------------- */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/proxy") || // Critical: Bypass proxy for direct API calls
    pathname.startsWith("/images") ||
    pathname.match(/\.(png|jpg|jpeg|svg|css|js|ico)$/)
  ) {
    return NextResponse.next();
  }

  /* --------------------------------
     Always allow unauthorized
  --------------------------------- */
  if (pathname === "/unauthorized") {
    return NextResponse.next();
  }

  /* --------------------------------
     Public exact
  --------------------------------- */
  if (PUBLIC_EXACT.includes(pathname)) {
    return NextResponse.next();
  }

  /* --------------------------------
     Public prefix
  --------------------------------- */
  if (PUBLIC_PREFIX.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  /* --------------------------------
     Protected pages
  --------------------------------- */
  if (PROTECTED_PREFIX.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/unauthorized", request.url),
      );
    }
  }

  return NextResponse.next();
}

/* ===============================
   MATCHER (PAGES ONLY)
================================ */

export const config = {
  matcher: ["/((?!api/proxy).*)"],
};
