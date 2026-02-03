"use client";

import { createContext, useContext, useState } from "react";
import GlobalLoader from "../components/global/GlobalLoader/GlobalLoader";

// ============================================
// LOADING CONTEXT
// Provides global loading state management
// ============================================

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <GlobalLoader />}
    </LoadingContext.Provider>
  );
}

// Custom hook to access loading context
export const useLoading = () => useContext(LoadingContext);
