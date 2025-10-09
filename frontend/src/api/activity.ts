import { get, formatStrapiCollection } from './client';

// Activity data and related API functions
export interface Activity {
  id: number
  type: 'challenge' | 'answer' | 'badge' | 'upvote'
  title: string
  author?: any
  upvotes?: number
  responses?: number
  tags?: any[]
  timeAgo: string
  challengeId?: number
  createdAt: string;
}

// API functions for activity
export const getRecentActivity = async (
  limit: number = 10,
): Promise<Activity[]> => {
  const res = await get('/activities', { populate: 'deep', 'pagination[limit]': limit, sort: 'createdAt:desc' });
  const formatted = formatStrapiCollection(res.data);
  return formatted.map((a:any) => ({...a, timeAgo: new Date(a.createdAt).toLocaleDateString()}));
}

export const getUserActivity = async (
  userId: number,
  limit: number = 20,
): Promise<Activity[]> => {
  const res = await get('/activities', {
    populate: 'deep',
    'pagination[limit]': limit,
    sort: 'createdAt:desc',
    filters: {
      user: {
        id: {
          $eq: userId
        }
      }
    }
  });
  const formatted = formatStrapiCollection(res.data);
  return formatted.map((a:any) => ({...a, timeAgo: new Date(a.createdAt).toLocaleDateString()}));
}