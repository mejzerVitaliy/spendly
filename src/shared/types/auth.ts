interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface LoginRequest {
  email: string
  password: string
}

export type { 
  RegisterRequest,
  LoginRequest
 }