import { post } from './client';

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
  try {
    const { jwt, user } = await post('/auth/local', {
      identifier: credentials.email,
      password: credentials.password,
    });
    return {
      success: true,
      token: jwt,
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Login failed. Please try again.',
    };
  }
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const { jwt, user } = await post('/auth/local/register', {
      username: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
    });
    return {
      success: true,
      token: jwt,
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Registration failed. Please try again.',
    };
  }
}

export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  try {
    await post('/auth/forgot-password', { email });
    return {
      success: true,
      message: 'Password reset email sent',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Email is required',
    };
  }
}