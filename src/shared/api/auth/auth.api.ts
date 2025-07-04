import { GetMeResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, VerifyTwoFactorRequest } from "@/shared/types";
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

const verifyTwoFactor = async (request: VerifyTwoFactorRequest): Promise<LoginResponse> => {
  const response = await api.post("/auth/login/two-factor", request)

  return response.data;
}

const resendTwoFactorCode = async (email: string) => {
  await api.post("/auth/login/two-factor/resend", { email })
}

const toggleTwoFactor = async () => {
  await api.put("/auth/toggle-two-factor")
}

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
  toggleTwoFactor,
  getUser,
  logout,
  verifyTwoFactor,
  resendTwoFactorCode
}
