import classNames from 'classnames'
import { Button as FlowbiteButton, ButtonProps as FlowbiteButtonProps } from 'flowbite-react'

export interface ButtonProps extends FlowbiteButtonProps {
  color?: 'teal' | 'purple' | 'white'
  active?: boolean
}

export const Button = (props: ButtonProps) => {
  const { color, active, className, ...rest } = props

  return (
    <FlowbiteButton
      theme={{
        base: 'group flex h-min items-center justify-center p-0.5 text-center font-medium focus:ring-4 focus:z-10',
        color: {
          teal: 'text-pt-purple-800 bg-pt-teal hover:bg-pt-teal-dark focus:ring-pt-teal-dark',
          purple:
            'text-pt-purple-700 bg-pt-purple-100 hover:bg-pt-purple-200 focus:ring-pt-purple-50',
          white: 'text-gray-900 bg-white hover:bg-gray-100 focus:ring-gray-100'
        },
        outline: {
          color: {
            teal: '!text-pt-teal hover:!text-pt-purple-800 border-pt-teal border bg-opacity-0 hover:bg-opacity-100',
            purple:
              '!text-pt-purple-100 hover:!text-pt-purple-700 border-pt-purple-100 border bg-opacity-0 hover:bg-opacity-100',
            white:
              '!text-white hover:!text-gray-900 border-white border bg-opacity-0 hover:bg-opacity-100'
          },
          on: 'flex justify-center'
        },
        disabled: 'cursor-not-allowed opacity-50 pointer-events-none'
      }}
      color={color ?? 'teal'}
      className={classNames({ outline: active }, className)}
      {...rest}
    />
  )
}
