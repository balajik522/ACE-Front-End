// Decode JWT payload from auth token stored in cookies

import Cookies from "js-cookie";

// Safely decode auth token without verification
export const decodeAuthToken = () => {
  try {
    // Read token from cookies
    const token = Cookies.get("authToken");
    if (!token) return null;

    // Decode JWT payload (middle part)
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    // Return decoded payload (data, iat, exp)
    return decoded;
  } catch (err) {
    // Return null for invalid or malformed tokens
    return null;
  }
};
