import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '700', '800'],
})

export const metadata: Metadata = {
  title: 'EduNexus - Learn. Apply. Earn. Showcase.',
  description:
    'A knowledge exchange platform for students and lecturers featuring gamified learning with SkillCoins and Proof-of-Skill Passport.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${manrope.variable} antialiased`}>
        {children}
        <footer className='w-full bg-neutral-100 p-4 text-center text-sm text-neutral-500'>
          Made by{' '}
          <a
            href='https://david3emmanuel.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-neutral-600 hover:text-neutral-700'
          >
            David Emmmanuel
          </a>
        </footer>
      </body>
    </html>
  )
}
