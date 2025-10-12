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
  id: string,
): Promise<Challenge & { timeAgo: string }> => {
  const res: StrapiSingleResponse<Challenge> = await getFromApi(
    `/challenges/${id}`,
    {
      populate: ['author', 'tags', 'responses.author'],
    },
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
  (Challenge & { documentId: string; timeAgo: string })[]
> => {
  const res: StrapiCollectionResponse<Challenge & { documentId: string }> =
    await getFromApi('/challenges', {
      populate: ['author', 'tags', 'responses'],
    })
  const formatted: (Challenge & { documentId: string })[] =
    formatStrapiCollection(res)
  return formatted.map((c: Challenge & { documentId: string }) => ({
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
): Promise<Challenge & { documentId: string }> => {
  const processedTagIds = await processTags(challengeData.tags)

  const strapiPayload: ChallengeStrapiPayload = {
    ...challengeData,
    tags: processedTagIds,
  }

  const res: StrapiSingleResponse<Challenge & { documentId: string }> =
    await postToApi('/challenges', strapiPayload)
  const newChallenge = formatStrapiData(res)
  if (!newChallenge) {
    throw new Error('Failed to create challenge')
  }
  return newChallenge
}

export interface ResponseFormPayload {
  content: string
  challenge: number // challenge ID
  author: number // user ID
}

export async function createResponse(
  payload: ResponseFormPayload,
): Promise<Response> {
  const response: StrapiSingleResponse<Response> = await postToApi(
    '/responses',
    payload,
  )
  const newResponse = formatStrapiData(response)
  if (!newResponse) {
    throw new Error('Failed to create response')
  }
  return newResponse
}
