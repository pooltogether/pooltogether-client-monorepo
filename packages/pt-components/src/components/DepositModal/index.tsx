import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import { Vault } from 'pt-client-js'
import { MODAL_KEYS, useIsModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Modal } from 'pt-ui'
import { DepositTxButton } from './DepositTxButton'
import { ConfirmingView } from './Views/ConfirmingView'
import { ErrorView } from './Views/ErrorView'
import { MainView } from './Views/MainView'
import { SuccessView } from './Views/SuccessView'
import { WaitingView } from './Views/WaitingView'

export type DepositModalView = 'main' | 'waiting' | 'confirming' | 'success' | 'error'

export interface DepositModalProps {
  theme?: 'light' | 'dark'
  onGoToAccount?: () => void
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const DepositModal = (props: DepositModalProps) => {
  const { theme, onGoToAccount, openConnectModal, openChainModal, addRecentTransaction } = props

  const { vault } = useSelectedVault()

  const { isModalOpen, setIsModalOpen } = useIsModalOpen(MODAL_KEYS.deposit)

  const [view, setView] = useState<DepositModalView>('main')

  const [depositTxHash, setDepositTxHash] = useState<string>()

  const handleClose = () => {
    setIsModalOpen(false)
    setView('main')
  }

  const getModalBodyView = (view: DepositModalView, vault: Vault): ReactNode => {
    if (!!vault) {
      switch (view) {
        case 'main': {
          return <MainView vault={vault} />
        }
        case 'waiting': {
          return <WaitingView vault={vault} closeModal={handleClose} />
        }
        case 'confirming': {
          return (
            <ConfirmingView
              vault={vault}
              txHash={depositTxHash as string}
              closeModal={handleClose}
            />
          )
        }
        case 'success': {
          return (
            <SuccessView
              vault={vault}
              txHash={depositTxHash as string}
              closeModal={handleClose}
              onGoToAccount={onGoToAccount}
            />
          )
        }
        case 'error': {
          return <ErrorView setModalView={setView} />
        }
      }
    } else {
      return <></>
    }
  }

  if (isModalOpen && !!vault) {
    return (
      <Modal
        theme={theme}
        bodyContent={getModalBodyView(view, vault)}
        footerContent={
          <div
            className={classNames('flex flex-col items-center gap-6', {
              hidden: view !== 'main'
            })}
          >
            <DepositTxButton
              vault={vault}
              setModalView={setView}
              setDepositTxHash={setDepositTxHash}
              openConnectModal={openConnectModal}
              openChainModal={openChainModal}
              addRecentTransaction={addRecentTransaction}
            />
            <span className='text-xs text-pt-purple-100 px-6'>
              By clicking "Deposit", you agree to PoolTogether's Terms of Service and acknowledge
              that you have read and understand the PoolTogether protocol disclaimer.
            </span>
          </div>
        }
        onClose={handleClose}
      />
    )
  }
}
