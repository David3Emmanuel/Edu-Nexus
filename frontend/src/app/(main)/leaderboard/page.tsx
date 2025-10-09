import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SkillCoin } from '@/components/ui/SkillCoin'
import Link from 'next/link'
import { User, getTopContributors, getAllUsers } from '@/api'
import Image from 'next/image'

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
}

// Avatar component that shows image or falls back to initials
function Avatar({
  user,
  size = 'md',
  className = '',
}: {
  user: User
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
  }

  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center font-medium ${className}`

  if (user.avatar?.url) {
    return (
      <Image
        src={user.avatar.url}
        alt={user.username}
        width={80}
        height={80}
        className={`${baseClasses} object-cover`}
      />
    )
  }

  return (
    <div
      className={`${baseClasses} bg-gradient-to-br from-primary to-blue-600 text-white`}
    >
      {getInitials(user.username)}
    </div>
  )
}

export default async function Leaderboard() {
  const topContributors = await getTopContributors()
  const allUsers = await getAllUsers()
  console.log('allUsers', allUsers)

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-text-dark mb-4'>
            🏆 Leaderboard
          </h1>
          <p className='text-xl text-gray-600 max-w-break-md mx-auto'>
            Celebrating our top contributors who are making a real impact
            through knowledge sharing and problem solving.
          </p>
        </div>

        {/* Top 3 Podium */}
        {topContributors.length >= 3 && (
          <div className='mb-16'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
              {/* Second Place */}
              <div className='md:order-1 flex flex-col items-center'>
                <div className='bg-white rounded-2xl shadow-lg border p-6 text-center transform md:-translate-y-4'>
                  <div className='mx-auto flex justify-center'>
                    <Avatar
                      user={topContributors[1]}
                      size='lg'
                      className='bg-gradient-to-br from-gray-400 to-gray-600'
                    />
                  </div>
                  <div className='w-8 h-8 bg-gray-400 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold'>
                    2
                  </div>
                  <h3 className='font-bold text-text-dark text-lg mb-1'>
                    {topContributors[1].username}
                  </h3>
                  <p className='text-sm text-gray-600 mb-3'>
                    {topContributors[1].university}
                  </p>
                  <SkillCoin
                    count={topContributors[1].skillCoins ?? 0}
                    size='md'
                  />
                  <div className='flex justify-center gap-2 mt-4'>
                    {topContributors[1].badges.slice(0, 2).map((badge) => (
                      <Badge key={badge.id} {...badge} size='sm' />
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
                  <div className='mx-auto flex justify-center'>
                    <Avatar
                      user={topContributors[0]}
                      size='xl'
                      className='bg-gradient-to-br from-yellow-400 to-yellow-600'
                    />
                  </div>
                  <div className='w-10 h-10 bg-yellow-500 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg'>
                    1
                  </div>
                  <h3 className='font-bold text-text-dark text-xl mb-1'>
                    {topContributors[0].username}
                  </h3>
                  <p className='text-sm text-gray-600 mb-3'>
                    {topContributors[0].university}
                  </p>
                  <SkillCoin
                    count={topContributors[0].skillCoins ?? 0}
                    size='lg'
                    showAnimation
                  />
                  <div className='flex justify-center gap-2 mt-4'>
                    {topContributors[0].badges.map((badge) => (
                      <Badge key={badge.id} {...badge} size='sm' />
                    ))}
                  </div>
                </div>
              </div>

              {/* Third Place */}
              <div className='md:order-3 flex flex-col items-center'>
                <div className='bg-white rounded-2xl shadow-lg border p-6 text-center transform md:-translate-y-4'>
                  <div className='mx-auto flex justify-center'>
                    <Avatar
                      user={topContributors[2]}
                      size='lg'
                      className='bg-gradient-to-br from-orange-400 to-orange-600'
                    />
                  </div>
                  <div className='w-8 h-8 bg-orange-500 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold'>
                    3
                  </div>
                  <h3 className='font-bold text-text-dark text-lg mb-1'>
                    {topContributors[2].username}
                  </h3>
                  <p className='text-sm text-gray-600 mb-3'>
                    {topContributors[2].university}
                  </p>
                  <SkillCoin
                    count={topContributors[2].skillCoins ?? 0}
                    size='md'
                  />
                  <div className='flex justify-center gap-2 mt-4'>
                    {topContributors[2].badges.map((badge) => (
                      <Badge key={badge.id} {...badge} size='sm' />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  {/* TODO <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Contributions
                  </th> */}
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Specialties
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {allUsers.map((user) => (
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
                        <div className='mr-3'>
                          <Avatar user={user} size='md' />
                        </div>
                        <div>
                          <div className='text-sm font-medium text-text-dark'>
                            {user.username}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {user.type} • {user.university}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                      <SkillCoin count={user.skillCoins ?? 0} size='sm' />
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
                        {user.badges.length}
                      </span>
                    </td>

                    {/* TODO <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-sm text-gray-600'>
                        {user.contributions}
                      </span>
                    </td> */}

                    <td className='px-6 py-4'>
                      <div className='flex flex-wrap gap-1'>
                        {user.specialties?.map((specialty) => (
                          <span
                            key={specialty.id}
                            className='inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded'
                          >
                            {specialty.name}
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
            <p className='text-blue-100 mb-6 max-w-break-md mx-auto'>
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
                  className='text-lg px-8 border-white text-white'
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
