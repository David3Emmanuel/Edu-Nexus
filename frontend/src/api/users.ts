import { getFromApi } from '@/app/actions/api.actions'

// User data and related API functions
export interface Badge {
  id: number
  title: string
  icon: string
  gradient: 'blue' | 'green' | 'purple' | 'orange'
  description?: string
}

export interface User {
  id: number
  username: string
  email?: string
  avatar?: { url: string }
  type: 'Student' | 'Lecturer' | 'Industry Professional'
  university?: string
  program?: string
  graduationYear?: number
  location?: string
  createdAt: string
  bio?: string
  rank: number
  skillCoins: number
  weeklyRank: number
  badges: Badge[]
  totalContributions?: number
  profileViews?: number
  weeklyGain?: number
  specialties?: { id: number; name: string }[]
}

export const getAllUsers = async (): Promise<User[]> => {
  const res = await getFromApi<User[]>('/users', { populate: '*' })
  return res // formatStrapiCollection(res)
}

export const getTopContributors = async (): Promise<User[]> => {
  const res = await getFromApi<User[]>('/users', {
    populate: '*',
    'pagination[limit]': 3,
  })
  return res // formatStrapiCollection(res)
}

// API functions for users
export const getUserProfile = async (userId: number): Promise<User> => {
  const res = await getFromApi<User>(`/users/${userId}`, { populate: '*' })
  return res // formatStrapiData(res.data)
}

export const getCurrentUser = async (): Promise<User> => {
  const res = await getFromApi<User>('/users/me', { populate: '*' })
  return res // formatStrapiData(res)
}

export const getLeaderboard = async (limit: number = 10): Promise<User[]> => {
  const res = await getFromApi<User[]>('/users', {
    populate: '*',
    'pagination[limit]': limit,
    sort: 'rank:asc',
  })
  return res // formatStrapiCollection(res)
}
