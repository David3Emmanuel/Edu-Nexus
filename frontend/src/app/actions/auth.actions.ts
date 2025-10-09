'use server'

import { User } from '@/api'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

export interface AuthResponse {
  success: boolean
  message?: string
  user?: Partial<User>
  token?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: data.email,
        password: data.password,
      }),
    })

    const resData = await res.json()

    if (resData.error) {
      return { success: false, message: resData.error.message }
    }

    ;(await cookies()).set('jwt', resData.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return {
      success: true,
      user: {
        id: resData.user.id,
        username: resData.user.username,
        email: resData.user.email,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Login failed. Please try again.',
    }
  }
}

export async function signup(data: SignupData): Promise<AuthResponse> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      }),
    })

    const resData = await res.json()

    if (resData.error) {
      return { success: false, message: resData.error.message }
    }

    ;(await cookies()).set('jwt', resData.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return {
      success: true,
      user: {
        id: resData.user.id,
        username: resData.user.username,
        email: resData.user.email,
      },
    }
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error).message || 'Registration failed. Please try again.',
    }
  }
}

export async function logout() {
  ;(await cookies()).delete('jwt')
  redirect('/login')
}

export async function forgotPassword(email: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${STRAPI_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const resData = await res.json()

    if (resData.error) {
      return { success: false, message: resData.error.message }
    }

    return { success: true, message: 'Password reset email sent' }
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error).message ||
        'Failed to send reset email. Please try again.',
    }
  }
}

export async function getLoggedInUser(): Promise<AuthResponse> {
  try {
    const jwt = (await cookies()).get('jwt')?.value

    if (!jwt) {
      return { success: false, message: 'No JWT found.' }
    }

    const res = await fetch(`${STRAPI_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })

    const resData = await res.json()

    if (resData.error) {
      ;(await cookies()).delete('jwt')
      return { success: false, message: resData.error.message }
    }

    return {
      success: true,
      user: {
        id: resData.id,
        username: resData.username,
        email: resData.email,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to get logged in user.',
    }
  }
}
