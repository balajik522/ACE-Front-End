import { createSlice } from "@reduxjs/toolkit";

// ============================================
// AUTH SLICE
// Manages user/organizer authentication state
// ============================================

const initialState = {
  user: null,
  organizer: null,
  role: null,        // "user" | "organizer"
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { data, role } = action.payload;

      state.isLoggedIn = true;
      state.role = role || null;

      if (role === "organizer") {
        state.organizer = data;
        state.user = null;
      } else {
        // default user
        state.user = data;
        state.organizer = null;
        state.role = "user";
      }
    },

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
