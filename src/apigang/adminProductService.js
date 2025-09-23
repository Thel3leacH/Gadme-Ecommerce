import api from "./api";

// 📥 สร้างสินค้าใหม่ (Create)
export const createProduct = async (productData) => {
  const response = await api.post("/add-product", productData, {
    withCredentials: true,
  });
  return response.data;
};

// 📤 ดึงสินค้าทั้งหมด (Read)
export const getAllProducts = async () => {
  const response = await api.get("/products", {
    withCredentials: true,
  });
  return response.data;
};

// 🔍 ดึงสินค้าตาม ID (Read One)
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// 📝 แก้ไขสินค้า (Update)
export const updateProduct = async (id, updatedData) => {
  const response = await api.put(`/products/${id}`, updatedData, {
    withCredentials: true,
  });
  return response.data;
};

// ❌ ลบสินค้า (Delete)
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
