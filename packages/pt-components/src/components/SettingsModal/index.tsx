import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ReactNode, useEffect, useState } from 'react'
import { useIsSettingsModalOpen } from 'pt-generic-hooks'
import { Modal } from 'pt-ui'
import { CurrencySelector } from './CurrencySelector'
import { LanguageSelector } from './LanguageSelector'
import { SettingsMenu } from './SettingsMenu'

export type SettingsModalView = 'menu' | 'currency' | 'language'

export interface SettingsModalProps {
  view: SettingsModalView
  setView: (view: SettingsModalView) => void
  disableCurrencies?: boolean
  disableLanguages?: boolean
}

export const SettingsModal = (props: SettingsModalProps) => {
  const { view, setView, disableCurrencies, disableLanguages } = props

  const { isSettingsModalOpen, setIsSettingsModalOpen } = useIsSettingsModalOpen()

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  const modalViews: Record<SettingsModalView, ReactNode> = {
    menu: (
      <SettingsMenu
        setView={setView}
        disableCurrencies={disableCurrencies}
        disableLanguages={disableLanguages}
      />
    ),
    currency: <CurrencySelector setView={setView} />,
    language: <LanguageSelector setView={setView} />
  }

  if (isBrowser) {
    return (
      <Modal
        show={isSettingsModalOpen}
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
          setIsSettingsModalOpen(false)
          setView('menu')
        }}
      />
    )
  }
}
