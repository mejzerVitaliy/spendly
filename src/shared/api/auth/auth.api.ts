import { GetMeResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/shared/types";
import { api } from "@/shared/api";

const register = async (request: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post(
    "/auth/register",
    request
  )

  return response.data;
}

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post(
    "/auth/login", 
    request
  );
  
  return response.data;
};

const getUser = async (): Promise<GetMeResponse> => {
  const response = await api.get("/auth/me");

  return response.data;
};

const logout = async () => {
  await api.put("/auth/logout");
}

export const authApi = {
  register,
  login,
  getUser,
  logout
}
