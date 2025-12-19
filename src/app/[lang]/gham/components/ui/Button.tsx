import * as React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-1 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg text-sm'

    const variants = {
      default: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
      outline:
        'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-300',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className, 'px-4 py-2')}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
