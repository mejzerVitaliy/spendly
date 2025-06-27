import { env } from "@/env";
import axios from "axios";
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

let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    const isRefreshEndpoint = originalRequest?.url?.includes('/auth/refresh');
    
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshEndpoint) {
      originalRequest._retry = true;

      if (isRefreshing) {
        try {
          await refreshPromise;
          const storedTokens = localStorage.getItem("authTokens");
          if (storedTokens) {
            const { accessToken } = JSON.parse(storedTokens);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      isRefreshing = true;
      
      try {
        const storedTokens = localStorage.getItem("authTokens");
        if (!storedTokens) {
          throw new Error("No tokens available in localStorage");
        }

        const { refreshToken } = JSON.parse(storedTokens);

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/refresh`, { 
          refreshToken 
        });
        
        const newTokens = {
          accessToken: refreshResponse.data.data.accessToken,
          refreshToken: refreshResponse.data.data.refreshToken,
        };
        
        localStorage.setItem("authTokens", JSON.stringify(newTokens));
        useAuthStore.getState().setTokens(newTokens.accessToken, newTokens.refreshToken);

        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

        isRefreshing = false;
        refreshPromise = null;
        
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        console.error("Refresh error details:", (refreshError as unknown as { response?: { data: unknown } }).response?.data);
        
        useAuthStore.getState().setTokens('', '');
        
        isRefreshing = false;
        refreshPromise = null;
        
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401 && isRefreshEndpoint) {
      useAuthStore.getState().setTokens('', '');
    }

    return Promise.reject(error);
  }
);

export { api };