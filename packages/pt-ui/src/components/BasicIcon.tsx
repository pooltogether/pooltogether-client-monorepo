import classNames from 'classnames'
import { ReactNode } from 'react'

export interface BasicIconProps {
  content: ReactNode
  theme?: 'light' | 'dark'
  size?: 'small' | 'large'
  className?: string
}

export const BasicIcon = (props: BasicIconProps) => {
  const { content, theme, size, className } = props

  return (
    <div
      className={classNames(
        'rounded-full flex items-center justify-center text-xs h-6 w-6',
        {
          'dark:bg-pt-purple-100 dark:text-pt-purple-800': theme === 'light' || theme === undefined,
          'dark:bg-pt-purple-400 dark:text-pt-purple-100': theme === 'dark',
          'text-xs h-6 w-6': size === 'small' || size === undefined,
          'text-lg h-8 w-8': size === 'large'
        },
        className
      )}
    >
      {content}
    </div>
  )
}
