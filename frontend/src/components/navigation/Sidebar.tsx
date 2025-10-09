'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Trophy,
  Users,
  User,
  Plus,
  Settings,
  LogOut,
} from 'lucide-react'

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

const secondaryItems = [
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
      <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-lg border-r border-neutral-200'>
        {/* Logo */}
        <div className='flex h-16 shrink-0 items-center'>
          <Link
            href='/dashboard'
            className='text-2xl font-extrabold text-primary'
          >
            EduNexus
          </Link>
        </div>

        {/* Primary Navigation */}
        <nav className='flex flex-1 flex-col'>
          <ul role='list' className='flex flex-1 flex-col gap-y-7'>
            <li>
              <ul role='list' className='-mx-2 space-y-1'>
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 transition-all duration-200
                          ${
                            isActive
                              ? 'bg-primary text-white shadow-md'
                              : 'text-neutral-700 hover:text-primary hover:bg-neutral-50'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 transition-colors ${
                            isActive
                              ? 'text-white'
                              : 'text-neutral-400 group-hover:text-primary'
                          }`}
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>

            {/* Post Challenge Button */}
            <li className='mt-6'>
              <Link
                href='/challenges/new'
                className='group flex w-full gap-x-3 rounded-lg bg-secondary p-3 text-sm font-semibold leading-6 text-white shadow-md hover:bg-secondary/90 transition-all duration-200'
              >
                <Plus className='h-6 w-6 shrink-0' aria-hidden='true' />
                Post Challenge
              </Link>
            </li>

            {/* Secondary Navigation */}
            <li className='mt-auto'>
              <ul role='list' className='-mx-2 space-y-1'>
                {secondaryItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 transition-all duration-200
                          ${
                            isActive
                              ? 'bg-primary text-white shadow-md'
                              : 'text-neutral-700 hover:text-primary hover:bg-neutral-50'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 transition-colors ${
                            isActive
                              ? 'text-white'
                              : 'text-neutral-400 group-hover:text-primary'
                          }`}
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
                <li>
                  <button className='group flex w-full gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-neutral-700 hover:text-danger hover:bg-neutral-50 transition-all duration-200'>
                    <LogOut
                      className='h-6 w-6 shrink-0 text-neutral-400 group-hover:text-danger'
                      aria-hidden='true'
                    />
                    Sign Out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
