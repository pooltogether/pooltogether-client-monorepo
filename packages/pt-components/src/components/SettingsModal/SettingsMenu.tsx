import classNames from 'classnames'
import { ReactNode } from 'react'
import {
  SUPPORTED_CURRENCIES,
  SUPPORTED_LANGUAGES,
  useSelectedCurrency,
  useSelectedLanguage
} from 'pt-generic-hooks'
import { BasicIcon, LINKS } from 'pt-ui'
import { SettingsModalTheme, SettingsModalView } from '.'
import { ClipboardListIcon } from '../Icons/ClipboardListIcon'

interface SettingsMenuProps {
  setView: (view: SettingsModalView) => void
  theme?: SettingsModalTheme
  disableCurrencies?: boolean
  disableLanguages?: boolean
  disableVaultLists?: boolean
}

export const SettingsMenu = (props: SettingsMenuProps) => {
  const { setView, disableCurrencies, disableLanguages, disableVaultLists } = props

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
          },
          {
            iconContent: <ClipboardListIcon className='h-6 w-6 text-pt-purple-100' />,
            title: 'Manage Prize Asset Lists',
            description: 'Change the assets displayed on the app',
            onClick: () => setView('vaultLists'),
            disabled: disableVaultLists
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
    <div className='flex flex-col items-center gap-4'>
      <span
        className={classNames('text-xl font-semibold', {
          'text-pt-purple-50': theme === 'light' || theme === undefined,
          'text-pt-purple-300': theme === 'dark'
        })}
      >
        {title}
      </span>
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
  theme?: SettingsModalTheme
  disabled?: boolean
}

const SettingsMenuItem = (props: SettingsMenuItemProps) => {
  const { iconContent, title, description, onClick, theme, disabled } = props

  return (
    <div
      className={classNames(
        'flex flex-col items-center gap-1 w-full rounded-lg p-4 select-none relative',
        {
          'bg-pt-transparent hover:bg-pt-transparent/5': theme === 'light' || theme === undefined,
          'bg-pt-purple-600/40 hover:bg-pt-purple-600/60': theme === 'dark'
        },
        { 'cursor-pointer': !disabled, 'brightness-50': disabled }
      )}
      onClick={() => {
        if (!disabled) {
          onClick()
        }
      }}
    >
      <BasicIcon content={iconContent} size='large' theme={theme === 'dark' ? 'light' : 'dark'} />
      <span className='font-semibold text-pt-purple-50'>{title}</span>
      <span
        className={classNames('text-xs', {
          'text-pt-purple-100': theme === 'light' || theme === undefined,
          'text-pt-purple-300': theme === 'dark'
        })}
      >
        {description}
      </span>
    </div>
  )
}
