'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { User, getCurrentUser } from '@/api'
import {
  login as loginAction,
  signup as signupAction,
  logout as logoutAction,
  LoginData,
  SignupData,
  AuthResponse,
} from '@/app/actions/auth.actions'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginData) => Promise<AuthResponse>
  signup: (data: SignupData) => Promise<AuthResponse>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Failed to load user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (data: LoginData) => {
    const response = await loginAction(data)
    if (response.success) {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    return response
  }

  const signup = async (data: SignupData) => {
    const response = await signupAction(data)
    if (response.success) {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    return response
  }

  const logout = async () => {
    await logoutAction()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
