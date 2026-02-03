"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "../store/store";
import { LoadingProvider } from "../context/LoadingContext";

/**
 * Providers - Root application context provider
 * Wraps the app with Redux store, loading context, and toast notifications
 */
export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <LoadingProvider>
        {/* Toast notifications positioned top-right */}
        <Toaster position="top-right" />
        {children}
      </LoadingProvider>
    </Provider>
  );
}
