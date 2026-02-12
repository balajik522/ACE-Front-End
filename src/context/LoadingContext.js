"use client";

/**
 * Client-side loading context for managing and displaying a global loader.
 *
 * Provides a centralized way to control loading state across the app
 * and conditionally render a global loading indicator.
 */

import { createContext, useContext, useState } from "react";
import GlobalLoader from "../components/global/GlobalLoader/GlobalLoader";

/** React context holding global loading state and updater */
const LoadingContext = createContext();

/**
 * LoadingProvider
 *
 * Wraps the application to expose `loading` state and `setLoading` function.
 * Renders a global loader component whenever loading is enabled.
 */
export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false); // Tracks global loading state

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <GlobalLoader />} {/* Shows loader when loading is true */}
    </LoadingContext.Provider>
  );
}

/**
 * useLoading
 *
 * Custom hook to access and control global loading state from any component.
 */
export const useLoading = () => useContext(LoadingContext);
