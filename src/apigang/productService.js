import api from "./api";

//Fetch products from the database
export const fetchProducts = async ({ page = 1, limit = 10, q } = {}) => {
  const params = { page, limit };
  if (q && String(q).trim()) params.q = q.trim();
  const response = await api.get("/api/gadme/get-all-products", { params });
  return response.data;
};

// Fetch a single product by ID
export const getProductById = async (productId) => {
  const response = await api.get(`/api/gadme/get-product/${productId}`);
  return response.data;
};

// Create a new product to database
export const createProduct = async (productData) => {
  const response = await api.post("/api/add-product", productData);
  return response.data;
};

// Update an existing product
export const updateProduct = async (productId, updatedData) => {
  const response = await api.put(
    `/api/gadme/edit-product/${productId}`,
    updatedData
  );
  return response.data;
};

// Delete an product from database
export const deleteProduct = async (productId) => {
  const response = await api.delete(`/api/gadme/delete-product/${productId}`);
  return response.data;
};

// Search products by productname, features, or tags
// Backward-compatible search wrapper; now delegates to paginated endpoint
export const searchProducts = async (query, { page = 1, limit = 10 } = {}) => {
  return fetchProducts({ page, limit, q: query });
};

//Below are all cart service
// Access Cart of the user
export const addProductCart = async (productData) => {
  const response = await api.post("/api/gadme/add-product/cart", productData);
  return response.data;
};

// Update an existing product in cart
export const updateProductCart = async (productId, updatedData) => {
  const response = await api.put(
    `/api/gadme/edit-product/${productId}/cart`,
    updatedData
  );
  return response.data;
};

// Delete an product from cart
export const deleteProductCart = async (productId) => {
  const response = await api.delete(
    `/api/gadme/delete-product/${productId}/cart`
  );
  return response.data;
};
