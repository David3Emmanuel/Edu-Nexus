'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input } from '@/components/ui'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student', // student or lecturer
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
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
      // TODO: Implement actual registration logic
      console.log('Registration attempt:', formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For now, just redirect to dashboard
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full space-y-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 mb-2'>
            Join EduNexus
          </h1>
          <p className='text-gray-600'>
            Start your gamified learning journey today
          </p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {errors.general && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
                {errors.general}
              </div>
            )}

            {/* User Type Selection */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                I am a:
              </label>
              <div className='grid grid-cols-2 gap-4'>
                <label className='flex items-center justify-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-blue-50'>
                  <input
                    type='radio'
                    name='userType'
                    value='student'
                    checked={formData.userType === 'student'}
                    onChange={handleInputChange}
                    className='sr-only'
                  />
                  <div className='text-center'>
                    <div className='text-2xl mb-1'>🎓</div>
                    <div className='text-sm font-medium'>Student</div>
                  </div>
                </label>
                <label className='flex items-center justify-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-blue-50'>
                  <input
                    type='radio'
                    name='userType'
                    value='lecturer'
                    checked={formData.userType === 'lecturer'}
                    onChange={handleInputChange}
                    className='sr-only'
                  />
                  <div className='text-center'>
                    <div className='text-2xl mb-1'>👨‍🏫</div>
                    <div className='text-sm font-medium'>Lecturer</div>
                  </div>
                </label>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <Input
                label='First Name'
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                placeholder='John'
                autoComplete='given-name'
                required
              />

              <Input
                label='Last Name'
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                placeholder='Doe'
                autoComplete='family-name'
                required
              />
            </div>

            <Input
              label='Email Address'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder='john.doe@example.com'
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
              placeholder='Create a strong password'
              autoComplete='new-password'
              helperText='Must be at least 8 characters with uppercase, lowercase, and numbers'
              required
            />

            <Input
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              placeholder='Confirm your password'
              autoComplete='new-password'
              required
            />

            <div className='flex items-start'>
              <input
                type='checkbox'
                name='agreeToTerms'
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className='h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mt-1'
              />
              <div className='ml-3'>
                <label className='text-sm text-gray-700'>
                  I agree to the{' '}
                  <Link
                    href='/terms'
                    className='text-primary hover:text-blue-600 font-medium'
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/privacy'
                    className='text-primary hover:text-blue-600 font-medium'
                  >
                    Privacy Policy
                  </Link>
                </label>
                {errors.agreeToTerms && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>
            </div>

            <Button
              type='submit'
              variant='primary'
              size='lg'
              disabled={isLoading}
              className='w-full'
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-600'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='text-primary hover:text-blue-600 font-medium'
              >
                Sign in here
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
                  Or sign up with
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
                  className='h-5 w-5 text-blue-600'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className='bg-white rounded-xl shadow-lg p-6 mt-8'>
          <h3 className='text-lg font-bold text-gray-900 mb-4 text-center'>
            What you'll get with EduNexus
          </h3>
          <div className='space-y-3'>
            <div className='flex items-center text-sm text-gray-700'>
              <div className='text-green-500 mr-3'>🪙</div>
              <span>Earn SkillCoins for learning and helping others</span>
            </div>
            <div className='flex items-center text-sm text-gray-700'>
              <div className='text-blue-500 mr-3'>🎯</div>
              <span>Track progress with gamified challenges</span>
            </div>
            <div className='flex items-center text-sm text-gray-700'>
              <div className='text-purple-500 mr-3'>📜</div>
              <span>Build your Proof-of-Skill Passport</span>
            </div>
            <div className='flex items-center text-sm text-gray-700'>
              <div className='text-orange-500 mr-3'>🏆</div>
              <span>Compete on leaderboards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
