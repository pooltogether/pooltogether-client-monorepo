import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { ReactNode, useEffect, useState } from 'react'
import { Modal } from 'pt-ui'
import { isSettingsModalOpenAtom, ModalView, settingsModalViewAtom } from '@atoms'
import { CurrencySelector } from './CurrencySelector'
import { LanguageSelector } from './LanguageSelector'
import { SettingsMenu } from './SettingsMenu'

// TODO: modal overflows height-wise
export const SettingsModal = () => {
  const [isOpen, setIsOpen] = useAtom(isSettingsModalOpenAtom)
  const [view, setView] = useAtom(settingsModalViewAtom)

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  const modalViews: Record<ModalView, ReactNode> = {
    menu: <SettingsMenu />,
    currency: <CurrencySelector />,
    language: <LanguageSelector />
  }

  if (isBrowser) {
    return (
      <Modal
        show={isOpen}
        dismissible={true}
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
