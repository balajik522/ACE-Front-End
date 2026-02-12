// Encode and decode helper for safely exposing IDs in URLs

// Encode real ID to obfuscated, URL-safe format
export const encodeId = (id) => {
  return encodeURIComponent(btoa(id));
};

// Decode obfuscated ID back to original value
export const decodeId = (encoded) => {
  try {
    return atob(decodeURIComponent(encoded));
  } catch {
    // Return null for invalid or tampered values
    return null;
  }
};
