'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Trophy, Users, User } from 'lucide-react'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Challenges',
    href: '/challenges',
    icon: Trophy,
  },
  {
    name: 'Leaderboard',
    href: '/leaderboard',
    icon: Users,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-lg lg:hidden'>
      <nav className='flex'>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-1 flex-col items-center justify-center py-3 px-2 text-xs font-medium transition-all duration-200
                ${
                  isActive
                    ? 'text-primary bg-primary/5'
                    : 'text-neutral-500 hover:text-primary'
                }
              `}
            >
              <item.icon
                className={`h-6 w-6 mb-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-neutral-400'
                }`}
                aria-hidden='true'
              />
              <span className='truncate'>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
