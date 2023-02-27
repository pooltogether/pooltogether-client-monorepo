import classNames from 'classnames'
import { Button as FlowbiteButton, ButtonProps as FlowbiteButtonProps } from 'flowbite-react'

export interface ButtonProps extends Omit<FlowbiteButtonProps, 'color' | 'theme'> {
  theme?: 'teal' | 'purple'
}

// TODO: waiting for flowbite-react to bump versions so we can use `theme` everywhere and fix this component
export const Button = (props: ButtonProps) => {
  const { theme, className, ...rest } = props
  return (
    <FlowbiteButton
      {...rest}
      className={classNames(
        'disabled:pointer-events-none',
        {
          'dark:bg-pt-teal dark:text-pt-purple-800 dark:hover:bg-pt-teal-dark':
            theme === 'teal' || !theme,
          'dark:bg-pt-purple-100 dark:text-pt-purple-800 dark:hover:bg-pt-purple-200':
            theme === 'purple'
        },
        className
      )}
    />
  )
}
