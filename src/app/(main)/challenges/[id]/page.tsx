import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SkillCoin } from '@/components/ui/SkillCoin'
import { Upvote } from '@/components/ui/Upvote'
import Link from 'next/link'

// Mock challenge data
const challengeData = {
  id: 1,
  title:
    'How to optimize water filtration systems for rural communities in developing countries?',
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
  author: 'Dr. Sarah Mitchell',
  authorType: 'Lecturer',
  authorBio:
    'Environmental Engineering Professor at MIT, specializing in sustainable water systems',
  upvotes: 34,
  skillCoins: 50,
  tags: ['#Engineering', '#NGO', '#WaterChallenge', '#Sustainability'],
  timeAgo: '2 hours ago',
  difficulty: 'Advanced',
  category: 'Real-world Challenge',
  responses: [
    {
      id: 1,
      author: 'Marcus Chen',
      authorType: 'Student',
      university: 'Stanford',
      upvotes: 23,
      timeAgo: '1 hour ago',
      content: `I propose a **bio-sand filtration system** combined with ceramic pre-filters. Here's my approach:

**Design Overview:**
The system uses a three-stage filtration process:
1. **Ceramic Pre-filter**: Removes larger particles and some bacteria
2. **Bio-sand Filter**: Biological layer removes pathogens
3. **Activated Carbon**: Removes chemicals and improves taste

**Cost Breakdown:**
- Ceramic filter: $15
- Sand and gravel: $10
- Container (plastic drum): $25
- Activated carbon: $20
- Assembly materials: $15
- **Total: $85**

**Maintenance:**
- Clean ceramic filter weekly (simple scrubbing)
- Replace carbon every 6 months
- No electricity required

This design has been tested in Kenya with 95% bacterial removal rate. I can provide detailed technical drawings if there's interest.`,
      isTopAnswer: true,
    },
    {
      id: 2,
      author: 'Elena Rodriguez',
      authorType: 'Student',
      university: 'UC Berkeley',
      upvotes: 18,
      timeAgo: '45 minutes ago',
      content: `Great challenge! I'd like to build on Marcus's bio-sand idea but suggest a **modular approach** for easier maintenance and transport:

**Key Innovation: Stackable Modules**
- Each module handles one filtration stage
- Modules can be separated for cleaning
- Easier to transport and store spare parts

**Additional Considerations:**
- Use local clay for ceramic components (reduces cost)
- Solar disinfection chamber as optional add-on
- Community training program included

**Pilot Plan:**
1. Partner with local potters for ceramic production
2. Train 5 community members as maintenance leads
3. Install 10 units, monitor for 6 months
4. Document and iterate based on feedback

Would love to collaborate on detailed specifications!`,
    },
    {
      id: 3,
      author: 'Dr. James Thompson',
      authorType: 'Lecturer',
      university: 'Imperial College London',
      upvotes: 15,
      timeAgo: '30 minutes ago',
      content: `Excellent responses from both Marcus and Elena. As someone who's implemented similar systems in Bangladesh, I'd add some practical considerations:

**Critical Success Factors:**
1. **Community Buy-in**: Include community in design process
2. **Local Material Sourcing**: Partner with local suppliers
3. **Training Materials**: Visual guides in local languages
4. **Backup Plan**: What happens when systems fail?

**Technical Suggestions:**
- Include flow rate indicators (simple visual)
- Design for easy disassembly without tools
- Consider seasonal variations in water quality
- Plan for scale manufacturing

Both solutions show promise. I'd be happy to connect you with our NGO partners for field testing opportunities.`,
    },
  ],
}

