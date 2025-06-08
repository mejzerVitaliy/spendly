import { env } from "@/env";
import axios from "axios";
import { RefreshResponse } from "@/shared/types";
import { useAuthStore } from "@/shared/stores";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use((config) => {
  const storedTokens = localStorage.getItem("authTokens");
  if (!storedTokens) {
    return config;
  }

  try {
    const { accessToken } = JSON.parse(storedTokens);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.error("Error parsing auth tokens:", error);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedTokens = localStorage.getItem("authTokens");
        if (!storedTokens) {
          throw new Error("No tokens available");
        }

        const { refreshToken } = JSON.parse(storedTokens);

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data }: RefreshResponse = await api.post("/auth/refresh", { refreshToken });

        const newTokens = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        localStorage.setItem("authTokens", JSON.stringify(newTokens));
        useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);

        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        useAuthStore.getState().setTokens('', '');
        localStorage.removeItem("authTokens");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };