import { Tabs as FlowbiteTabs, TabsProps as FlowbiteTabsProps } from 'flowbite-react'
import { ReactNode } from 'react'

export interface TabItem {
  title: string
  content?: ReactNode
  disabled?: boolean
}

export interface TabsProps extends FlowbiteTabsProps {
  items: TabItem[]
  defaultActiveTab?: number
}

// TODO: waiting for flowbite-react to bump versions to use `theme` here
export const Tabs = (props: TabsProps) => {
  const { items, defaultActiveTab, ...rest } = props

  return (
    <FlowbiteTabs.Group style='pills' {...rest}>
      {items.map((item, i) => {
        return (
          <FlowbiteTabs.Item
            key={`tab-${item.title.toLowerCase().replace(' ', '-')}-${i}`}
            active={i === defaultActiveTab ?? 0}
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
