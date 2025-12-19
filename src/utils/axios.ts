import axios from "axios";
// import { useAuthStore } from "@/store/auth-store";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Auto attach JWT token from store
axiosInstance.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().token?.jwt;
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

export default axiosInstance;
