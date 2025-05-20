// Utility for interacting with local JSON Server
const BASE_URL = "http://localhost:3000";

/**
 * Fetches data from a given endpoint.
 * @param {string} endpoint - The API endpoint to fetch from.
 * @returns {Promise<any>} - The JSON response.
 * @throws {Error} - If the fetch fails.
 */
async function fetchData(endpoint) {
  const res = await fetch(`${BASE_URL}/${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  return res.json();
}

/**
 * Retrieves all items from a resource.
 * @param {string} resource - The resource name (e.g., 'users').
 * @returns {Promise<any[]>} - Array of resource items.
 */
async function getAll(resource) {
  return fetchData(resource);
}

/**
 * Retrieves a single item by ID from a resource.
 * @param {string} resource - The resource name.
 * @param {number|string} id - The ID of the item.
 * @returns {Promise<any>} - The resource item.
 */
async function getById(resource, id) {
  return fetchData(`${resource}/${id}`);
}

/**
 * Creates a new item in a resource.
 * @param {string} resource - The resource name.
 * @param {object} data - The data to create.
 * @returns {Promise<any>} - The created resource item.
 */
async function create(resource, data) {
  const res = await fetch(`${BASE_URL}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Updates an existing item in a resource.
 * @param {string} resource - The resource name.
 * @param {number|string} id - The ID of the item.
 * @param {object} data - The updated data.
 * @returns {Promise<any>} - The updated resource item.
 */
async function update(resource, id, data) {
  const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Partially updates an existing item in a resource.
 * @param {string} resource - The resource name.
 * @param {number|string} id - The ID of the item.
 * @param {object} data - The partial data to update.
 * @returns {Promise<any>} - The updated resource item.
 */
async function patch(resource, id, data) {
  const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Removes an item from a resource.
 * @param {string} resource - The resource name.
 * @param {number|string} id - The ID of the item.
 * @returns {Promise<boolean>} - True if deletion was successful.
 */
async function remove(resource, id) {
  const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

// Export functions
export {
  getAll,
  getById,
  create,
  update,
  patch,
  remove,
};
