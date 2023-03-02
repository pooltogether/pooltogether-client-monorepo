import { useAtom } from 'jotai'
import { ReactNode, useEffect, useState } from 'react'
import { Modal } from 'pt-ui'
import { isSettingsModalOpenAtom, ModalView, settingsModalViewAtom } from '@atoms'
import { CurrencySelector } from './CurrencySelector'
import { LanguageSelector } from './LanguageSelector'
import { SettingsMenu } from './SettingsMenu'

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
        bodyContent={modalViews[view]}
        onClose={() => {
          setIsOpen(false)
          setView('menu')
        }}
      />
    )
  }
}