export default function ChallengeDetail() {
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb */}
        <nav className='mb-6'>
          <div className='flex items-center space-x-2 text-sm text-gray-500'>
            <Link href='/challenges' className='hover:text-primary'>
              Challenges
            </Link>
            <span>/</span>
            <span>Challenge #{challengeData.id}</span>
          </div>
        </nav>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-8'>
            {/* Challenge Header */}
            <div className='bg-white rounded-xl shadow-sm border p-8 mb-8'>
              <div className='flex items-start gap-6 mb-6'>
                <div className='flex-shrink-0'>
                  <Upvote initialCount={challengeData.upvotes} />
                </div>

                <div className='flex-1'>
                  <div className='flex flex-wrap items-center gap-3 mb-4'>
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        challengeData.category === 'Real-world Challenge'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {challengeData.category}
                    </span>
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        challengeData.difficulty === 'Advanced'
                          ? 'bg-red-100 text-red-700'
                          : challengeData.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {challengeData.difficulty}
                    </span>
                    <div className='flex items-center gap-2'>
                      <SkillCoin count={challengeData.skillCoins} size='sm' />
                      <span className='text-sm text-gray-600'>reward</span>
                    </div>
                  </div>

                  <h1 className='text-3xl font-bold text-text-dark mb-4 leading-tight'>
                    {challengeData.title}
                  </h1>

                  <div className='flex items-center gap-4 text-sm text-gray-600 mb-6'>
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center'>
                        <span className='text-white font-medium text-xs'>
                          {challengeData.author.charAt(0)}
                        </span>
                      </div>
                      <span>
                        by <strong>{challengeData.author}</strong> (
                        {challengeData.authorType})
                      </span>
                    </div>
                    <span>•</span>
                    <span>{challengeData.timeAgo}</span>
                    <span>•</span>
                    <span>{challengeData.responses.length} responses</span>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {challengeData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-gray-100 text-sm rounded-md text-gray-600'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenge Description */}
              <div className='prose max-w-none'>
                <div className='whitespace-pre-wrap text-gray-700 leading-relaxed'>
                  {challengeData.description}
                </div>
              </div>

              {/* Challenge Actions */}
              <div className='flex items-center justify-between mt-8 pt-6 border-t'>
                <div className='flex items-center gap-4'>
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
                        d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                      />
                    </svg>
                    Save
                  </Button>
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
                    Share
                  </Button>
                </div>
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
                  Post Answer
                </Button>
              </div>
            </div>

            {/* Responses Section */}
            <div className='bg-white rounded-xl shadow-sm border p-8'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-text-dark'>
                  Responses ({challengeData.responses.length})
                </h2>
                <select className='p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary'>
                  <option>Sort by: Most Upvoted</option>
                  <option>Sort by: Most Recent</option>
                  <option>Sort by: Oldest First</option>
                </select>
              </div>

              <div className='space-y-8'>
                {challengeData.responses.map((response, index) => (
                  <div key={response.id} className='relative'>
                    {response.isTopAnswer && (
                      <div className='absolute -top-2 -left-2 bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium'>
                        ⭐ Top Answer
                      </div>
                    )}

                    <div
                      className={`p-6 rounded-xl border-2 transition-all ${
                        response.isTopAnswer
                          ? 'border-secondary bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className='flex items-start gap-4'>
                        <div className='flex-shrink-0'>
                          <Upvote initialCount={response.upvotes} />
                        </div>

                        <div className='flex-1'>
                          <div className='flex items-center gap-3 mb-4'>
                            <div className='w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center'>
                              <span className='text-white font-medium text-sm'>
                                {response.author.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className='font-medium text-text-dark'>
                                {response.author}
                              </h3>
                              <p className='text-sm text-gray-600'>
                                {response.authorType} • {response.university} •{' '}
                                {response.timeAgo}
                              </p>
                            </div>
                          </div>

                          <div className='prose max-w-none'>
                            <div className='whitespace-pre-wrap text-gray-700 leading-relaxed'>
                              {response.content}
                            </div>
                          </div>

                          <div className='flex items-center gap-4 mt-4 pt-4 border-t'>
                            <Button variant='outline' size='sm'>
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
                                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                                />
                              </svg>
                              Reply
                            </Button>
                            <Button variant='outline' size='sm'>
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
                                  d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
                                />
                              </svg>
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Post Answer Form */}
              <div className='mt-12 pt-8 border-t'>
                <h3 className='text-xl font-bold text-text-dark mb-4'>
                  Your Answer
                </h3>
                <p className='text-gray-600 mb-6'>
                  Share your solution and earn{' '}
                  <SkillCoin count={25} size='sm' /> for a quality answer!
                </p>

                <div className='space-y-4'>
                  <textarea
                    className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none'
                    rows={8}
                    placeholder='Provide a detailed answer to this challenge. Include technical details, implementation steps, and any supporting evidence...'
                  />

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
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
                            d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                          />
                        </svg>
                        Attach Files
                      </Button>
                      <span className='text-sm text-gray-500'>
                        Markdown supported
                      </span>
                    </div>
                    <Button>Post Answer</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4'>
            {/* Author Profile */}
            <div className='bg-white rounded-xl shadow-sm border p-6 mb-6'>
              <h3 className='font-bold text-text-dark mb-4'>
                Challenge Author
              </h3>

              <div className='flex items-start gap-3'>
                <div className='w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center'>
                  <span className='text-white font-medium'>
                    {challengeData.author.charAt(0)}
                  </span>
                </div>
                <div className='flex-1'>
                  <h4 className='font-medium text-text-dark'>
                    {challengeData.author}
                  </h4>
                  <p className='text-sm text-gray-600 mb-2'>
                    {challengeData.authorType}
                  </p>
                  <p className='text-xs text-gray-500 leading-relaxed'>
                    {challengeData.authorBio}
                  </p>
                </div>
              </div>

              <Button variant='outline' className='w-full mt-4'>
                View Profile
              </Button>
            </div>

            {/* Similar Challenges */}
            <div className='bg-white rounded-xl shadow-sm border p-6 mb-6'>
              <h3 className='font-bold text-text-dark mb-4'>
                Similar Challenges
              </h3>

              <div className='space-y-4'>
                <div className='p-3 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer'>
                  <h4 className='font-medium text-text-dark text-sm mb-1'>
                    Designing solar-powered irrigation for small farms
                  </h4>
                  <p className='text-xs text-gray-500 mb-2'>
                    23 responses • 45 upvotes
                  </p>
                  <div className='flex gap-1'>
                    <span className='px-2 py-0.5 bg-gray-100 text-xs rounded text-gray-600'>
                      #Solar
                    </span>
                    <span className='px-2 py-0.5 bg-gray-100 text-xs rounded text-gray-600'>
                      #Agriculture
                    </span>
                  </div>
                </div>

                <div className='p-3 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer'>
                  <h4 className='font-medium text-text-dark text-sm mb-1'>
                    Low-cost air quality monitoring system
                  </h4>
                  <p className='text-xs text-gray-500 mb-2'>
                    18 responses • 32 upvotes
                  </p>
                  <div className='flex gap-1'>
                    <span className='px-2 py-0.5 bg-gray-100 text-xs rounded text-gray-600'>
                      #IoT
                    </span>
                    <span className='px-2 py-0.5 bg-gray-100 text-xs rounded text-gray-600'>
                      #Environment
                    </span>
                  </div>
                </div>

                <div className='p-3 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer'>
                  <h4 className='font-medium text-text-dark text-sm mb-1'>
                    Waste management app for urban communities
                  </h4>
                  <p className='text-xs text-gray-500 mb-2'>
                    31 responses • 67 upvotes
                  </p>
                  <div className='flex gap-1'>
                    <span className='px-2 py-0.5 bg-gray-100 text-xs rounded text-gray-600'>
                      #MobileApp
                    </span>
                    <span className='px-2 py-0.5 bg-gray-100 text-xs rounded text-gray-600'>
                      #Sustainability
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Stats */}
            <div className='bg-white rounded-xl shadow-sm border p-6'>
              <h3 className='font-bold text-text-dark mb-4'>Challenge Stats</h3>

              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Views</span>
                  <span className='font-medium'>1,247</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Bookmarks</span>
                  <span className='font-medium'>89</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Shares</span>
                  <span className='font-medium'>23</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Expert Reviews</span>
                  <span className='font-medium text-secondary'>3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className='fixed bottom-6 right-6 sm:hidden'>
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
      </div>
    </>
  )
}
