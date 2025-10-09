import { get, formatStrapiCollection, formatStrapiData } from './client';

// User data and related API functions
export interface User {
  id: number
  name: string
  email?: string
  avatar?: string
  type: 'Student' | 'Lecturer' | 'Industry Professional'
  university?: string
  program?: string
  graduationYear?: number
  location?: string
  joinedDate?: string
  bio?: string
  rank: number
  skillCoins: number
  weeklyRank: number
  badges: Badge[]
  totalContributions?: number
  profileViews?: number
  weeklyGain?: number
  specialties?: string[]
}

export interface Badge {
  title: string
  icon: string
  gradient: 'blue' | 'green' | 'purple' | 'orange'
  description?: string
  earnedDate?: string
}

export const getAllUsers = async (): Promise<User[]> => {
  const res = await get('/users', { populate: '*' });
  return formatStrapiCollection(res.data);
}

export const getTopContributors = async (): Promise<User[]> => {
  const res = await get('/users', { populate: '*', 'pagination[limit]': 3, sort: 'skillCoins:desc' });
  return formatStrapiCollection(res.data);
}

// API functions for users
export const getUserProfile = async (userId: number): Promise<User> => {
  const res = await get(`/users/${userId}`, { populate: '*' });
  return formatStrapiData(res.data);
}

export const getCurrentUser = async (): Promise<User> => {
  // This should be implemented with authentication
  // For now, we fetch a specific user
  const res = await get('/users/1', { populate: '*' });
  return formatStrapiData(res.data);
}

export const getLeaderboard = async (limit: number = 10): Promise<User[]> => {
  const res = await get('/users', { populate: '*', 'pagination[limit]': limit, sort: 'rank:asc' });
  return formatStrapiCollection(res.data);
}