import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SkillCoin } from '@/components/ui/SkillCoin'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen bg-bg-light'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <h1 className='text-xl font-extrabold text-primary'>EduNexus</h1>
            </div>
            <nav className='hidden md:flex space-x-8'>
              <Link
                href='#features'
                className='text-text-dark hover:text-primary transition-colors'
              >
                Features
              </Link>
              <Link
                href='/leaderboard'
                className='text-text-dark hover:text-primary transition-colors'
              >
                Leaderboard
              </Link>
              <Link
                href='#about'
                className='text-text-dark hover:text-primary transition-colors'
              >
                About
              </Link>
            </nav>
            <div className='flex items-center space-x-4'>
              <Link href='/dashboard'>
                <Button variant='outline' size='sm'>
                  Login
                </Button>
              </Link>
              <Link href='/dashboard'>
                <Button size='sm'>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h1 className='text-h1 font-extrabold text-text-dark mb-6 leading-tight'>
                Learn. Apply. Earn. Showcase.
              </h1>
              <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
                Join the ultimate knowledge exchange platform where students and
                lecturers collaborate on real-world challenges, earn SkillCoins,
                and build their Proof-of-Skill Passport.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link href='/dashboard'>
                  <Button size='lg' className='text-lg px-8'>
                    Sign Up Now
                  </Button>
                </Link>
                <Link href='/challenges'>
                  <Button variant='outline' size='lg' className='text-lg px-8'>
                    Explore Challenges
                  </Button>
                </Link>
              </div>
            </div>
            <div className='flex justify-center'>
              <div className='bg-white rounded-2xl p-8 shadow-lg border'>
                <div className='text-center mb-6'>
                  <SkillCoin count={1247} size='lg' showAnimation />
                </div>
                <div className='grid grid-cols-3 gap-4 mb-6'>
                  <Badge title='Top Contributor' icon='🏆' gradient='blue' />
                  <Badge title='Problem Solver' icon='💡' gradient='green' />
                  <Badge title='Mentor' icon='🎓' gradient='purple' />
                </div>
                <p className='text-center text-sm text-gray-600'>
                  Build your Proof-of-Skill Passport
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section id='features' className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-text-dark mb-4'>
              Why Choose EduNexus?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Our platform combines academic learning with real-world
              application, gamification, and professional skill development.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Knowledge Exchange Card */}
            <div className='bg-bg-light p-8 rounded-xl border hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
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
              </div>
              <h3 className='text-2xl font-bold text-text-dark mb-4'>
                Knowledge Exchange
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Collaborate on real-world challenges, share solutions, and learn
                from peers and experts through our Q&A platform.
              </p>
            </div>

            {/* SkillCoins Card */}
            <div className='bg-bg-light p-8 rounded-xl border hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6'>
                <SkillCoin count={0} size='sm' />
              </div>
              <h3 className='text-2xl font-bold text-text-dark mb-4'>
                SkillCoins Rewards
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Earn SkillCoins for contributions, climb the leaderboard, and
                get recognized for your expertise and helpfulness.
              </p>
            </div>

            {/* Proof-of-Skill Passport Card */}
            <div className='bg-bg-light p-8 rounded-xl border hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6'>
                <Badge title='' icon='🎓' size='sm' gradient='purple' />
              </div>
              <h3 className='text-2xl font-bold text-text-dark mb-4'>
                Skill Passport
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Build a comprehensive portfolio of verified skills and
                achievements that showcase your capabilities to future
                employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Leaderboard Preview */}
      <section id='leaderboard' className='py-20 bg-bg-light'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-text-dark mb-4'>
              Top Contributors
            </h2>
            <p className='text-xl text-gray-600'>
              See how our community leaders are making an impact
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-8 mx-auto'>
            <div className='space-y-4'>
              {[
                { name: 'Aisha Johnson', coins: 2847, rank: 1, badges: 12 },
                { name: 'Marcus Chen', coins: 2156, rank: 2, badges: 9 },
                { name: 'Sofia Rodriguez', coins: 1923, rank: 3, badges: 8 },
              ].map((user, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 rounded-lg bg-bg-light'
                >
                  <div className='flex items-center gap-4'>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0
                          ? 'bg-yellow-500'
                          : index === 1
                          ? 'bg-gray-400'
                          : 'bg-orange-500'
                      }`}
                    >
                      {user.rank}
                    </div>
                    <div>
                      <h4 className='font-bold text-text-dark'>{user.name}</h4>
                      <p className='text-sm text-gray-600'>
                        {user.badges} badges earned
                      </p>
                    </div>
                  </div>
                  <SkillCoin count={user.coins} size='sm' />
                </div>
              ))}
            </div>
            <div className='text-center mt-8'>
              <Link href='/leaderboard'>
                <Button variant='outline' size='md'>
                  View Full Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-primary'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-white mb-6'>
            Ready to Start Your Journey?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Join thousands of students and educators who are already building
            their skills and advancing their careers.
          </p>
          <Link href='/dashboard'>
            <Button size='lg' variant='secondary' className='text-lg px-8'>
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-text-dark py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-xl font-bold text-white mb-4'>EduNexus</h3>
              <p className='text-gray-400'>
                Empowering students through knowledge exchange and skill
                development.
              </p>
            </div>
            <div>
              <h4 className='font-bold text-white mb-4'>Platform</h4>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/challenges'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Challenges
                  </Link>
                </li>
                <li>
                  <Link
                    href='/leaderboard'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    href='/profile'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Skill Passport
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-bold text-white mb-4'>Support</h4>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-bold text-white mb-4'>Legal</h4>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-700 mt-12 pt-8 text-center'>
            <p className='text-gray-400'>
              © 2024 EduNexus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
