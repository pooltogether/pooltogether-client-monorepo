import { SparklesIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ReactNode } from 'react'
import {
  SUPPORTED_CURRENCIES,
  SUPPORTED_LANGUAGES,
  useSelectedCurrency,
  useSelectedLanguage
} from 'pt-generic-hooks'
import { BasicIcon, LINKS } from 'pt-ui'
import { SettingsModalOption, SettingsModalTheme, SettingsModalView } from '.'
import { ClipboardListIcon } from '../Icons/ClipboardListIcon'

interface SettingsMenuProps {
  setView: (view: SettingsModalView) => void
  theme?: SettingsModalTheme
  disable?: SettingsModalOption[]
  hide?: SettingsModalOption[]
}

export const SettingsMenu = (props: SettingsMenuProps) => {
  const { setView, disable, hide } = props

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
            onClick: () => setView('currency'),
            disabled: disable?.includes('currency'),
            hidden: hide?.includes('currency')
          },
          {
            iconContent: selectedLanguage.toUpperCase(),
            title: `${SUPPORTED_LANGUAGES[selectedLanguage].nativeName} (${SUPPORTED_LANGUAGES[selectedLanguage].name})`,
            onClick: () => setView('language'),
            disabled: disable?.includes('language'),
            hidden: hide?.includes('language')
          },
          {
            iconContent: <SparklesIcon className='h-6 w-6 text-pt-purple-100' />,
            title: 'View Extensions',
            onClick: () => setView('extensions'),
            disabled: disable?.includes('extensions'),
            hidden: hide?.includes('extensions')
          },
          {
            iconContent: <ClipboardListIcon className='h-6 w-6 text-pt-purple-100' />,
            title: 'Manage Prize Asset Lists',
            onClick: () => setView('vaultLists'),
            disabled: disable?.includes('vaultLists'),
            hidden: hide?.includes('vaultLists')
          }
        ]}
      />
      <SettingsMenuSection
        title='Get Help'
        items={[
          {
            iconContent: '?',
            title: 'Get Help w/ Using PoolTogether',
            onClick: () => window.open(LINKS.docs)
          }
        ]}
      />
    </div>
  )
}

interface SettingsMenuSectionProps {
  title: string
  items: SettingsMenuItemProps[]
  theme?: SettingsModalTheme
}

const SettingsMenuSection = (props: SettingsMenuSectionProps) => {
  const { title, items, theme } = props

  return (
    <div className='flex flex-col gap-4'>
      <span
        className={classNames('text-2xl font-semibold', {
          'text-pt-purple-50': theme === 'light' || theme === undefined,
          'text-pt-purple-300': theme === 'dark'
        })}
      >
        {title}
      </span>
      {items.map((item) => {
        return (
          <SettingsMenuItem
            key={`st-item-${item.title.toLowerCase().replaceAll(' ', '-')}`}
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
  onClick: () => void
  theme?: SettingsModalTheme
  disabled?: boolean
  hidden?: boolean
}

const SettingsMenuItem = (props: SettingsMenuItemProps) => {
  const { iconContent, title, onClick, theme, disabled, hidden } = props

  return (
    <div
      className={classNames(
        'flex gap-3 w-full rounded-lg px-8 py-4 select-none relative',
        {
          'bg-pt-transparent hover:bg-pt-transparent/5': theme === 'light' || theme === undefined,
          'bg-pt-purple-600/40 hover:bg-pt-purple-600/60': theme === 'dark'
        },
        { 'cursor-pointer': !disabled, 'brightness-50': disabled },
        { hidden: hidden }
      )}
      onClick={() => {
        if (!disabled) {
          onClick()
        }
      }}
    >
      <BasicIcon content={iconContent} size='lg' theme={theme === 'dark' ? 'light' : 'dark'} />
      <span className='flex items-center text-pt-purple-50'>{title}</span>
    </div>
  )
}
