// Listen for Firebase Cloud Messaging notifications while app is in foreground

import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

// Registers a foreground message listener and emits a custom browser event
export const listenForegroundMessage = () => {
  // Skip if messaging is not initialized (SSR or unsupported)
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    console.log("Foreground message:", payload);

    // Dispatch custom event for app-wide notification handling
    window.dispatchEvent(
      new CustomEvent("ace-notification", {
        detail: payload,
      })
    );
  });
};
