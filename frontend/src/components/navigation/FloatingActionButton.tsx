'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

export function FloatingActionButton() {
  return (
    <Link
      href='/challenges/new'
      className='fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-lg hover:bg-secondary/90 transition-all duration-200 hover:scale-105 lg:hidden'
      aria-label='Post a new Challenge or Question'
    >
      <Plus className='h-6 w-6' aria-hidden='true' />
    </Link>
  )
}
