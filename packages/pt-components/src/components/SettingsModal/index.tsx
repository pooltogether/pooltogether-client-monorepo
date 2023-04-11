import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ReactNode, useEffect, useState } from 'react'
import { useIsSettingsModalOpen } from 'pt-generic-hooks'
import { Modal } from 'pt-ui'
import { CurrencySelector } from './CurrencySelector'
import { LanguageSelector } from './LanguageSelector'
import { SettingsMenu } from './SettingsMenu'
import { VaultListSelector } from './VaultListSelector'

export type SettingsModalOption = 'currency' | 'language' | 'extensions' | 'vaultLists'

export type SettingsModalView = 'menu' | SettingsModalOption

export type SettingsModalTheme = 'light' | 'dark'

export interface SettingsModalProps {
  view: SettingsModalView
  setView: (view: SettingsModalView) => void
  theme?: SettingsModalTheme
  disable?: SettingsModalOption[]
  hide?: SettingsModalOption[]
}

export const SettingsModal = (props: SettingsModalProps) => {
  const { view, setView, theme, disable, hide } = props

  const { isSettingsModalOpen, setIsSettingsModalOpen } = useIsSettingsModalOpen()

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  const modalViews: Record<SettingsModalView, ReactNode> = {
    menu: <SettingsMenu setView={setView} theme={theme} disable={disable} hide={hide} />,
    currency: <CurrencySelector setView={setView} theme={theme} />,
    language: <LanguageSelector setView={setView} theme={theme} />,
    extensions: <></>, // TODO: implement extensions view
    vaultLists: <VaultListSelector />
  }

  if (isBrowser) {
    return (
      <Modal
        show={isSettingsModalOpen}
        dismissible={true}
        position='center'
        bgColor={theme}
        headerContent={
          view !== 'menu' ? (
            <ArrowLeftIcon
              className={classNames('h-6 w-6 cursor-pointer', {
                'text-pt-purple-50': theme === 'light' || theme === undefined,
                'text-pt-purple-100': theme === 'dark'
              })}
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
