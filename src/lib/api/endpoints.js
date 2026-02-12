// Centralized API endpoint definitions used across the application

export const API_ENDPOINTS = {
  /* ================= EVENTS ================= */
  EVENTS: {
    ALL_PUBLIC: "/v1/events", // Fetch all public events
    ALL_PRIVATE: "/v1/events_protec", // Fetch all private (auth) events
    LIKE_EVENT: "/v1/events/like", // Like an event
    SAVE_EVENT: "/v1/events/save", // Save an event
    SINGLE_PUBLIC: (slug) => `/v1/events/${slug}`, // Public event details
    SINGLE_PRIVATE: (slug) => `/v1/events_protec/${slug}`, // Private event details
    VIEW: (slug) => `/v1/events/${slug}/view`, // Track event view
    FILTER_PUBLIC: "/v1/filter", // Public event filtering
    FILTER_PRIVATE: "/v1/filter_protec", // Private event filtering
    STATUSES: "/v1/event/statuses", // Event status list
  },

  /* ================= AUTH ================= */
  AUTH: {
    SIGNUP: "/v1/auth/signup", // User/organizer signup
    LOGIN: "/v1/auth/login", // Login
    GOOGLE_LOGIN: "/v1/auth/google-login", // Google OAuth login
    FORGOT_PASSWORD: "/v1/auth/forgot-password", // Forgot password
    VERIFY_OTP: "/v1/auth/verify-otp", // Verify OTP
    RESEND_OTP: "/v1/auth/resend-otp", // Resend OTP
    RESET_PASSWORD: "/v1/auth/reset-password", // Reset password
    ORG_VERIFY: "/v1/auth/org/verify", // Organizer email verification
    UPDATEPROFILE: "/v1/auth/update-profile", // Update user profile
    SAVED_EVENTS: (userId) => `/v1/user/saved/${userId}`, // Get saved events
  },

  /* ================= LOCATIONS ================= */
  LOCATIONS: {
    ALL_COUNTRIES: "/v1/location/countries", // Get all countries
    COUNTRIES_STATES: (statesId) => `/v1/location/countries/${statesId}/states`, // States by country
    STATES_CITIES: (citiesId) => `/v1/location/states/${citiesId}/cities`, // Cities by state
  },

  /* ================= ANALYTICS ================= */
  ANALYTICS: {
    LOCATION_COUNTS: "/v1/analytics/location-counts", // Location-wise counts
    LOCATION_EVENTS: "/v1/analytics/location", // Events by location
  },

  /* ================= USERS ================= */
  USER: {
    ALL: "/v1/users", // Get all users
    SINGLE: (userId) => `/v1/users/${userId}`, // Get single user
    UPDATE: (userId) => `/v1/user/${userId}`, // Update user
    DELETE: (userId) => `/v1/user/${userId}`, // Delete user
  },

  /* ================= ORGANIZATIONS ================= */
  ORGANIZER: {
    ALL: "/v1/organizations", // Get all organizations
    PROFILE: (orgId) => `/v1/organizations/${orgId}`, // Organization profile
    UPDATE: (orgId) => `/v1/organizations/${orgId}`, // Update organization
    DELETE: (orgId) => `/v1/organizations/${orgId}`, // Delete organization
    EVENTS: (orgId) => `/v1/organization/${orgId}/events`, // Org events (legacy)
    CREATEVENTS: (orgId) => `/v1/organizations/${orgId}/events`, // Create events
    APPROVEDEVENTS: (orgId) => `/v1/organizations/${orgId}/events`, // Approved events
    ORG_EVENTS_PUBLIC: (slug) => `/v1/organizations/${slug}/events`, // Public org events
    ORG_EVENTS_PRIVATE: (slug) => `/v1/organizations/${slug}/events_protec`, // Private org events
  },

  /* ================= MASTER DATA ================= */
  MASTER: {
    ORG_CATEGORIES: "/v1/master/org-categories", // Organization categories
    EXPLORE_EVENT_TYPE: "/v1/master/event-types", // Explore event types
    ACCOMMODATIONS: "/v1/master/accommodations", // Accommodation list
    EVENT_TYPES: (categoryId) =>
      `/v1/master/event-types/category/${categoryId}`, // Event types by category
    ALL_EVENT_TYPES: `/v1/master/event-types`, // All event types
    CATEGORIES: "/v1/master/categories", // Event categories
    CERTIFICATIONS: "/v1/master/certifications", // Certifications
    PERKS: "/v1/master/perks", // Perks list
    ELIGIBLE_DEPARTMENTS: "/v1/master/eligible-departments", // Eligible departments
    DEPARTMENTS: "/v1/master/departments", // Departments
  },
};
