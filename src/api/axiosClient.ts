import axios from "axios";

const configuredApiUrl =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;

// API methods use the canonical `/api/...` paths. Accept both the old
// VITE_API_URL (host) and VITE_API_BASE_URL (host + /api) env names without
// ever producing a duplicated `/api/api` URL.
const apiBaseUrl = configuredApiUrl
  ? configuredApiUrl.replace(/\/+$/, "").replace(/\/api$/, "")
  : "http://localhost:8080";

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
