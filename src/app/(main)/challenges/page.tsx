import { Button } from '@/components/ui/Button'
import { SkillCoin } from '@/components/ui/SkillCoin'
import { Upvote } from '@/components/ui/Upvote'
import { getChallenges } from '@/api'
import Link from 'next/link'

const filters = {
  categories: ['All', 'Real-world Challenge', 'Academic Q&A'],
  difficulties: ['All', 'Beginner', 'Intermediate', 'Advanced'],
  tags: [
    '#Engineering',
    '#Business',
    '#STEM',
    '#Sustainability',
    '#NGO',
    '#SME',
  ],
}

export default async function Challenges() {
  const challenges = await getChallenges()
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-text-dark mb-2'>
                Challenges & Q&A
              </h1>
              <p className='text-gray-600'>
                Solve real-world problems and earn SkillCoins
              </p>
            </div>
            <div className='flex gap-3 mt-4 sm:mt-0'>
              <Button variant='outline'>
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
                    d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                  />
                </svg>
                Filters
              </Button>
              <Link href='/challenges/new'>
                <Button>
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
            </div>
          </div>

          {/* Filters */}
          <div className='bg-white p-6 rounded-xl shadow-sm border'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Category Filter */}
              <div>
                <label className='block text-sm font-medium text-text-dark mb-2'>
                  Category
                </label>
                <select className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'>
                  {filters.categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className='block text-sm font-medium text-text-dark mb-2'>
                  Difficulty
                </label>
                <select className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'>
                  {filters.difficulties.map((difficulty) => (
                    <option key={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className='block text-sm font-medium text-text-dark mb-2'>
                  Sort By
                </label>
                <select className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'>
                  <option>Most Recent</option>
                  <option>Most Upvoted</option>
                  <option>Most Responses</option>
                  <option>Highest SkillCoins</option>
                </select>
              </div>
            </div>

            {/* Tag Filter */}
            <div className='mt-4'>
              <label className='block text-sm font-medium text-text-dark mb-2'>
                Popular Tags
              </label>
              <div className='flex flex-wrap gap-2'>
                {filters.tags.map((tag) => (
                  <button
                    key={tag}
                    className='px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700 hover:bg-primary hover:text-white transition-colors'
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Challenges List */}
        <div className='space-y-6'>
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className='bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow'
            >
              <div className='p-6'>
                {/* Challenge Header */}
                <div className='flex items-start gap-4 mb-4'>
                  <div className='flex-shrink-0'>
                    <Upvote initialCount={challenge.upvotes} />
                  </div>

                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          challenge.category === 'Real-world Challenge'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {challenge.category}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          challenge.difficulty === 'Advanced'
                            ? 'bg-red-100 text-red-700'
                            : challenge.difficulty === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {challenge.difficulty}
                      </span>
                      <div className='flex items-center gap-1'>
                        <SkillCoin count={challenge.skillCoins} size='sm' />
                        <span className='text-xs text-gray-500'>reward</span>
                      </div>
                    </div>

                    <Link href={`/challenges/${challenge.id}`}>
                      <h2 className='text-xl font-bold text-text-dark hover:text-primary cursor-pointer mb-3 leading-tight'>
                        {challenge.title}
                      </h2>
                    </Link>

                    <p className='text-gray-600 mb-4 leading-relaxed'>
                      {challenge.description}
                    </p>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {challenge.tags.map((tag, index) => (
                        <span
                          key={index}
                          className='px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-600'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Challenge Footer */}
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <span>
                          by{' '}
                          <span className='font-medium'>
                            {challenge.author}
                          </span>{' '}
                          ({challenge.authorType})
                        </span>
                        <span>•</span>
                        <span>{challenge.timeAgo}</span>
                        <span>•</span>
                        <span>{challenge.responses.length} responses</span>
                      </div>

                      <div className='flex items-center gap-2'>
                        <Button size='sm' variant='outline'>
                          <svg
                            className='w-3 h-3 mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                            />
                          </svg>
                          Save
                        </Button>
                        <Link href={`/challenges/${challenge.id}`}>
                          <Button size='sm'>View Challenge</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className='text-center mt-12'>
          <Button variant='outline' size='lg'>
            Load More Challenges
          </Button>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className='fixed bottom-6 right-6 sm:hidden'>
        <Link href='/challenges/new'>
          <button className='w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center'>
            <svg
              className='w-6 h-6'
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
          </button>
        </Link>
      </div>
    </>
  )
}
