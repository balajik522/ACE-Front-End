/**
 * Standardized API response handler for async requests.
 *
 * Resolves successful API promises and normalizes error responses
 * to a consistent structure for easier consumption by the UI.
 */
export const handleApi = async (promise) => {
  try {
    const res = await promise; // Await API promise resolution
    return res.data; // Return response payload directly
  } catch (err) {
    return {
      status: false,
      // Prefer backend error message, fallback to generic message
      message:
        err.response?.data?.message ||
        "Something went wrong",
    };
  }
};
