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
export const topContributors: User[] = [
  {
    id: 1,
    name: 'Aisha Johnson',
    avatar: 'AJ',
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
    id: 2,
    name: 'Dr. Marcus Chen',
    avatar: 'MC',
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
  {
    id: 3,
    name: 'Sofia Rodriguez',
    avatar: 'SR',
    type: 'Student',
    university: 'UC Berkeley',
    rank: 3,
    skillCoins: 1923,
    weeklyRank: 3,
    totalContributions: 31,
    badges: [
      { title: 'Rising Star', icon: '🌟', gradient: 'purple' },
      { title: 'Collaborator', icon: '🤝', gradient: 'blue' },
    ],
    weeklyGain: 167,
    specialties: ['Bioengineering', 'Sustainability'],
  },
]

const generateMoreUsers = () => {
  const names = [
    'Alex Kim',
    'Sarah Miller',
    'David Park',
    'Emma Wilson',
    'Ryan Lee',
    'Maya Patel',
    'Chris Brown',
    'Lisa Zhang',
  ]
  const universities = [
    'Yale',
    'Princeton',
    'Columbia',
    'UPenn',
    'Cornell',
    'NYU',
    'UCLA',
    'USC',
  ]
  const specialties = [
    ['Chemistry', 'Biology'],
    ['Psychology', 'Neuroscience'],
    ['Economics', 'Finance'],
    ['Environmental Science', 'Climate'],
    ['Art', 'Design'],
    ['Philosophy', 'Ethics'],
    ['Marketing', 'Communications'],
    ['Medicine', 'Health'],
  ]

  return names.map(
    (name, index) =>
      ({
        id: index + 6,
        rank: index + 6,
        name,
        avatar: name
          .split(' ')
          .map((n) => n[0])
          .join(''),
        type: Math.random() > 0.5 ? 'Student' : 'Lecturer',
        university: universities[index],
        skillCoins: 1500 - index * 120 - Math.floor(Math.random() * 100),
        badges: [
          { title: 'Rising Star', icon: '🌟', gradient: 'purple' },
          { title: 'Collaborator', icon: '🤝', gradient: 'blue' },
        ],
        // contributions: Math.floor(Math.random() * 30) + 15,
        weeklyGain: Math.floor(Math.random() * 100) + 30,
        weeklyRank: index + 6,
        specialties: specialties[index],
      } satisfies User),
  )
}

export const allUsers = [...topContributors, ...generateMoreUsers()]

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
