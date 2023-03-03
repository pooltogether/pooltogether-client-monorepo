import classNames from 'classnames'
import { Button as FlowbiteButton, ButtonProps as FlowbiteButtonProps } from 'flowbite-react'

export interface ButtonProps extends Omit<FlowbiteButtonProps, 'color'> {
  color?: 'teal' | 'purple' | 'white'
  active?: boolean
}

// TODO: waiting for button theme to be fixed (https://github.com/themesberg/flowbite-react/issues/646)
export const Button = (props: ButtonProps) => {
  const { color, active, className, ...rest } = props

  return (
    <FlowbiteButton
      {...rest}
      className={classNames(
        'disabled:pointer-events-none',
        {
          'outline outline-2': active,
          'dark:bg-pt-teal dark:text-pt-purple-800 dark:hover:bg-pt-teal-dark dark:outline-pt-teal-dark':
            color === 'teal' || color === undefined,
          'dark:bg-pt-purple-100 dark:text-pt-purple-700 dark:hover:bg-pt-purple-200 dark:hover:text-pt-purple-800 dark:outline-pt-purple-50':
            color === 'purple',
          'dark:bg-white dark:text-gray-900 dark:hover:bg-gray-300 dark:outline-gray-300':
            color === 'white'
        },
        className
      )}
    />
  )
}
