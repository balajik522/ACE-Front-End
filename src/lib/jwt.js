import Cookies from "js-cookie";

/**
 * JWT Token Decoder
 * Decodes authentication token from cookies and extracts payload data
 */
export const decodeAuthToken = () => {
  try {
    const token = Cookies.get("authToken");
    if (!token) return null;

    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    return decoded;
  } catch (err) {
    return null;
  }
};
