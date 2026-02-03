// ============================================
// API HELPER
// Wraps API promises with standardized error handling
// ============================================

export const handleApi = async (promise) => {
  try {
    const res = await promise;
    return res.data;
  } catch (err) {
    return {
      status: false,
      message:
        err.response?.data?.message ||
        "Something went wrong",
    };
  }
};
