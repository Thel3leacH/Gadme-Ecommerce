import api from "./api";

//this is for loginUser to sent data to Backend
export const loginUser = async (email, password) => {
  const response = await api.post(
    "/api/auth/cookie/login",
    {
      user_email: email,
      user_password: password,
    },
    {
      withCredentials: true,
    }
  );
  console.log("API response loginUser:", response);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const signupUser = async (name, lastName, userName, email, password) => {
  const response = await api.post("/api/auth/signup", {
    name,
    lastName,
    userName,
    email,
    password,
  });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/api/auth/profile");
  return response.data;
};

export const adminDashbord = async () => {
  const response = await api.get("/api/admin/dashboard");
  return response.data;
};

//make this but not sure if I understand correctly
export const getCart = async () => {
  const response = await api.get("/api/gadme/auth/cart");
  return response.data;
};

//BELOW are ADMIN zone
//make this but not sure if I understand correctly
export const adminProduct = async () => {
  const response = await api.get("/api/gadme/auth/admin");
  return response.data;
};
