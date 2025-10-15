import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SkillCoin } from '@/components/ui/SkillCoin'
import { Upvote } from '@/components/ui/Upvote'
import { getCurrentUser, getUserActivity, UiActivity } from '@/api'
import { notFound } from 'next/navigation'

export default async function Profile() {
  const userProfile = await getCurrentUser()
  if (!userProfile) {
    notFound()
  }
  const contributions: UiActivity[] = await getUserActivity(userProfile.id)

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Main Profile Content */}
          <div className='lg:col-span-8'>
            {/* Profile Header */}
            <div className='bg-white rounded-xl shadow-sm border p-8 mb-8'>
              <div className='flex flex-col md:flex-row md:items-start gap-6'>
                <div className='flex-shrink-0'>
                  <div className='w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center'>
                    <span className='text-3xl text-white font-bold'>
                      {userProfile.username.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className='flex-1'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4'>
                    <div>
                      <h1 className='text-3xl font-bold text-text-dark mb-2'>
                        {userProfile.username}
                      </h1>
                      <p className='text-gray-600 mb-2'>
                        {userProfile.program} • {userProfile.university}
                      </p>
                      <p className='text-sm text-gray-500'>
                        📍 {userProfile.location} • Joined{' '}
                        {new Date(userProfile.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className='flex gap-3 mt-4 sm:mt-0'>
                      <Button variant='outline' size='sm'>
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
                            d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
                          />
                        </svg>
                        Share Profile
                      </Button>
                      <Button size='sm'>Edit Profile</Button>
                    </div>
                  </div>

                  <p className='text-gray-700 leading-relaxed mb-6'>
                    {userProfile.bio}
                  </p>

                  {/* Quick Stats */}
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='text-center'>
                      <SkillCoin
                        count={userProfile.skillCoins ?? 0}
                        size='sm'
                      />
                      <p className='text-xs text-gray-500 mt-1'>
                        Total SkillCoins
                      </p>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-primary'>
                        #{userProfile.rank}
                      </div>
                      <p className='text-xs text-gray-500'>Global Rank</p>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-secondary'>
                        {userProfile.badges.length}
                      </div>
                      <p className='text-xs text-gray-500'>Badges Earned</p>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-orange-500'>
                        {userProfile.totalContributions}
                      </div>
                      <p className='text-xs text-gray-500'>Contributions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proof-of-Skill Passport (Badges) */}
            <div className='bg-white rounded-xl shadow-sm border p-8 mb-8'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-text-dark'>
                  🏆 Proof-of-Skill Passport
                </h2>
                <span className='text-sm text-gray-500'>
                  {userProfile.profileViews} profile views this month
                </span>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {userProfile.badges.map((badge) => (
                  <div key={badge.id} className='text-center group'>
                    <Badge {...badge} size='md' />
                    <div className='mt-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                      <p className='text-xs text-gray-600'>
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-6 p-4 bg-gradient-to-r from-primary/10 to-blue-50 rounded-lg'>
                <p className='text-sm text-primary text-center'>
                  💡 <strong>Tip:</strong> Complete more challenges to earn new
                  badges and improve your employability score!
                </p>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className='bg-white rounded-xl shadow-sm border p-8 mb-8'>
              <h2 className='text-2xl font-bold text-text-dark mb-6'>
                Skills & Expertise
              </h2>

              <div className='flex flex-wrap gap-2'>
                {userProfile.specialties?.map((specialty) => (
                  <div
                    key={specialty.id}
                    className='p-3 border rounded-lg bg-gray-50'
                  >
                    <h3 className='font-medium text-text-dark'>
                      {specialty.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Contribution History */}
            <div className='bg-white rounded-xl shadow-sm border p-8'>
              <h2 className='text-2xl font-bold text-text-dark mb-6'>
                Contribution History
              </h2>

              <div className='space-y-6'>
                {contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    className='border-l-4 border-primary pl-6 pb-6 last:pb-0'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='flex-shrink-0'>
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            contribution.type === 'challenge'
                              ? 'bg-primary/10'
                              : 'bg-secondary/10'
                          }`}
                        >
                          {contribution.type === 'challenge' ? (
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
                          ) : (
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
                          )}
                        </div>
                      </div>

                      <div className='flex-1'>
                        <h3 className='font-medium text-text-dark mb-1 hover:text-primary cursor-pointer'>
                          {contribution.title}
                        </h3>

                        <div className='flex items-center gap-4 text-sm text-gray-500 mb-2'>
                          <span>{contribution.timeAgo}</span>
                          <div className='flex items-center gap-1'>
                            <Upvote
                              initialCount={contribution.upvotes || 0}
                              disabled
                            />
                          </div>
                          {contribution.responses !== undefined && (
                            <span>{contribution.responses} responses</span>
                          )}
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {contribution.tags?.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
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

              <div className='text-center mt-8'>
                <Button variant='outline'>Load More Contributions</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4'>
            {/* Profile Stats */}
            <div className='bg-white rounded-xl shadow-sm border p-6 mb-6'>
              <h3 className='font-bold text-text-dark mb-4'>
                Profile Performance
              </h3>

              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Profile Views</span>
                  <span className='font-medium'>
                    {userProfile.profileViews}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Weekly Rank</span>
                  <span className='font-medium text-secondary'>
                    #{userProfile.weeklyRank}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Graduation</span>
                  <span className='font-medium'>
                    {userProfile.graduationYear}
                  </span>
                </div>
              </div>

              <div className='mt-6 pt-4 border-t'>
                <div className='text-center'>
                  <p className='text-sm text-gray-600 mb-3'>
                    Profile Completeness
                  </p>
                  <div className='bg-gray-200 rounded-full h-2 mb-2'>
                    <div
                      className='bg-secondary h-2 rounded-full'
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <p className='text-xs text-gray-500'>
                    85% complete • Add more skills to reach 100%
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Showcase */}
            <div className='bg-white rounded-xl shadow-sm border p-6 mb-6'>
              <h3 className='font-bold text-text-dark mb-4'>
                Recent Achievements
              </h3>

              <div className='space-y-3'>
                <div className='flex items-center gap-3 p-3 bg-green-50 rounded-lg'>
                  <Badge title='' icon='🌟' size='sm' gradient='orange' />
                  <div>
                    <p className='text-sm font-medium text-text-dark'>
                      Rising Star
                    </p>
                    <p className='text-xs text-gray-500'>Earned 4 days ago</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-blue-50 rounded-lg'>
                  <Badge title='' icon='🤝' size='sm' gradient='orange' />
                  <div>
                    <p className='text-sm font-medium text-text-dark'>
                      Team Player
                    </p>
                    <p className='text-xs text-gray-500'>Earned 1 week ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className='bg-gradient-to-br from-primary to-blue-600 rounded-xl p-6 text-white'>
              <h3 className='font-bold text-lg mb-2'>Share Your Profile</h3>
              <p className='text-blue-100 text-sm mb-4'>
                Show employers your verified skills and achievements from
                SabiMind.
              </p>
              <Button variant='secondary' size='sm' className='w-full'>
                Get Shareable Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
