import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SkillCoin } from '@/components/ui/SkillCoin'
import Link from 'next/link'

// Mock leaderboard data
const topContributors = [
  {
    id: 1,
    rank: 1,
    name: 'Aisha Johnson',
    avatar: 'AJ',
    type: 'Student',
    university: 'MIT',
    skillCoins: 2847,
    badges: 12,
    contributions: 45,
    topBadges: [
      { title: 'Top Contributor', icon: '🏆', gradient: 'blue' as const },
      { title: 'Problem Solver', icon: '💡', gradient: 'green' as const },
      { title: 'Mentor', icon: '🎓', gradient: 'purple' as const },
    ],
    weeklyGain: 234,
    specialties: ['Machine Learning', 'Data Science'],
  },
  {
    id: 2,
    rank: 2,
    name: 'Dr. Marcus Chen',
    avatar: 'MC',
    type: 'Lecturer',
    university: 'Stanford',
    skillCoins: 2156,
    badges: 9,
    contributions: 38,
    topBadges: [
      { title: 'Expert', icon: '⭐', gradient: 'orange' as const },
      { title: 'Innovator', icon: '💡', gradient: 'green' as const },
    ],
    weeklyGain: 198,
    specialties: ['Software Engineering', 'AI'],
  },
  {
    id: 3,
    rank: 3,
    name: 'Sofia Rodriguez',
    avatar: 'SR',
    type: 'Student',
    university: 'UC Berkeley',
    skillCoins: 1923,
    badges: 8,
    contributions: 42,
    topBadges: [
      { title: 'Team Player', icon: '🤝', gradient: 'blue' as const },
      { title: 'Rising Star', icon: '🌟', gradient: 'orange' as const },
    ],
    weeklyGain: 156,
    specialties: ['Sustainable Design', 'Engineering'],
  },
  {
    id: 4,
    rank: 4,
    name: 'Prof. Elena Wang',
    avatar: 'EW',
    type: 'Lecturer',
    university: 'Harvard',
    skillCoins: 1784,
    badges: 11,
    contributions: 29,
    topBadges: [
      { title: 'Mentor', icon: '🎓', gradient: 'purple' as const },
      { title: 'Knowledge Expert', icon: '📚', gradient: 'blue' as const },
    ],
    weeklyGain: 143,
    specialties: ['Business Strategy', 'Innovation'],
  },
  {
    id: 5,
    rank: 5,
    name: 'James Thompson',
    avatar: 'JT',
    type: 'Student',
    university: 'Oxford',
    skillCoins: 1652,
    badges: 7,
    contributions: 35,
    topBadges: [
      { title: 'Quick Solver', icon: '⚡', gradient: 'orange' as const },
      { title: 'Helpful', icon: '💪', gradient: 'green' as const },
    ],
    weeklyGain: 128,
    specialties: ['Mathematics', 'Physics'],
  },
]

// Generate more users for the full leaderboard
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

  return names.map((name, index) => ({
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
    badges: Math.floor(Math.random() * 8) + 2,
    contributions: Math.floor(Math.random() * 30) + 15,
    weeklyGain: Math.floor(Math.random() * 100) + 30,
    specialties: specialties[index],
  }))
}

const allUsers = [...topContributors, ...generateMoreUsers()]

