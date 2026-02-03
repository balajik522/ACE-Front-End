import apiPrivate from "../axiosPrivate";
import { API_ENDPOINTS } from "./endpoints";
import { handleApi } from "./apiHelper";

/* ================= USERS ================= */

// GET ALL USERS
export const getAllUsersApi = () =>
  handleApi(apiPrivate.get(API_ENDPOINTS.USER.ALL));

// GET USER PROFILE
export const getUserProfileApi = (userId) =>
  handleApi(apiPrivate.get(API_ENDPOINTS.USER.SINGLE(userId)));

// UPDATE USER PROFILE
export const updateUserProfileApi = (userId, data) =>
  handleApi(apiPrivate.put(API_ENDPOINTS.USER.UPDATE(userId), data));

// DELETE USER
export const deleteUserApi = (userId) =>
  handleApi(apiPrivate.delete(API_ENDPOINTS.USER.DELETE(userId)));
