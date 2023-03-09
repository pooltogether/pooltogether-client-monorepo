import classNames from 'classnames'
import { Button as FlowbiteButton, ButtonProps as FlowbiteButtonProps } from 'flowbite-react'

export interface ButtonProps extends Omit<FlowbiteButtonProps, 'theme'> {
  color?: 'teal' | 'purple' | 'white'
  active?: boolean
}

// TODO: button themes still broken on flowbite-react - need to re-test this component once fixed
export const Button = (props: ButtonProps) => {
  const { color, active, className, ...rest } = props

  return (
    <FlowbiteButton
      theme={{
        base: 'group flex h-min items-center justify-center p-0.5 text-center font-medium outline-2 focus:ring-4 focus:z-10',
        color: {
          teal: 'text-pt-purple-800 bg-pt-teal hover:bg-pt-teal-dark outline-pt-teal-dark focus:ring-pt-teal-dark',
          purple:
            'text-pt-purple-700 bg-pt-purple-100 hover:bg-pt-purple-200 outline-pt-purple-50 focus:ring-pt-purple-50',
          white: 'text-gray-900 bg-white hover:bg-gray-100 outline-gray-100 focus:ring-gray-100'
        },
        outline: {
          color: {
            teal: 'text-pt-teal border-pt-teal hover:text-pt-purple-800 hover:bg-pt-teal outline-pt-teal focus:ring-pt-teal',
            purple:
              'text-pt-purple-100 border-pt-purple-100 hover:text-pt-purple-700 hover:bg-pt-purple-100 outline-pt-purple-100 focus:ring-pt-purple-100',
            white:
              'text-white border-white hover:text-gray-900 hover:bg-white outline-white focus:ring-white'
          },
          on: 'bg-opacity-0 hover:bg-opacity-100 border-1 transition-all duration-75 ease-in'
        },
        disabled: 'cursor-not-allowed opacity-50 pointer-events-none'
      }}
      color={color ?? 'teal'}
      className={classNames({ outline: active }, className)}
      {...rest}
    />
  )
}
