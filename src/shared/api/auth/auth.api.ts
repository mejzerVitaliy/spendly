import { LoginRequest, RegisterRequest } from "@/shared/types";
import { api } from "@/shared/api";

const register = async (request: RegisterRequest) => {
  const response = await api.post(
    "/auth/register",
    request
  )

  return response.data;
}

const login = async (request: LoginRequest) => {
  const response = await api.post(
    "/auth/login", 
    request
  );
  
  return response.data;
};

const getUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const authApi = {
  register,
  login,
  getUser
}
