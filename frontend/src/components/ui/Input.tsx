import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

/**
 * A standard, accessible Input component.
 * Applies the SabiMind design system styling.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...rest }, ref) => {
    const inputClasses = `
      w-full px-4 py-3 rounded-lg border transition-all duration-200
      bg-white text-gray-900 placeholder-gray-500
      focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
      ${
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 hover:border-gray-400'
      }
      ${className}
    `.trim()

    return (
      <div className='w-full'>
        {label && (
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...rest} />
        {error && (
          <p className='mt-1 text-sm text-red-600' role='alert'>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className='mt-1 text-sm text-gray-500'>{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
