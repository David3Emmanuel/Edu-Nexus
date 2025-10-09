import { get, post, formatStrapiCollection, formatStrapiData } from './client';

// Challenge data and related API functions
export interface Challenge {
  id: number
  title: string
  description: string
  author: any // Should be a User object
  authorType?: 'Student' | 'Lecturer' | 'Industry Professional'
  authorBio?: string
  upvotes: number
  responses: Response[]
  skillCoins: number
  tags: any[] // Should be Tag objects
  timeAgo?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  category?: 'Real-world Challenge' | 'Academic Q&A' | 'Industry Problem'
  createdAt: string;
}

export interface Response {
  id: number
  author: any // Should be a User object
  authorType: 'Student' | 'Lecturer' | 'Industry Professional'
  university?: string
  upvotes: number
  timeAgo: string
  content: string
  isAccepted?: boolean
}

// Get detailed challenge data with responses
export const getChallengeDetail = async (id: number): Promise<Challenge> => {
  const res = await get(`/challenges/${id}`, { populate: 'deep' });
  const formatted = formatStrapiData(res.data);
  // The backend doesn't provide timeAgo, so we can calculate it or just use createdAt
  return { ...formatted, timeAgo: new Date(formatted.createdAt).toLocaleDateString() };
}

// API functions for challenges
export const getChallenges = async (): Promise<Challenge[]> => {
  const res = await get('/challenges', { populate: 'deep' });
  const formatted = formatStrapiCollection(res.data);
  return formatted.map((c:any) => ({...c, timeAgo: new Date(c.createdAt).toLocaleDateString()}));
}

export type ChallengePayload = Omit<
  Challenge,
  'id' | 'upvotes' | 'responses' | 'timeAgo' | 'createdAt'
>

export const createChallenge = async (
  challengeData: ChallengePayload,
): Promise<Challenge> => {
  const res = await post('/challenges', challengeData);
  return formatStrapiData(res.data);
}