'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input } from '@/components/ui'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('Email is required')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement actual password reset logic
      console.log('Password reset request for:', email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
    } catch (error) {
      console.error('Password reset error:', error)
      setError('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full space-y-8'>
          <div className='text-center'>
            <div className='mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center'>
              <svg
                className='h-8 w-8 text-green-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h1 className='text-4xl font-extrabold text-gray-900 mt-6 mb-2'>
              Check Your Email
            </h1>
            <p className='text-gray-600 mb-8'>
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-8 text-center'>
            <p className='text-gray-600 mb-6'>
              Didn't receive the email? Check your spam folder or click below to
              resend.
            </p>

            <Button
              onClick={() => setIsSubmitted(false)}
              variant='outline'
              size='md'
              className='w-full mb-4'
            >
              Resend Email
            </Button>

            <Link
              href='/login'
              className='block text-primary hover:text-blue-600 font-medium'
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full space-y-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 mb-2'>
            Forgot Password?
          </h1>
          <p className='text-gray-600'>
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <Input
              label='Email Address'
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              error={error}
              placeholder='Enter your email address'
              autoComplete='email'
              required
            />

            <Button
              type='submit'
              variant='primary'
              size='lg'
              disabled={isLoading}
              className='w-full'
            >
              {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className='mt-6 text-center'>
            <Link
              href='/login'
              className='text-primary hover:text-blue-600 font-medium'
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
