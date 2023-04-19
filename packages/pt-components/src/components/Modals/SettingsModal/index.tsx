import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { MODAL_KEYS, useIsModalOpen } from 'pt-generic-hooks'
import { Modal } from 'pt-ui'
import { CurrencyView } from './Views/CurrencyView'
import { LanguageView } from './Views/LanguageView'
import { MenuView } from './Views/MenuView'
import { VaultListView } from './Views/VaultListView'

export type SettingsModalOption = 'currency' | 'language' | 'extensions' | 'vaultLists'

export type SettingsModalView = 'menu' | SettingsModalOption

export interface SettingsModalProps {
  view: SettingsModalView
  setView: (view: SettingsModalView) => void
  disable?: SettingsModalOption[]
  hide?: SettingsModalOption[]
}

export const SettingsModal = (props: SettingsModalProps) => {
  const { view, setView, disable, hide } = props

  const { isModalOpen, setIsModalOpen } = useIsModalOpen(MODAL_KEYS.settings)

  const modalViews: Record<SettingsModalView, ReactNode> = {
    menu: <MenuView setView={setView} disable={disable} hide={hide} />,
    currency: <CurrencyView setView={setView} />,
    language: <LanguageView setView={setView} />,
    extensions: <></>, // TODO: implement extensions view
    vaultLists: <VaultListView />
  }

  if (isModalOpen) {
    return (
      <Modal
        headerContent={
          view !== 'menu' ? (
            <ArrowLeftIcon
              className='h-6 w-6 text-pt-purple-100 cursor-pointer'
              onClick={() => setView('menu')}
            />
          ) : undefined
        }
        bodyContent={modalViews[view]}
        onClose={() => {
          setIsModalOpen(false)
          setView('menu')
        }}
      />
    )
  }
}