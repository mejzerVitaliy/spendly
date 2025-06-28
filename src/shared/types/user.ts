interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

interface UpdateUserRequest {
  firstName?: string
  lastName?: string
  email?: string
}

interface UpdateAvatarRequest {
  avatar: File
}

export type { 
  User,
  UpdateUserRequest,
  UpdateAvatarRequest
}