// Utility to check if user is authenticated via browser cookies

export const isUserLoggedIn = () => {
  // Guard for server-side rendering
  if (typeof document === "undefined") return false;

  // Check presence of auth token cookie
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="));

  // User is considered logged in if token exists
  return Boolean(token);
};
