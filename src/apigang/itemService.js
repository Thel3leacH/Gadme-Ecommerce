import api from "./api";

//Fetch items from the database
export const fetchItems = async ({ page = 1, limit = 10, q } = {}) => {
  const params = { page, limit };
  if (q && String(q).trim()) params.q = q.trim();
  const response = await api.get("/gadme/get-all-items", { params });
  return response.data;
};

// Fetch a single item by ID
export const getItemById = async (itemId) => {
  const response = await api.get(`/gadme/get-item/${itemId}`);
  return response.data;
};

// Create a new item to database
export const createItem = async (itemData) => {
  const response = await api.post("/gadme/add-item", itemData);
  return response.data;
};

// Update an existing item
export const updateItem = async (itemId, updatedData) => {
  const response = await api.put(`/gadme/edit-item/${itemId}`, updatedData);
  return response.data;
};

// Delete an item from database
export const deleteItem = async (itemId) => {
  const response = await api.delete(`/gadme/delete-item/${itemId}`);
  return response.data;
};

// Search items by productname, features, or tags
// Backward-compatible search wrapper; now delegates to paginated endpoint
export const searchItems = async (query, { page = 1, limit = 10 } = {}) => {
  return fetchItems({ page, limit, q: query });
};

//not sure if I understand it correctly
// Access Cart of the user
export const addItemCart = async (itemData) => {
  const response = await api.post("/gadme/add-item/cart", itemData);
  return response.data;
};

//not sure
// Update an existing item in cart
export const updateItemCart = async (itemId, updatedData) => {
  const response = await api.put(
    `/gadme/edit-item/${itemId}/cart`,
    updatedData
  );
  return response.data;
};

//not sure
// Delete an item from database
export const deleteItemCart = async (itemId) => {
  const response = await api.delete(`/gadme/delete-item/${itemId}/cart`);
  return response.data;
};
