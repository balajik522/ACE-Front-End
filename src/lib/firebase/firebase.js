// Firebase client initialization for browser-based services

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Firebase configuration loaded from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging only on client side
export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;
