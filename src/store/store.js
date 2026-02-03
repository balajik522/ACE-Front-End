import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// ============================================
// REDUX STORE CONFIGURATION
// ============================================

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
