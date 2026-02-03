/**
 * Proxy API Route
 * Forwards incoming requests to the backend server and relays responses back to the client.
 * This enables the frontend to communicate with backend APIs while handling CORS and cookies.
 */

import { NextResponse } from "next/server";

// Base URL for the backend API, configured via environment variables
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Handles all incoming proxy requests.
 * Extracts the path from the request URL, forwards it to the backend,
 * and returns the backend response to the client.
 *
 */
async function handler(req) {
  try {
    // Extract pathname and search parameters from the request URL
    const { pathname, search } = req.nextUrl;

    // remove "/api/proxy" from path
    const backendPath = pathname.replace("/api/proxy", "");

    // FINAL BACKEND URL (with query params)
    const backendUrl = `${BACKEND_BASE_URL}${backendPath}${search}`;

    /* ================= FORWARD HEADERS ================= */
    const headers = new Headers(req.headers);

    // Remove host & length related headers (fetch safety)
    headers.delete("host");
    headers.delete("content-length");

    /* ================= BODY ================= */
    let body = null;
    // For non-GET and non-HEAD requests, read the request body as an ArrayBuffer
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await req.arrayBuffer();
    }

    /* ================= BACKEND FETCH ================= */
    const backendRes = await fetch(backendUrl, {
      method: req.method,
      headers,
      body,
      credentials: "include",
      cache: "no-store",
    });

    /* ================= RESPONSE HEADERS ================= */
    const responseHeaders = new Headers();

    // 🔥 FORWARD ALL SET-COOKIE HEADERS
    backendRes.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        responseHeaders.append("set-cookie", value);
      }
    });

    // Forward content-type
    const contentType = backendRes.headers.get("content-type");
    if (contentType) {
      responseHeaders.set("content-type", contentType);
    }

    /* ================= RESPONSE BODY ================= */
    const responseBody = await backendRes.arrayBuffer();

    // Return the response with the backend's status code and processed headers
    return new NextResponse(responseBody, {
      status: backendRes.status,
      headers: responseHeaders,
    });
  } catch (error) {
    // Log any proxy errors for debugging purposes
    console.error("PROXY ERROR:", error);
    // Return a 503 Service Unavailable response if the backend fails
    return NextResponse.json(
      {
        message: "Backend not responding",
        error: error.message,
      },
      { status: 503 },
    );
  }
}

/* ================= EXPORT METHODS ================= */
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
