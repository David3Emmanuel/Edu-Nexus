import { formatStrapiCollection } from './client'
import { getFromApi } from '@/app/actions/api.actions'
import type { Challenge, Response } from './challenges'
import type { User, Badge } from './users'

// Raw activity data from Strapi
export interface Activity {
  id: number
  type: 'challenge' | 'answer' | 'badge' | 'upvote'
  user: User
  challenge?: Challenge
  response?: Response & { challenge?: Challenge } // Response might be populated with its challenge
  badge?: Badge
  createdAt: string
}

// Activity data formatted for UI components
export interface UiActivity {
  id: number
  type: 'challenge' | 'answer' | 'badge' | 'upvote'
  title: string
  author: User
  upvotes?: number
  responses?: number
  tags?: any[]
  timeAgo: string
  challengeId?: number
  createdAt: string
}

const mapActivityToUiActivity = (activity: Activity): UiActivity => {
  const timeAgo = new Date(activity.createdAt).toLocaleDateString()
  const base = {
    id: activity.id,
    type: activity.type,
    author: activity.user,
    createdAt: activity.createdAt,
    timeAgo,
  }

  switch (activity.type) {
    case 'challenge':
      return {
        ...base,
        title: activity.challenge?.title || 'Untitled Challenge',
        upvotes: activity.challenge?.upvotes,
        responses: activity.challenge?.responses?.length,
        tags: activity.challenge?.tags,
        challengeId: activity.challenge?.id,
      }
    case 'answer':
      return {
        ...base,
        title: `Responded to "${
          activity.response?.challenge?.title || 'a challenge'
        }"`,
        challengeId: activity.response?.challenge?.id,
      }
    case 'badge':
      return {
        ...base,
        title: `Earned a new badge: ${activity.badge?.title || ''}`,
      }
    case 'upvote':
      const upvotedItem = activity.challenge || activity.response
      const upvotedType = activity.challenge ? 'challenge' : 'response'
      const title = upvotedItem
        ? (upvotedItem as Challenge).title || 'a post'
        : 'a post'
      return {
        ...base,
        title: `Upvoted a ${upvotedType}: "${title}"`,
        challengeId:
          activity.challenge?.id ||
          (activity.response?.challenge as Challenge)?.id,
      }
    default:
      return {
        ...base,
        title: 'New activity',
      }
  }
}

// API functions for activity
export const getRecentActivity = async (
  limit: number = 10,
): Promise<UiActivity[]> => {
  const res = await getFromApi('/activities', {
    'pagination[limit]': limit,
    sort: 'createdAt:desc',
  })
  const formatted: Activity[] = formatStrapiCollection(res.data)
  return formatted.map(mapActivityToUiActivity)
}

export const getUserActivity = async (
  userId: number,
  limit: number = 20,
): Promise<UiActivity[]> => {
  const res = await getFromApi('/activities', {
    'pagination[limit]': limit,
    sort: 'createdAt:desc',
    filters: {
      user: {
        id: { $eq: userId },
      },
    },
    populate: '*',
  })
  const formatted: Activity[] = formatStrapiCollection(res.data)
  return formatted.map(mapActivityToUiActivity)
}
