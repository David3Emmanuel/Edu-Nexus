import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

/**
 * A standard, accessible Button component.
 * Applies the 'Student-Friendly Gamified' primary style.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const baseClasses =
    'font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  }

  let variantClasses = ''

  if (variant === 'primary') {
    variantClasses = `bg-primary text-white shadow-primary-md hover:bg-blue-600 active:shadow-none`
  } else if (variant === 'secondary') {
    variantClasses = `bg-secondary text-white hover:bg-green-700`
  } else if (variant === 'outline') {
    variantClasses = `border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white`
  }

  const disabledClasses = disabled
    ? 'bg-gray-300 text-gray-600 cursor-not-allowed shadow-none hover:bg-gray-300'
    : variantClasses

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      aria-disabled={disabled}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
