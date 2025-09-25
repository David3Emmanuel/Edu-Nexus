'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input } from '@/components/ui'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implement actual authentication logic
      console.log('Login attempt:', formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For now, just redirect to dashboard
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-break-md w-full space-y-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-600'>
            Sign in to continue your learning journey
          </p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {errors.general && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
                {errors.general}
              </div>
            )}

            <Input
              label='Email Address'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder='Enter your email'
              autoComplete='email'
              required
            />

            <Input
              label='Password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              placeholder='Enter your password'
              autoComplete='current-password'
              required
            />

            <div className='flex items-center justify-between'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary'
                />
                <span className='ml-2 text-sm text-gray-600'>Remember me</span>
              </label>

              <Link
                href='/forgot-password'
                className='text-sm text-primary hover:text-blue-600 font-medium'
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type='submit'
              variant='primary'
              size='lg'
              disabled={isLoading}
              className='w-full'
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-600'>
              Don't have an account?{' '}
              <Link
                href='/signup'
                className='text-primary hover:text-blue-600 font-medium'
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-3'>
              <button
                type='button'
                className='w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 transition-colors'
              >
                <svg className='h-5 w-5' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='currentColor'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
              </button>

              <button
                type='button'
                className='w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 transition-colors'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.703 0 1.042.527 1.042 1.16 0 .703-.448 1.754-.219 2.726.199.844.844 1.424 1.709 1.424 2.052 0 3.628-2.16 3.628-5.274 0-2.76-1.983-4.691-4.82-4.691-3.284 0-5.213 2.468-5.213 5.021 0 .996.383 2.064.859 2.645.094.112.108.21.08.323-.088.369-.285 1.16-.323 1.323-.053.219-.173.265-.398.159-1.487-.691-2.413-2.863-2.413-4.604 0-3.761 2.734-7.229 7.874-7.229 4.142 0 7.36 2.95 7.36 6.896 0 4.11-2.593 7.417-6.194 7.417-1.211 0-2.351-.63-2.74-1.378 0 0-.599 2.282-.744 2.84-.269 1.026-1.003 2.31-1.492 3.094C9.57 23.812 10.763 24.009 12.017 24c6.62 0 11.99-5.367 11.99-11.987C24.007 5.367 18.637.001 12.017.001z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
