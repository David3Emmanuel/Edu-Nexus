import { formatStrapiCollection, formatStrapiData } from './client'
import { getFromApi, postToApi } from '@/app/actions/api.actions'
import type { User } from './users'

// Challenge data and related API functions
export interface Tag {
  id: number
  name: string
}

export interface Response {
  id: number
  author: User
  upvotes: number
  createdAt: string
  content: string
  isAccepted?: boolean
}

export interface Challenge {
  id: number
  title: string
  description: string
  author: User
  upvotes: number
  responses: Response[]
  skillCoins: number
  tags: Tag[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: 'Real-world Challenge' | 'Academic Q&A' | 'Industry Problem'
  createdAt: string
}

// Get detailed challenge data with responses
export const getChallengeDetail = async (
  id: number,
): Promise<Challenge & { timeAgo: string }> => {
  const res = await getFromApi(`/challenges/${id}`, {})
  const formatted: Challenge = formatStrapiData(res.data)
  // The backend doesn't provide timeAgo, so we can calculate it or just use createdAt
  return {
    ...formatted,
    timeAgo: new Date(formatted.createdAt).toLocaleDateString(),
  }
}

// API functions for challenges
export const getChallenges = async (): Promise<
  (Challenge & { timeAgo: string })[]
> => {
  const res = await getFromApi('/challenges', {})
  const formatted: Challenge[] = formatStrapiCollection(res.data)
  return formatted.map((c: Challenge) => ({
    ...c,
    timeAgo: new Date(c.createdAt).toLocaleDateString(),
  }))
}

export type ChallengePayload = Omit<
  Challenge,
  'id' | 'upvotes' | 'responses' | 'createdAt' | 'author'
> & { author: number }

export const createChallenge = async (
  challengeData: ChallengePayload,
): Promise<Challenge> => {
  const res = await postToApi('/challenges', { data: challengeData })
  return formatStrapiData(res.data)
}
