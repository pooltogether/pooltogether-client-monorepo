import classNames from 'classnames'
import { useAtomValue, useSetAtom } from 'jotai'
import { ReactNode } from 'react'
import { FallbackIcon } from 'pt-components'
import { selectedCurrencyAtom, selectedLanguageAtom, settingsModalViewAtom } from '@atoms'
import { SUPPORTED_CURRENCIES } from '@constants/currencies'
import { SUPPORTED_LANGUAGES } from '@constants/languages'

// TODO: add discord icon
export const SettingsMenu = () => {
  const setSettingsModalView = useSetAtom(settingsModalViewAtom)

  const currencyId = useAtomValue(selectedCurrencyAtom)
  const languageId = useAtomValue(selectedLanguageAtom)

  return (
    <div className='flex flex-col gap-4'>
      <SettingsMenuSection
        title='Customize Your Experience'
        items={[
          {
            iconContent: SUPPORTED_CURRENCIES[currencyId].symbol,
            title: `${SUPPORTED_CURRENCIES[currencyId].name} (${SUPPORTED_CURRENCIES[currencyId].symbol})`,
            description: 'Change Currency',
            onClick: () => setSettingsModalView('currency')
          },
          {
            iconContent: languageId.toUpperCase(),
            title: SUPPORTED_LANGUAGES[languageId].nativeName,
            description: 'Change Language',
            onClick: () => setSettingsModalView('language'),
            disabled: true
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
            onClick: () => window.open('https://docs.pooltogether.com/')
          },
          {
            iconContent: <FallbackIcon symbol={'Discord'} />,
            title: 'Talk to us on Discord',
            description: 'Connect with our community',
            onClick: () => window.open('https://pooltogether.com/discord')
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
      <div className='dark:text-pt-purple-100 rounded-full dark:bg-pt-purple-400 flex items-center justify-center text-lg h-8 w-8'>
        {iconContent}
      </div>
      <span className='text-sm font-semibold dark:text-pt-purple-50'>{title}</span>
      <span className='text-xs dark:text-pt-purple-300'>{description}</span>
    </div>
  )
}
