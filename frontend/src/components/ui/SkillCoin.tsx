import React from 'react'

interface SkillCoinProps {
  count: number
  showAnimation?: boolean
  size?: 'sm' | 'md' | 'lg'
}

/**
 * SkillCoin component for displaying gamification points.
 * Core to the reward system.
 */
export function SkillCoin({
  count,
  showAnimation = false,
  size = 'md',
}: SkillCoinProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div
      className={`flex items-center gap-2 ${
        showAnimation ? 'skillcoin-animate' : ''
      }`}
    >
      <div className={`${iconSizeClasses[size]} text-secondary`}>
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-full h-full'>
          <circle cx='12' cy='12' r='10' className='text-secondary' />
          <path
            d='M12 6v6l4 2'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            fill='none'
          />
          <text
            x='12'
            y='16'
            textAnchor='middle'
            className='text-xs font-bold fill-white'
          >
            S
          </text>
        </svg>
      </div>

      <span className={`font-extrabold text-secondary ${sizeClasses[size]}`}>
        {count.toLocaleString()}
      </span>

      {size === 'lg' && (
        <span className='text-sm text-gray-600 ml-1'>SkillCoins</span>
      )}
    </div>
  )
}
