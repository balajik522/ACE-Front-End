// User management API functions (auth required)

import apiPrivate from "../axiosPrivate";
import { API_ENDPOINTS } from "./endpoints";
import { handleApi } from "./apiHelper";

/* ================= USERS ================= */

// Fetch all users
export const getAllUsersApi = () =>
  handleApi(apiPrivate.get(API_ENDPOINTS.USER.ALL));

// Fetch single user profile
export const getUserProfileApi = (userId) =>
  handleApi(apiPrivate.get(API_ENDPOINTS.USER.SINGLE(userId)));

// Update user profile
export const updateUserProfileApi = (userId, data) =>
  handleApi(apiPrivate.put(API_ENDPOINTS.USER.UPDATE(userId), data));

// Delete user
export const deleteUserApi = (userId) =>
  handleApi(apiPrivate.delete(API_ENDPOINTS.USER.DELETE(userId)));
