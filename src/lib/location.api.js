// src/lib/location.api.js
// Location and analytics related public API helpers

import apiPublic from "./axiosPublic";
import { API_ENDPOINTS } from "./api/endpoints";
import { handleApi } from "./api/apiHelper";

/* =======================
   COUNTRIES
======================= */

// Fetch all countries
export const getCountries = async () => {
  const res = await handleApi(
    apiPublic.get(API_ENDPOINTS.LOCATIONS.ALL_COUNTRIES),
  );

  // Expected: [{ identity, name }]
  return res?.status ? res.data : [];
};

/* =======================
   STATES (by countryId)
======================= */

// Fetch states for a given country
export const getStates = async (countryId) => {
  if (!countryId) return [];

  const res = await handleApi(
    apiPublic.get(API_ENDPOINTS.LOCATIONS.COUNTRIES_STATES(countryId)),
  );

  // Expected: [{ identity, name }]
  return res?.status ? res.data : [];
};

/* =======================
   CITIES (by stateId)
======================= */

// Fetch cities for a given state
export const getCities = async (stateId) => {
  if (!stateId) return [];

  const res = await handleApi(
    apiPublic.get(API_ENDPOINTS.LOCATIONS.STATES_CITIES(stateId)),
  );

  // Expected: [{ identity, name }]
  return res?.status ? res.data : [];
};

/* =======================
   LOCATION COUNTS
======================= */

// Fetch aggregated location analytics
export const getLocationCounts = async () => {
  const res = await handleApi(
    apiPublic.get(API_ENDPOINTS.ANALYTICS.LOCATION_COUNTS),
  );

  return res?.status ? res.data : null;
};

/* =======================
   LOCATION EVENTS
======================= */

// Fetch events filtered by location with pagination
export const getLocationEvents = async ({ countryId, cityId, page = 1 }) => {
  let query = `?page=${page}`;

  if (countryId) {
    query += `&country=${countryId}`;
  }

  if (cityId) {
    query += `&city=${cityId}`;
  }

  const res = await handleApi(
    apiPublic.get(`${API_ENDPOINTS.ANALYTICS.LOCATION_EVENTS}${query}`),
  );

  return res?.status ? res : null;
};
