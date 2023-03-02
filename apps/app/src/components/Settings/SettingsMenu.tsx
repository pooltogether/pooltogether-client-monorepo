import { ReactNode } from 'react'
import { FallbackIcon } from 'pt-components'

// TODO: get actual currency and language info displayed
// TODO: add onclick functionality
// TODO: add discord icon
export const SettingsMenu = () => {
  return (
    <div className='flex flex-col gap-4'>
      <SettingsMenuSection
        title='Customize Your Experience'
        items={[
          { iconContent: '$', title: 'United States Dollar ($)', description: 'Change Currency' },
          { iconContent: 'EN', title: 'English', description: 'Change Language' }
        ]}
      />
      <SettingsMenuSection
        title='Get Help'
        items={[
          {
            iconContent: '?',
            title: 'Help Documentation',
            description: 'Get help with using PoolTogether'
          },
          {
            iconContent: <FallbackIcon symbol={'Discord'} />,
            title: 'Talk to us on Discord',
            description: 'Connect with our community'
          }
        ]}
      />
    </div>
  )
}

interface SettingsMenuSectionProps {
  title: string
  items: SettingsMenuItemProps[]
}

const SettingsMenuSection = (props: SettingsMenuSectionProps) => {
  const { title, items } = props

  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='text-lg font-semibold dark:text-pt-purple-300'>{title}</span>
      {items.map((item) => {
        return (
          <SettingsMenuItem
            key={`st-item-${item.title.toLowerCase().replace(' ', '-')}`}
            {...item}
          />
        )
      })}
    </div>
  )
}

interface SettingsMenuItemProps {
  iconContent: ReactNode
  title: string
  description: string
  onClick?: () => void
}

const SettingsMenuItem = (props: SettingsMenuItemProps) => {
  const { iconContent, title, description, onClick } = props

  return (
    <div
      className='flex flex-col items-center gap-1 w-full rounded-lg dark:bg-pt-purple-600/40 dark:hover:bg-pt-purple-600/60 p-4 cursor-pointer'
      onClick={onClick}
    >
      <div className='dark:text-pt-purple-100 rounded-full dark:bg-pt-purple-400 flex items-center justify-center text-lg h-8 w-8'>
        {iconContent}
      </div>
      <span className='text-sm font-semibold dark:text-pt-purple-50'>{title}</span>
      <span className='text-xs dark:text-pt-purple-300'>{description}</span>
    </div>
  )
}
