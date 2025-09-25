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

// API functions for authentication
export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate authentication logic
  console.log('Login attempt:', credentials)

  // For demo purposes, accept any email/password combination
  if (credentials.email && credentials.password) {
    return {
      success: true,
      message: 'Login successful',
      user: {
        id: 1,
        name: 'Aisha Johnson',
        email: credentials.email,
      },
      token: 'demo-jwt-token-12345',
    }
  }

  return {
    success: false,
    message: 'Invalid credentials',
  }
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log('Registration attempt:', data)

  // For demo purposes, accept any valid data
  if (
    data.email &&
    data.password &&
    data.firstName &&
    data.lastName &&
    data.agreeToTerms
  ) {
    return {
      success: true,
      message: 'Registration successful',
      user: {
        id: Date.now(), // Generate a simple ID
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
      },
      token: 'demo-jwt-token-' + Date.now(),
    }
  }

  return {
    success: false,
    message: 'Registration failed',
  }
}

export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log('Password reset request for:', email)

  if (email) {
    return {
      success: true,
      message: 'Password reset email sent',
    }
  }

  return {
    success: false,
    message: 'Email is required',
  }
}
