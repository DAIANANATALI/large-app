import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const resolveApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || { message: error.message };
  }

  return { message: "An unknown error occurred" };
};

export { api, fetcher, resolveApiError };
