'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, SkillCoin } from '@/components/ui'
import { createResponse, ResponseFormPayload, User } from '@/api'

interface ResponseFormProps {
  challengeId: number
  author: User
}

export function ResponseForm({ challengeId, author }: ResponseFormProps) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      setError('Response content cannot be empty.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const payload: ResponseFormPayload = {
        content,
        challenge: challengeId,
        author: author.id,
      }
      await createResponse(payload)

      // Clear content and refresh the page to show the new response
      setContent('')
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-12 pt-8 border-t'>
      <h3 className='text-xl font-bold text-text-dark mb-4'>Your Answer</h3>
      <p className='text-gray-600 mb-6'>
        Share your solution and earn <SkillCoin count={25} size='sm' /> for a
        quality answer!
      </p>

      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4'>
          {error}
        </div>
      )}

      <div className='space-y-4'>
        <textarea
          className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none'
          rows={8}
          placeholder='Provide a detailed answer to this challenge. Include technical details, implementation steps, and any supporting evidence...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              size='sm'
              type='button'
              disabled={isSubmitting}
            >
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
            <span className='text-sm text-gray-500'>Markdown supported</span>
          </div>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Post Answer'}
          </Button>
        </div>
      </div>
    </form>
  )
}
