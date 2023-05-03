import classNames from 'classnames'
import {
  Dropdown as FlowbiteDropdown,
  DropdownProps as FlowbiteDropdownProps
} from 'flowbite-react'
import { ReactNode } from 'react'

export interface DropdownItem {
  id: string
  content: ReactNode
  onClick: (id: string) => void
}

export interface DropdownProps extends Omit<FlowbiteDropdownProps, 'label'> {
  label: ReactNode
  items: DropdownItem[]
  header?: ReactNode
}

export const Dropdown = (props: DropdownProps) => {
  const { label, items, header, className, ...rest } = props

  return (
    <FlowbiteDropdown
      theme={{
        content: 'flex flex-col items-center',
        floating: {
          content: 'px-2 py-2',
          style: {
            auto: 'bg-pt-purple-50'
          }
        },
        arrowIcon: 'ml-2 h-4 w-4 stroke-[4]'
      }}
      label={label}
      className={classNames(className)}
      {...rest}
    >
      <>
        {header}
        {items.map((item) => {
          return (
            <FlowbiteDropdown.Item
              key={`dd-${item.id}`}
              theme={{ base: 'flex items-center justify-center w-full cursor-pointer' }}
              onClick={() => item.onClick(item.id)}
            >
              {item.content}
            </FlowbiteDropdown.Item>
          )
        })}
      </>
    </FlowbiteDropdown>
  )
}
