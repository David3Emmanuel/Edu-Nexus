// Activity data and related API functions
export interface Activity {
  id: number
  type: 'challenge' | 'answer' | 'badge' | 'upvote'
  title: string
  author?: string
  upvotes?: number
  responses?: number
  tags?: string[]
  timeAgo: string
  challengeId?: number
}

// Recent activity data
export const recentActivity: Activity[] = [
  {
    id: 1,
    type: 'challenge',
    title: 'How to optimize water filtration in rural communities?',
    author: 'Dr. Sarah Mitchell',
    upvotes: 23,
    responses: 8,
    tags: ['#Engineering', '#NGO'],
    timeAgo: '2 hours ago',
    challengeId: 1,
  },
  {
    id: 2,
    type: 'answer',
    title: 'Your answer to "Sustainable packaging solutions for e-commerce"',
    upvotes: 15,
    tags: ['#Business', '#Sustainability'],
    timeAgo: '1 day ago',
    challengeId: 3,
  },
  {
    id: 3,
    type: 'challenge',
    title: 'Machine learning approach to predict student dropout rates',
    author: 'Prof. James Chen',
    upvotes: 31,
    responses: 12,
    tags: ['#AI', '#Education'],
    timeAgo: '3 days ago',
    challengeId: 4,
  },
  {
    id: 4,
    type: 'badge',
    title: 'Earned "Problem Solver" badge',
    timeAgo: '1 week ago',
  },
  {
    id: 5,
    type: 'upvote',
    title: 'Your solution received 10 upvotes',
    timeAgo: '1 week ago',
    challengeId: 2,
  },
]

// API functions for activity
export const getRecentActivity = async (
  limit: number = 10,
): Promise<Activity[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return recentActivity.slice(0, limit)
}

export const getUserActivity = async (
  userId: number,
  limit: number = 20,
): Promise<Activity[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  // In a real API, this would filter by userId
  return recentActivity.slice(0, limit)
}
