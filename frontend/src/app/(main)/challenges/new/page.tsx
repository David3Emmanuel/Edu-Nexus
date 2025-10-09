'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SkillCoin } from '@/components/ui/SkillCoin'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ChallengePayload, createChallenge, getCurrentUser, User } from '@/api'
import { useRouter } from 'next/navigation'

const difficultyOptions = [
  {
    value: 'Beginner',
    label: 'Beginner',
    color: 'bg-green-100 text-green-800',
  },
  {
    value: 'Intermediate',
    label: 'Intermediate',
    color: 'bg-yellow-100 text-yellow-800',
  },
  { value: 'Advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' },
] as const

const categoryOptions = [
  { value: 'Academic Q&A', label: 'Academic Q&A' },
  { value: 'Real-world Challenge', label: 'Real-world Challenge' },
  { value: 'Research Project', label: 'Research Project' },
  { value: 'Case Study', label: 'Case Study' },
] as const

export default function NewChallengePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  const [formData, setFormData] = useState<
    Partial<ChallengePayload> & { tags: string }
  >({
    title: '',
    description: '',
    difficulty: 'Intermediate',
    category: 'Academic Q&A',
    skillCoins: 30,
    tags: '',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Failed to fetch user', error)
        // Handle error, maybe redirect to login
        router.push('/login')
      }
    }

    fetchUser()
  }, [router])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'skillCoins' ? parseInt(value, 10) : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError(null)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title || !formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long'
    }

    if (!formData.description || !formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters long'
    }

    if (
      !formData.skillCoins ||
      formData.skillCoins < 10 ||
      formData.skillCoins > 100
    ) {
      newErrors.skillCoins = 'Skill coins must be between 10 and 100'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !user) {
      if (!user) {
        setSubmitError('You must be logged in to create a challenge.')
      }
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const payload: ChallengePayload = {
        title: formData.title!,
        description: formData.description!,
        difficulty: formData.difficulty!,
        category: formData.category!,
        skillCoins: formData.skillCoins!,
        author: user.id,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }

      const data = await createChallenge(payload)

      setSubmitSuccess(true)

      // Show success message briefly before redirecting
      setTimeout(() => {
        router.push(`/challenges/${data.id}`)
      }, 1500)
    } catch (error) {
      console.error('Error creating challenge:', error)
      setSubmitError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-neutral-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <Link
            href='/challenges'
            className='inline-flex items-center text-primary hover:text-blue-700 transition-colors mb-4'
          >
            <ArrowLeft className='h-5 w-5 mr-2' />
            Back to Challenges
          </Link>
          <h1 className='text-3xl font-bold text-gray-900'>
            Create New Challenge
          </h1>
          <p className='mt-2 text-gray-600'>
            Share your knowledge or pose a real-world problem for the community
            to solve.
          </p>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-red-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>
                  Error creating challenge
                </h3>
                <div className='mt-2 text-sm text-red-700'>{submitError}</div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-green-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-green-800'>
                  Challenge created successfully!
                </h3>
                <div className='mt-2 text-sm text-green-700'>
                  Redirecting to challenges page...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8 ${
            isSubmitting ? 'opacity-75 pointer-events-none' : ''
          }`}
        >
          <div className='space-y-6'>
            {/* Title */}
            <div>
              <Input
                name='title'
                label='Challenge Title'
                placeholder='e.g., How to optimize renewable energy systems for urban environments?'
                value={formData.title}
                onChange={handleInputChange}
                error={errors.title}
                helperText='Write a clear, engaging question or challenge statement'
              />
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Description
              </label>
              <textarea
                name='description'
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                  errors.description
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder='Provide detailed context, requirements, constraints, and what kind of solutions you are looking for. Include any relevant background information that would help others understand the challenge.'
                value={formData.description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <p className='mt-1 text-sm text-red-600' role='alert'>
                  {errors.description}
                </p>
              )}
              <p className='mt-1 text-sm text-gray-500'>
                Minimum 50 characters. Be specific and provide context.
              </p>
            </div>

            {/* Category and Difficulty Row */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Category
                </label>
                <select
                  name='category'
                  value={formData.category}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-400 transition-all duration-200'
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Difficulty Level
                </label>
                <div className='flex gap-3'>
                  {difficultyOptions.map((option) => (
                    <button
                      key={option.value}
                      type='button'
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          difficulty: option.value,
                        }))
                      }
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        formData.difficulty === option.value
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Coins and Tags Row */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Skill Coins Reward
                </label>
                <div className='relative'>
                  <input
                    type='number'
                    name='skillCoins'
                    min='10'
                    max='100'
                    step='5'
                    value={formData.skillCoins}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-0 rounded-lg border transition-all duration-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.skillCoins
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  <div className='absolute right-5 top-1/2 transform -translate-y-1/2'>
                    <SkillCoin count={formData.skillCoins ?? 0} />
                  </div>
                </div>
                {errors.skillCoins && (
                  <p className='mt-1 text-sm text-red-600' role='alert'>
                    {errors.skillCoins}
                  </p>
                )}
                <p className='mt-1 text-sm text-gray-500'>
                  Higher rewards attract more responses (10-100 coins)
                </p>
              </div>

              <div>
                <Input
                  name='tags'
                  label='Tags'
                  placeholder='e.g., #Engineering, #Sustainability, #Innovation'
                  value={formData.tags}
                  onChange={handleInputChange}
                  helperText='Separate multiple tags with commas'
                />
              </div>
            </div>

            {/* Tag Preview */}
            {formData.tags.length > 0 && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Tag Preview
                </label>
                <div className='flex flex-wrap gap-2'>
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 border border-gray-200'
                    >
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className='flex justify-end pt-6 border-t border-gray-200'>
              <div className='flex gap-4'>
                <Link href='/challenges'>
                  <Button variant='outline' type='button'>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='min-w-[150px]'
                >
                  {isSubmitting ? 'Creating...' : 'Create Challenge'}
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Tips Section */}
        <div className='mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200'>
          <h3 className='font-semibold text-blue-900 mb-3'>
            💡 Tips for a Great Challenge
          </h3>
          <ul className='space-y-2 text-blue-800 text-sm'>
            <li>
              • Be specific about what you&apos;re looking for in a solution
            </li>
            <li>• Include relevant context and constraints</li>
            <li>• Use clear, professional language</li>
            <li>• Add appropriate tags to help others find your challenge</li>
            <li>• Set a fair skill coin reward based on complexity</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
