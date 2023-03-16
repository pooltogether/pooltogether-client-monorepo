import classNames from 'classnames'
import { ToggleSwitch, ToggleSwitchProps } from 'flowbite-react'

export interface ToggleProps extends ToggleSwitchProps {}

export const Toggle = (props: ToggleProps) => {
  const { className, ...rest } = props

  return (
    <ToggleSwitch
      // TODO: custom theme (below is default theme)
      // theme={{
      //   root: {
      //     base: 'group relative flex items-center rounded-lg focus:outline-none',
      //     active: {
      //       on: 'cursor-pointer',
      //       off: 'cursor-not-allowed opacity-50'
      //     },
      //     label: 'ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'
      //   },
      //   toggle: {
      //     base: 'toggle-bg h-6 w-11 rounded-full border group-focus:ring-4 group-focus:ring-blue-500/25',
      //     checked: {
      //       on: 'after:translate-x-full after:border-white',
      //       off: 'border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700',
      //       color: {
      //         blue: ' bg-blue-700 border-blue-700',
      //         dark: 'bg-dark-700 border-dark-900',
      //         failure: 'bg-red-700 border-red-900',
      //         gray: 'bg-gray-500 border-gray-600',
      //         green: 'bg-green-600 border-green-700',
      //         light: 'bg-light-700 border-light-900',
      //         red: 'bg-red-700 border-red-900',
      //         purple: 'bg-purple-700 border-purple-900',
      //         success: 'bg-green-500 border-green-500',
      //         yellow: 'bg-yellow-400 border-yellow-400',
      //         warning: 'bg-yellow-600 border-yellow-600',
      //         cyan: 'bg-cyan-500 border-cyan-500',
      //         lime: 'bg-lime-400 border-lime-400',
      //         indigo: 'bg-indigo-400 border-indigo-400',
      //         teal: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4',
      //         info: 'bg-blue-600 border-blue-600',
      //         pink: 'bg-pink-600 border-pink-600'
      //       }
      //     }
      //   }
      // }}
      className={classNames(className)}
      {...rest}
    />
  )
}
