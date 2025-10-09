// Authentication data and related API functions
export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: {
    id: number
    name: string
    email: string
  }
  token?: string
}