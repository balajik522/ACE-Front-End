/**
 * Authentication utility module
 * Provides helper functions for authentication-related operations
 */

/**
 * Checks if the user is currently logged in
 * Verifies the presence of authToken in browser cookies
 */
export const isUserLoggedIn = () => {
  // Skip execution during SSR - document object is only available in browser
  if (typeof document === "undefined") return false;

  // Retrieve authToken cookie from document cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="));

  // Return true if token exists, false otherwise
  return Boolean(token);
};
