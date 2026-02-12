// Redux store configuration

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Create and export the global Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Authentication state reducer
  },
});