export default function Leaderboard() {
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-text-dark mb-4'>
            🏆 Leaderboard
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Celebrating our top contributors who are making a real impact
            through knowledge sharing and problem solving.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className='mb-16'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            {/* Second Place */}
            <div className='md:order-1 flex flex-col items-center'>
              <div className='bg-white rounded-2xl shadow-lg border p-6 text-center transform md:-translate-y-4'>
                <div className='w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-white font-bold text-lg'>
                    {topContributors[1].avatar}
                  </span>
                </div>
                <div className='w-8 h-8 bg-gray-400 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold'>
                  2
                </div>
                <h3 className='font-bold text-text-dark text-lg mb-1'>
                  {topContributors[1].name}
                </h3>
                <p className='text-sm text-gray-600 mb-3'>
                  {topContributors[1].university}
                </p>
                <SkillCoin count={topContributors[1].skillCoins} size='md' />
                <div className='flex justify-center gap-2 mt-4'>
                  {topContributors[1].topBadges
                    .slice(0, 2)
                    .map((badge, index) => (
                      <Badge key={index} {...badge} size='sm' />
                    ))}
                </div>
              </div>
            </div>

            {/* First Place */}
            <div className='md:order-2 flex flex-col items-center'>
              <div className='bg-white rounded-2xl shadow-xl border-2 border-yellow-200 p-8 text-center relative'>
                <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold'>
                  👑 Champion
                </div>
                <div className='w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-white font-bold text-xl'>
                    {topContributors[0].avatar}
                  </span>
                </div>
                <div className='w-10 h-10 bg-yellow-500 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg'>
                  1
                </div>
                <h3 className='font-bold text-text-dark text-xl mb-1'>
                  {topContributors[0].name}
                </h3>
                <p className='text-sm text-gray-600 mb-3'>
                  {topContributors[0].university}
                </p>
                <SkillCoin
                  count={topContributors[0].skillCoins}
                  size='lg'
                  showAnimation
                />
                <div className='flex justify-center gap-2 mt-4'>
                  {topContributors[0].topBadges.map((badge, index) => (
                    <Badge key={index} {...badge} size='sm' />
                  ))}
                </div>
              </div>
            </div>

            {/* Third Place */}
            <div className='md:order-3 flex flex-col items-center'>
              <div className='bg-white rounded-2xl shadow-lg border p-6 text-center transform md:-translate-y-4'>
                <div className='w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-white font-bold text-lg'>
                    {topContributors[2].avatar}
                  </span>
                </div>
                <div className='w-8 h-8 bg-orange-500 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold'>
                  3
                </div>
                <h3 className='font-bold text-text-dark text-lg mb-1'>
                  {topContributors[2].name}
                </h3>
                <p className='text-sm text-gray-600 mb-3'>
                  {topContributors[2].university}
                </p>
                <SkillCoin count={topContributors[2].skillCoins} size='md' />
                <div className='flex justify-center gap-2 mt-4'>
                  {topContributors[2].topBadges.map((badge, index) => (
                    <Badge key={index} {...badge} size='sm' />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className='bg-white rounded-xl shadow-sm border p-6 mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='flex gap-4'>
              <select className='p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'>
                <option>All Time</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
              <select className='p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'>
                <option>All Users</option>
                <option>Students Only</option>
                <option>Lecturers Only</option>
              </select>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' size='sm'>
                Export
              </Button>
              <Button variant='outline' size='sm'>
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className='bg-white rounded-xl shadow-sm border overflow-hidden'>
          <div className='p-6 border-b'>
            <h2 className='text-2xl font-bold text-text-dark'>Full Rankings</h2>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Rank
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    SkillCoins
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Weekly Gain
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Badges
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Contributions
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Specialties
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {allUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          user.rank === 1
                            ? 'bg-yellow-500'
                            : user.rank === 2
                            ? 'bg-gray-400'
                            : user.rank === 3
                            ? 'bg-orange-500'
                            : 'bg-gray-300 text-gray-700'
                        }`}
                      >
                        {user.rank}
                      </div>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mr-3'>
                          <span className='text-white font-medium text-sm'>
                            {user.avatar}
                          </span>
                        </div>
                        <div>
                          <div className='text-sm font-medium text-text-dark'>
                            {user.name}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {user.type} • {user.university}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                      <SkillCoin count={user.skillCoins} size='sm' />
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center text-sm'>
                        <span className='text-secondary mr-1'>↗️</span>
                        <span className='font-medium text-secondary'>
                          +{user.weeklyGain}
                        </span>
                      </div>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-sm font-medium text-text-dark'>
                        {user.badges}
                      </span>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-sm text-gray-600'>
                        {user.contributions}
                      </span>
                    </td>

                    <td className='px-6 py-4'>
                      <div className='flex flex-wrap gap-1'>
                        {user.specialties?.map((specialty, idx) => (
                          <span
                            key={idx}
                            className='inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded'
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <div className='bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white'>
            <h3 className='text-2xl font-bold mb-4'>
              Want to climb the leaderboard?
            </h3>
            <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
              Start contributing to challenges, help fellow students, and build
              your Proof-of-Skill Passport to earn more SkillCoins!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/challenges'>
                <Button size='lg' variant='secondary' className='text-lg px-8'>
                  Browse Challenges
                </Button>
              </Link>
              <Link href='/challenges/new'>
                <Button
                  size='lg'
                  variant='outline'
                  className='text-lg px-8 border-white text-white hover:bg-white hover:text-primary'
                >
                  Post a Challenge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
