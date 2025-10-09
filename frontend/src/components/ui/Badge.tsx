import React from 'react'

interface BadgeProps {
  title: string
  description?: string
  icon?: string
  gradient?: 'blue' | 'green' | 'purple' | 'orange'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Badge component for Proof-of-Skill Passport.
 * Uses Icon + Gradient/Color Shape for visual appeal.
 */
export function Badge({
  title,
  description,
  icon = '🏆',
  gradient = 'blue',
  size = 'md',
}: BadgeProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl',
  }

  const gradientClasses = {
    blue: 'from-blue-500 to-blue-700',
    green: 'from-secondary to-green-700',
    purple: 'from-purple-500 to-purple-700',
    orange: 'from-orange-500 to-orange-700',
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <div className='flex flex-col items-center text-center group'>
      <div
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br ${gradientClasses[gradient]}
          rounded-xl shadow-lg flex items-center justify-center
          transform transition-transform duration-200 group-hover:scale-105
          border-2 border-white
        `}
        title={description || title}
      >
        <span className='text-white filter drop-shadow-sm'>{icon}</span>
      </div>

      <h4
        className={`mt-2 font-bold text-text-dark ${textSizeClasses[size]} max-w-20`}
      >
        {title}
      </h4>

      {description && size !== 'sm' && (
        <p className='mt-1 text-xs text-gray-600 max-w-24 leading-tight'>
          {description}
        </p>
      )}
    </div>
  )
}
