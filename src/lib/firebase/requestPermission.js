// Request browser notification permission and retrieve FCM token

import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

// Prompts user for notification permission and returns FCM token if granted
export const requestNotificationPermission = async () => {
  console.log("requestNotificationPermission called");
  console.log("messaging value:", messaging);

  // Ask user for browser notification permission
  const permission = await Notification.requestPermission();
  console.log("Notification permission:", permission);

  if (permission === "granted") {
    // Generate Firebase Cloud Messaging token
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    console.log("FCM TOKEN INSIDE FUNCTION:", token);
    return token;
  } else {
    // Permission denied or dismissed
    console.log("Permission not granted");
  }
};
