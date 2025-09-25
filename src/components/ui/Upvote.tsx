import React, { useState } from 'react'

interface UpvoteProps {
  initialCount: number
  initialUpvoted?: boolean
  onUpvote?: (upvoted: boolean, newCount: number) => void
  disabled?: boolean
}

/**
 * Upvote component for gamified interactions.
 * Crucial component for SkillCoin system.
 */
export function Upvote({
  initialCount,
  initialUpvoted = false,
  onUpvote,
  disabled = false,
}: UpvoteProps) {
  const [upvoted, setUpvoted] = useState(initialUpvoted)
  const [count, setCount] = useState(initialCount)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleUpvote = () => {
    if (disabled) return

    const newUpvoted = !upvoted
    const newCount = newUpvoted ? count + 1 : count - 1

    setUpvoted(newUpvoted)
    setCount(newCount)

    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)

    onUpvote?.(newUpvoted, newCount)
  }

  return (
    <div className='flex flex-col items-center'>
      <button
        onClick={handleUpvote}
        disabled={disabled}
        className={`
          p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1
          ${
            disabled
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-gray-100 active:scale-95'
          }
          ${upvoted ? 'text-secondary' : 'text-text-dark'}
        `}
        aria-label={upvoted ? 'Remove upvote' : 'Upvote'}
        aria-pressed={upvoted}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill={upvoted ? 'currentColor' : 'none'}
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='transition-all duration-200'
        >
          <path d='M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3' />
        </svg>
      </button>

      <span
        className={`
          mt-1 text-sm font-bold transition-all duration-200
          ${upvoted ? 'text-secondary' : 'text-text-dark'}
          ${isAnimating ? 'skillcoin-animate' : ''}
        `}
        aria-live='polite'
      >
        {count}
      </span>
    </div>
  )
}
