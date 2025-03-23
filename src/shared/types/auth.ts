import { ApiResponse, User } from "@/shared/types"

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface RegisterResponse 
  extends ApiResponse<{
    user: User
    accessToken: string
    refreshToken: string
  }> {}

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse 
  extends ApiResponse<{
    user: User
    accessToken: string
    refreshToken: string
  }> {}

interface RefreshResponse 
  extends ApiResponse<{
    accessToken: string
    refreshToken: string
  }> {}

interface GetMeResponse 
  extends ApiResponse<User> {}

export type { 
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  GetMeResponse,
 }