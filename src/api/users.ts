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

// Current user data
export const currentUser: User = {
  id: 1,
  name: 'Aisha Johnson',
  email: 'aisha.johnson@mit.edu',
  type: 'Student',
  university: 'MIT',
  program: 'Computer Science (B.S.)',
  graduationYear: 2025,
  location: 'Cambridge, MA',
  joinedDate: 'September 2024',
  bio: 'Final year Computer Science student passionate about machine learning and sustainable technology. Active contributor to open-source projects and mentor for underclassmen.',
  rank: 3,
  skillCoins: 1247,
  weeklyRank: 2,
  totalContributions: 42,
  profileViews: 156,
  badges: [
    {
      title: 'Top Contributor',
      icon: '🏆',
      gradient: 'blue',
      description: 'Earned for 25+ quality contributions',
      earnedDate: '2 weeks ago',
    },
    {
      title: 'Problem Solver',
      icon: '💡',
      gradient: 'green',
      description: 'Provided 10 accepted solutions',
      earnedDate: '1 month ago',
    },
    {
      title: 'Mentor',
      icon: '🎓',
      gradient: 'purple',
      description: 'Helped 20+ fellow students',
      earnedDate: '3 weeks ago',
    },
    {
      title: 'Team Player',
      icon: '🤝',
      gradient: 'orange',
      description: 'Collaborated on 5+ group challenges',
      earnedDate: '1 week ago',
    },
  ],
}

// Leaderboard data
const manuallyAddedUsers: User[] = [
  {
    id: 1001,
    name: 'Aisha Johnson',
    type: 'Student',
    university: 'MIT',
    rank: 1,
    skillCoins: 2847,
    weeklyRank: 1,
    totalContributions: 45,
    badges: [
      { title: 'Top Contributor', icon: '🏆', gradient: 'blue' },
      { title: 'Problem Solver', icon: '💡', gradient: 'green' },
      { title: 'Mentor', icon: '🎓', gradient: 'purple' },
    ],
    weeklyGain: 234,
    specialties: ['Machine Learning', 'Data Science'],
  },
  {
    id: 1002,
    name: 'Dr. Marcus Chen',
    type: 'Lecturer',
    university: 'Stanford',
    rank: 2,
    skillCoins: 2156,
    weeklyRank: 2,
    totalContributions: 38,
    badges: [
      { title: 'Expert', icon: '⭐', gradient: 'orange' },
      { title: 'Innovator', icon: '💡', gradient: 'green' },
    ],
    weeklyGain: 198,
    specialties: ['Software Engineering', 'AI'],
  },
]

const fetchMoreUsers = async () => {
  const response = await fetch(
    'https://68d58d52e29051d1c0aefbcd.mockapi.io/users_',
  )
  const data = await response.json()
  return data as User[]
}

export const allUsers = [...manuallyAddedUsers, ...(await fetchMoreUsers())]
export const topContributors = allUsers.slice(0, 3)

// API functions for users
export const getUserProfile = async (userId: number): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (userId === 1) {
    return currentUser
  }

  // Return a user from leaderboard for other IDs
  const user = allUsers.find((u: User) => u.id === userId)
  if (user) {
    return user
  }

  throw new Error('User not found')
}

export const getCurrentUser = async (): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return currentUser
}

export const getLeaderboard = async (limit: number = 10): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))
  return allUsers.slice(0, limit)
}
