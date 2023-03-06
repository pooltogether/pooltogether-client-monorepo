import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ReactNode, useEffect, useState } from 'react'
import { Modal } from 'pt-ui'
import { CurrencySelector } from './CurrencySelector'
import { LanguageSelector } from './LanguageSelector'
import { SettingsMenu } from './SettingsMenu'

export type SettingsModalView = 'menu' | 'currency' | 'language'

export interface SettingsModalProps {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  view: SettingsModalView
  setView: (view: SettingsModalView) => void
  currencyId: string
  setCurrencyId: (id: string) => void
  languageId: string
  setLanguageId: (id: string) => void
  currencies: { [id: string]: { name: string; symbol: string } }
  languages: { [id: string]: { name: string; nativeName: string } }
  disableCurrencies?: boolean
  disableLanguages?: boolean
}

export const SettingsModal = (props: SettingsModalProps) => {
  const {
    isOpen,
    setIsOpen,
    view,
    setView,
    currencyId,
    setCurrencyId,
    languageId,
    setLanguageId,
    currencies,
    languages,
    disableCurrencies,
    disableLanguages
  } = props

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  const modalViews: Record<SettingsModalView, ReactNode> = {
    menu: (
      <SettingsMenu
        setView={setView}
        currencyId={currencyId}
        languageId={languageId}
        currencies={currencies}
        languages={languages}
        disableCurrencies={disableCurrencies}
        disableLanguages={disableLanguages}
      />
    ),
    currency: (
      <CurrencySelector
        currencyId={currencyId}
        setCurrencyId={setCurrencyId}
        currencies={currencies}
      />
    ),
    language: (
      <LanguageSelector
        languageId={languageId}
        setLanguageId={setLanguageId}
        languages={languages}
      />
    )
  }

  if (isBrowser) {
    return (
      <Modal
        show={isOpen}
        dismissible={true}
        position='center'
        bgColor='dark'
        headerContent={
          view !== 'menu' ? (
            <ArrowLeftIcon
              className='h-6 w-6 dark:text-pt-purple-50 cursor-pointer'
              onClick={() => setView('menu')}
            />
          ) : undefined
        }
        bodyContent={modalViews[view]}
        onClose={() => {
          setIsOpen(false)
          setView('menu')
        }}
      />
    )
  }
}
