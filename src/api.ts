// api.ts
import axios, { AxiosInstance } from "axios";

console.log(process.env.NEXT_PUBLIC_API_SERVER_URL);

const Axios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add this interceptor to update the Authorization header before each request
Axios.interceptors.request.use((config: any) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers?.Authorization;
  }
  return config;
});

export default Axios;
