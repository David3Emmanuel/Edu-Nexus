// Challenge data and related API functions
export interface Challenge {
  id: number
  title: string
  description: string
  author: string
  authorType: 'Student' | 'Lecturer' | 'Industry Professional'
  authorBio?: string
  upvotes: number
  responses: Response[]
  skillCoins: number
  tags: string[]
  timeAgo: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: 'Real-world Challenge' | 'Academic Q&A' | 'Industry Problem'
}

export interface Response {
  id: number
  author: string
  authorType: 'Student' | 'Lecturer' | 'Industry Professional'
  university?: string
  upvotes: number
  timeAgo: string
  content: string
  isAccepted?: boolean
}

// Challenge data
export const challenges: Challenge[] = [
  {
    id: 1,
    title:
      'How to optimize water filtration systems for rural communities in developing countries?',
    description:
      'NGO Challenge: We need innovative, cost-effective water filtration solutions that can be easily maintained by local communities without requiring advanced technical knowledge or expensive replacement parts.',
    author: 'Dr. Sarah Mitchell',
    authorType: 'Lecturer',
    upvotes: 34,
    responses: [],
    skillCoins: 50,
    tags: ['#Engineering', '#NGO', '#WaterChallenge', '#Sustainability'],
    timeAgo: '2 hours ago',
    difficulty: 'Advanced',
    category: 'Real-world Challenge',
  },
  {
    id: 2,
    title:
      'What are the best practices for implementing microservices architecture in a startup environment?',
    description:
      'Looking for practical advice on breaking down a monolithic application into microservices. What are the key considerations for team size, deployment, and data management?',
    author: 'Marcus Chen',
    authorType: 'Student',
    upvotes: 28,
    responses: [],
    skillCoins: 30,
    tags: ['#SoftwareEngineering', '#Microservices', '#Architecture'],
    timeAgo: '5 hours ago',
    difficulty: 'Intermediate',
    category: 'Academic Q&A',
  },
  {
    id: 3,
    title:
      'Design a sustainable packaging solution for e-commerce that reduces waste by 80%',
    description:
      'SME Challenge: Help our logistics company develop innovative packaging that maintains product protection while dramatically reducing environmental impact and shipping costs.',
    author: 'Prof. Elena Rodriguez',
    authorType: 'Lecturer',
    upvotes: 67,
    responses: [],
    skillCoins: 75,
    tags: ['#Business', '#Sustainability', '#Innovation', '#Logistics'],
    timeAgo: '1 day ago',
    difficulty: 'Advanced',
    category: 'Industry Problem',
  },
]

// Get detailed challenge data with responses
export const getChallengeDetail = async (id: number): Promise<Challenge> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (id === 1) {
    return {
      ...challenges[0],
      description: `We're working with several NGOs to provide clean water access to rural communities. The challenge is to design a water filtration system that meets these specific requirements:

**Key Requirements:**
- Cost-effective (under $100 per unit)
- Requires minimal maintenance
- Can be operated without electricity
- Uses locally available materials where possible
- Filters common contaminants (bacteria, sediment, chemicals)

**Context:**
These communities often lack technical expertise for complex maintenance, reliable electricity, and access to replacement parts. Previous solutions have failed due to complexity and maintenance requirements.

**Deliverables:**
1. Technical design specification
2. Bill of materials with cost breakdown
3. Maintenance schedule and procedures
4. Pilot implementation plan

This is a real-world challenge in partnership with WaterAid International. The best solutions will be considered for actual implementation.`,
      authorBio:
        'Environmental Engineering Professor at MIT, specializing in sustainable water systems',
      responses: [
        {
          id: 1,
          author: 'Marcus Chen',
          authorType: 'Student',
          university: 'Stanford',
          upvotes: 23,
          timeAgo: '1 hour ago',
          content: `I propose a **bio-sand filtration system** combined with ceramic pre-filters. Here's my approach:

## Technical Design

### Primary Components:
1. **Ceramic Pre-filter**: Locally made from clay and organic materials
2. **Bio-sand Filter**: Sand and gravel layers with biological treatment
3. **Storage Container**: Food-grade plastic or ceramic vessel

### Cost Breakdown:
- Ceramic filter: $15-20 (local production)
- Sand/gravel: $5-10 (locally sourced)
- Container: $20-25
- Assembly materials: $10-15
- **Total: ~$60-70**

This design has been successfully implemented in Kenya and Cambodia with 95% contaminant removal efficiency.`,
          isAccepted: true,
        },
        {
          id: 2,
          author: 'Dr. Priya Sharma',
          authorType: 'Lecturer',
          university: 'IIT Delhi',
          upvotes: 18,
          timeAgo: '45 minutes ago',
          content: `Excellent foundation, Marcus! I'd like to add some considerations for scaling and maintenance:

## Scaling Strategy:
- Train local artisans in ceramic filter production
- Establish community-based maintenance programs
- Create simple visual guides for troubleshooting

## Long-term Sustainability:
- Revenue model through filter replacements
- Partnership with local NGOs for ongoing support
- Integration with existing water committees

We've seen 80% adoption rates when communities are involved in the production process.`,
        },
      ],
    }
  }

  const challenge = challenges.find((c: Challenge) => c.id === id)
  if (!challenge) {
    throw new Error('Challenge not found')
  }

  return challenge
}

// API functions for challenges
export const getChallenges = async (): Promise<Challenge[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return challenges
}

export type ChallengePayload = Omit<
  Challenge,
  'id' | 'upvotes' | 'responses' | 'timeAgo'
>

export const createChallenge = async (
  challengeData: ChallengePayload,
): Promise<Challenge> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const newChallenge: Challenge = {
    ...challengeData,
    id: challenges.length + 1,
    upvotes: 0,
    responses: [],
    timeAgo: 'Just now',
  }

  challenges.push(newChallenge)
  return newChallenge
}
