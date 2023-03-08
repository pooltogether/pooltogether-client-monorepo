import classNames from 'classnames'
import { ReactNode } from 'react'
import {
  SUPPORTED_CURRENCIES,
  SUPPORTED_LANGUAGES,
  useSelectedCurrency,
  useSelectedLanguage
} from 'pt-generic-hooks'
import { BasicIcon, LINKS, SocialIcon } from 'pt-ui'
import { SettingsModalView } from '.'

interface SettingsMenuProps {
  setView: (view: SettingsModalView) => void
  disableCurrencies?: boolean
  disableLanguages?: boolean
}

export const SettingsMenu = (props: SettingsMenuProps) => {
  const { setView, disableCurrencies, disableLanguages } = props

  const { selectedCurrency } = useSelectedCurrency()
  const { selectedLanguage } = useSelectedLanguage()

  return (
    <div className='flex flex-col gap-4'>
      <SettingsMenuSection
        title='Customize Your Experience'
        items={[
          {
            iconContent: SUPPORTED_CURRENCIES[selectedCurrency].symbol,
            title: `${SUPPORTED_CURRENCIES[selectedCurrency].name} (${SUPPORTED_CURRENCIES[selectedCurrency].symbol})`,
            description: 'Change Currency',
            onClick: () => setView('currency'),
            disabled: disableCurrencies
          },
          {
            iconContent: selectedLanguage.toUpperCase(),
            title: `${SUPPORTED_LANGUAGES[selectedLanguage].nativeName} (${SUPPORTED_LANGUAGES[selectedLanguage].name})`,
            description: 'Change Language',
            onClick: () => setView('language'),
            disabled: disableLanguages
          }
        ]}
      />
      <SettingsMenuSection
        title='Get Help'
        items={[
          {
            iconContent: '?',
            title: 'Help Documentation',
            description: 'Get help with using PoolTogether',
            onClick: () => window.open(LINKS.docs)
          },
          {
            iconContent: <SocialIcon platform='discord' className='w-6 h-auto' />,
            title: 'Talk to us on Discord',
            description: 'Connect with our community',
            onClick: () => window.open(LINKS.discord)
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
  onClick: () => void
  disabled?: boolean
}

const SettingsMenuItem = (props: SettingsMenuItemProps) => {
  const { iconContent, title, description, onClick, disabled } = props

  return (
    <div
      className={classNames(
        'flex flex-col items-center gap-1 w-full rounded-lg p-4 dark:bg-pt-purple-600/40 select-none relative',
        { 'dark:hover:bg-pt-purple-600/60 cursor-pointer': !disabled, 'brightness-50': disabled }
      )}
      onClick={() => {
        if (!disabled) {
          onClick()
        }
      }}
    >
      <BasicIcon content={iconContent} theme='dark' size='large' />
      <span className='text-sm font-semibold dark:text-pt-purple-50'>{title}</span>
      <span className='text-xs dark:text-pt-purple-300'>{description}</span>
    </div>
  )
}
