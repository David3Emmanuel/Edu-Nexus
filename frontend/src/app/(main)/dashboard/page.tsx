import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SkillCoin } from '@/components/ui/SkillCoin'
import { Upvote } from '@/components/ui/Upvote'
import { getCurrentUser, getRecentActivity } from '@/api'
import Link from 'next/link'

export default async function Dashboard() {
  const user = await getCurrentUser()
  const activities = await getRecentActivity(5)

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-8'>
            {/* Welcome Header */}
            <div className='mb-8'>
              <h1 className='text-3xl font-bold text-text-dark mb-2'>
                Welcome back, {user.username}! 👋
              </h1>
              <p className='text-gray-600'>
                Ready to tackle some challenges and earn more SkillCoins?
              </p>
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='bg-white p-6 rounded-xl shadow-sm border'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-bold text-text-dark'>Total SkillCoins</h3>
                  <div className='w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center'>
                    <SkillCoin count={0} size='sm' />
                  </div>
                </div>
                <SkillCoin
                  count={user.skillCoins ?? 0}
                  size='lg'
                  showAnimation
                />
              </div>

              <div className='bg-white p-6 rounded-xl shadow-sm border'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-bold text-text-dark'>Weekly Rank</h3>
                  <div className='w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center'>
                    <span className='text-yellow-600 font-bold'>
                      #{user.weeklyRank}
                    </span>
                  </div>
                </div>
                <div className='text-3xl font-extrabold text-text-dark'>
                  #{user.weeklyRank}
                </div>
                <p className='text-sm text-gray-600 mt-2'>
                  ↗️ Up from #5 last week
                </p>
              </div>

              <div className='bg-white p-6 rounded-xl shadow-sm border'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-bold text-text-dark'>Badges Earned</h3>
                  <div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
                    <span className='text-purple-600'>🏆</span>
                  </div>
                </div>
                <div className='text-3xl font-extrabold text-text-dark'>
                  {user.badges.length}
                </div>
                <p className='text-sm text-gray-600 mt-2'>+2 this month</p>
              </div>
            </div>

            {/* Activity Feed */}
            <div className='bg-white rounded-xl shadow-sm border'>
              <div className='p-6 border-b'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-xl font-bold text-text-dark'>
                    Recent Activity
                  </h2>
                  <div className='flex items-center gap-2'>
                    <Button size='sm' variant='outline'>
                      Most Recent
                    </Button>
                    <Button size='sm'>Trending</Button>
                  </div>
                </div>
              </div>

              <div className='divide-y'>
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className='p-6 hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='flex-shrink-0'>
                        {activity.type === 'challenge' ? (
                          <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                            <svg
                              className='w-5 h-5 text-primary'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className='w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center'>
                            <svg
                              className='w-5 h-5 text-secondary'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className='flex-1'>
                        <h3 className='font-medium text-text-dark mb-1 hover:text-primary cursor-pointer'>
                          {activity.title}
                        </h3>
                        <p className='text-sm text-gray-600 mb-2'>
                          by {activity.author.username}
                        </p>
                        <div className='flex items-center gap-4 text-sm text-gray-500'>
                          <span>{activity.timeAgo}</span>
                          <div className='flex items-center gap-1'>
                            <Upvote initialCount={activity.upvotes || 0} />
                          </div>
                          {activity.responses !== undefined && (
                            <span>{activity.responses} responses</span>
                          )}
                        </div>
                        <div className='flex gap-2 mt-2'>
                          {activity.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className='px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-600'
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4'>
            {/* Profile Snippet */}
            <div className='bg-white rounded-xl shadow-sm border p-6 mb-6'>
              <div className='text-center mb-6'>
                <div className='w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-2xl text-white font-bold'>
                    {user.username.charAt(0)}
                  </span>
                </div>
                <h3 className='font-bold text-text-dark text-lg'>
                  {user.username}
                </h3>
                <p className='text-gray-600 text-sm'>
                  Computer Science Student
                </p>
              </div>

              <div className='space-y-4'>
                <div>
                  <h4 className='font-medium text-text-dark mb-3'>
                    Recent Badges
                  </h4>
                  <div className='grid grid-cols-2 gap-3'>
                    {user.badges.slice(0, 4).map((badge, index) => (
                      <Badge key={index} {...badge} size='sm' />
                    ))}
                  </div>
                </div>

                <div className='pt-4 border-t'>
                  <Link href='/profile'>
                    <Button variant='outline' className='w-full'>
                      View Full Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='bg-white rounded-xl shadow-sm border p-6'>
              <h3 className='font-bold text-text-dark mb-4'>Quick Actions</h3>
              <div className='space-y-3'>
                <Link href='/challenges/new'>
                  <Button className='w-full justify-start'>
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 4v16m8-8H4'
                      />
                    </svg>
                    Post Challenge
                  </Button>
                </Link>

                <Link href='/challenges'>
                  <Button variant='outline' className='w-full justify-start'>
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                    Browse Challenges
                  </Button>
                </Link>

                <Link href='/leaderboard'>
                  <Button variant='outline' className='w-full justify-start'>
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                      />
                    </svg>
                    View Leaderboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
