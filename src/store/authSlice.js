// Redux slice for managing authentication state

import { createSlice } from "@reduxjs/toolkit";

// Initial authentication state
const initialState = {
  user: null,
  organizer: null,
  role: null,        // "user" | "organizer"
  isLoggedIn: false,
};

// Auth slice definition
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Handle successful login and role-based state update
    loginSuccess: (state, action) => {
      const { data, role } = action.payload;

      state.isLoggedIn = true;
      state.role = role || null;

      if (role === "organizer") {
        // Store organizer data when role is organizer
        state.organizer = data;
        state.user = null;
      } else {
        // Default to user role
        state.user = data;
        state.organizer = null;
        state.role = "user";
      }
    },

    // Clear auth state on logout
    logout: (state) => {
      state.user = null;
      state.organizer = null;
      state.role = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
