// ============================================
// LOCATION API
// Fetches countries, states, and cities data
// ============================================

const BASE = process.env.NEXT_PUBLIC_LOCATION_API_BASE;

/**
 * Get list of countries
 */
export const getCountries = async () => {
  const res = await fetch(`${BASE}/countries/iso`);
  const json = await res.json();
  return json.data.map((c) => ({ code: c.Iso2, name: c.name }));
};

/**
 * Get states for a given country
 */
export const getStates = async (country) => {
  const res = await fetch(`${BASE}/countries/states`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country }),
  });
  const json = await res.json();
  return json.data.states.map((s) => ({ code: s.name, name: s.name }));
};

/**
 * Get cities for a given country and state
 */
export const getCities = async (country, state) => {
  const res = await fetch(`${BASE}/countries/state/cities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country, state }),
  });
  const json = await res.json();
  return json.data.map((c) => ({ code: c, name: c }));
};
