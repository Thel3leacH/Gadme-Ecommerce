import api from "./api";

//this is for loginUser to sent data to Backend
export const loginUser = async (email, password) => {
  const response = await api.post("/gadme/auth/cookie/login", {
    email,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("gadme/auth/logout");
  return response.data;
};

export const signupUser = async ({ fullName, email, password }) => {
  const response = await api.post("/gadme/auth/register", {
    fullName,
    email,
    password,
  });
  return response.data;
};

//make this but not sure if I understand correctly
export const getCart = async () => {
  const response = await api.get("/gadme/auth/cart");
  return response.data;
};

//BELOW are ADMIN zone
//make this but not sure if I understand correctly
export const adminItem = async () => {
  const response = await api.get("/gadme/auth/admin");
  return response.data;
};
