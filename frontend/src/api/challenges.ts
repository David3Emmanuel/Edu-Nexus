import {
  formatStrapiCollection,
  formatStrapiData,
  StrapiSingleResponse,
  StrapiCollectionResponse,
} from './client'
import { getFromApi, postToApi } from '@/app/actions/api.actions'
import type { User } from './users'
import { processTags, Tag } from './tags'

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

export const getChallengeDetail = async (
  id: number,
): Promise<Challenge & { timeAgo: string }> => {
  const res: StrapiSingleResponse<Challenge> = await getFromApi(
    `/challenges/${id}`,
    {},
  )
  const formatted = formatStrapiData(res)
  if (!formatted) {
    throw new Error('Challenge not found')
  }
  return {
    ...formatted,
    timeAgo: new Date(formatted.createdAt).toLocaleDateString(),
  }
}

export const getChallenges = async (): Promise<
  (Challenge & { timeAgo: string })[]
> => {
  const res: StrapiCollectionResponse<Challenge> = await getFromApi(
    '/challenges',
    {},
  )
  const formatted: Challenge[] = formatStrapiCollection(res)
  return formatted.map((c: Challenge) => ({
    ...c,
    timeAgo: new Date(c.createdAt).toLocaleDateString(),
  }))
}

export type ChallengeFormPayload = Omit<
  Challenge,
  'id' | 'upvotes' | 'responses' | 'createdAt' | 'author' | 'tags'
> & {
  author: number
  tags: string[]
}

export type ChallengeStrapiPayload = Omit<
  Challenge,
  'id' | 'upvotes' | 'responses' | 'createdAt' | 'author' | 'tags'
> & {
  author: number
  tags: number[]
}

export const createChallenge = async (
  challengeData: ChallengeFormPayload,
): Promise<Challenge> => {
  const processedTagIds = await processTags(challengeData.tags)

  const strapiPayload: ChallengeStrapiPayload = {
    ...challengeData,
    tags: processedTagIds,
  }

  console.log(strapiPayload)

  const res: StrapiSingleResponse<Challenge> = await postToApi(
    '/challenges',
    strapiPayload,
  )
  const newChallenge = formatStrapiData(res)
  if (!newChallenge) {
    throw new Error('Failed to create challenge')
  }
  return newChallenge
}
