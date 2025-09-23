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
  const response = await api.post("/api/gadme/add-product", productData);
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
// ดึงรายการในตะกร้าของผู้ใช้
export const getCartByUser = async () => {
  const res = await api.get("/api/cart");
  return res.data;
};

// ดึงสรุป meta ของตะกร้า (เช่น count, total) — เบากว่าดึงทั้งรายการ
export const getCartMeta = async () => {
  const res = await api.get("/api/cart/meta");
  return res.data;
};

// นับจำนวนรายการในตะกร้า
export const getCartCount = async () => {
  const res = await api.get("/api/cart/count");
  return res.data;
};

// Access Cart of the user
export const addProductCart = async (productData) => {
  const response = await api.post("/api/cart", productData);
  return response.data;
};

// Update an existing product in cart
export const updateProductCart = async (productId, updatedData) => {
  const response = await api.put(`/api/cart/${productId}`, updatedData);
  return response.data;
};

// Delete an product from cart
export const deleteProductCart = async (productId) => {
  const response = await api.delete(`/api/cart/${productId}`);
  return response.data;
};

// ลบตะกร้าทั้งหมดของผู้ใช้
export const clearCart = async () => {
  const res = await api.delete("/api/cart");
  return res.data;
};
