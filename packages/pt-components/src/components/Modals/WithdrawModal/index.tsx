import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import { MODAL_KEYS, useIsModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Modal } from 'pt-ui'
import { ConfirmingView } from './Views/ConfirmingView'
import { ErrorView } from './Views/ErrorView'
import { MainView } from './Views/MainView'
import { SuccessView } from './Views/SuccessView'
import { WaitingView } from './Views/WaitingView'
import { WithdrawTxButton } from './WithdrawTxButton'

export type WithdrawModalView = 'main' | 'waiting' | 'confirming' | 'success' | 'error'

export interface WithdrawModalProps {
  onGoToAccount?: () => void
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModal = (props: WithdrawModalProps) => {
  const { onGoToAccount, openConnectModal, openChainModal, addRecentTransaction } = props

  const { vault } = useSelectedVault()

  const { isModalOpen, setIsModalOpen } = useIsModalOpen(MODAL_KEYS.withdraw)

  const [view, setView] = useState<WithdrawModalView>('main')

  const [withdrawTxHash, setWithdrawTxHash] = useState<string>()

  const handleClose = () => {
    setIsModalOpen(false)
    setView('main')
  }

  if (isModalOpen && !!vault) {
    const modalViews: Record<WithdrawModalView, ReactNode> = {
      main: <MainView vault={vault} />,
      waiting: <WaitingView vault={vault} closeModal={handleClose} />,
      confirming: <ConfirmingView vault={vault} txHash={withdrawTxHash} closeModal={handleClose} />,
      success: (
        <SuccessView
          vault={vault}
          txHash={withdrawTxHash}
          closeModal={handleClose}
          goToAccount={onGoToAccount}
        />
      ),
      error: <ErrorView setModalView={setView} />
    }

    return (
      <Modal
        bodyContent={modalViews[view]}
        footerContent={
          <div
            className={classNames('flex flex-col items-center gap-6', {
              hidden: view !== 'main'
            })}
          >
            <WithdrawTxButton
              vault={vault}
              setModalView={setView}
              setWithdrawTxHash={setWithdrawTxHash}
              openConnectModal={openConnectModal}
              openChainModal={openChainModal}
              addRecentTransaction={addRecentTransaction}
            />
          </div>
        }
        onClose={handleClose}
        hideHeader={true}
      />
    )
  }
}
