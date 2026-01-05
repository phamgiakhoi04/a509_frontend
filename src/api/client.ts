// src/api/client.ts
import axios from "axios";

const client = axios.create({
  baseURL: "/api",
  headers: {
    "Accept": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;