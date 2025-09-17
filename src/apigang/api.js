import axios from "axios";

//set baseURL to pick VITE_API_URL in develop(npm run dev) or VITE_PUBLIC_API_URL in production from real http link
export const baseURL = import.meta.env.VITE_API_URL;

//will use this api as Axios that have to verify cookie from "withCredentials: true"
const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
