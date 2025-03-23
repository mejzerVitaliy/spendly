import { env } from "@/env";
import axios from "axios";
import { RefreshResponse } from "@/shared/types";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use((config) => {
  const {accessToken} = JSON.parse(localStorage.getItem("authTokens") as string) || {accessToken: ''};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const {refreshToken} = JSON.parse(localStorage.getItem("authTokens") as string);

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data }: RefreshResponse = await axios.post("/auth/refresh", { refreshToken });

        localStorage.setItem("authTokens", JSON.stringify(data));

        error.config.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(error.config);
      } catch (refreshError) {
        localStorage.removeItem("authTokens");
        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export {api}