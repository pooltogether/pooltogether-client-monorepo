import { Tabs as FlowbiteTabs, TabsProps as FlowbiteTabsProps } from 'flowbite-react'
import { ReactNode } from 'react'

export interface TabItem {
  name: string
  title: ReactNode
  content?: ReactNode
  disabled?: boolean
}

export interface TabsProps extends FlowbiteTabsProps {
  items: TabItem[]
  defaultActiveTab?: number
}

export const Tabs = (props: TabsProps) => {
  const { items, defaultActiveTab, ...rest } = props

  return (
    <FlowbiteTabs.Group {...rest}>
      {items.map((item, i) => {
        return (
          <FlowbiteTabs.Item
            key={`tab-${item.name.toLowerCase().replaceAll(' ', '-')}-${i}`}
            active={i === defaultActiveTab ?? 0}
            // @ts-ignore
            title={item.title}
            disabled={item.disabled}
          >
            {/* @ts-ignore */}
            {item.content}
          </FlowbiteTabs.Item>
        )
      })}
    </FlowbiteTabs.Group>
  )
}
