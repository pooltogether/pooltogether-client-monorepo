import classNames from 'classnames'
import { useAtomValue } from 'jotai'
import { ReactNode, useState } from 'react'
import { MODAL_KEYS, useIsModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Modal, toast } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'
import { withdrawFormTokenAmountAtom } from '../../Form/WithdrawForm'
import { TransactionToast } from '../../Toasts/TransactionToast'
import { ConfirmingView } from './Views/ConfirmingView'
import { ErrorView } from './Views/ErrorView'
import { MainView } from './Views/MainView'
import { ReviewView } from './Views/ReviewView'
import { SuccessView } from './Views/SuccessView'
import { WaitingView } from './Views/WaitingView'
import { WithdrawTxButton } from './WithdrawTxButton'

export type WithdrawModalView = 'main' | 'review' | 'waiting' | 'confirming' | 'success' | 'error'

export interface WithdrawModalProps {
  onGoToAccount?: () => void
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
  refetchUserBalances?: () => void
}

export const WithdrawModal = (props: WithdrawModalProps) => {
  const {
    onGoToAccount,
    openConnectModal,
    openChainModal,
    addRecentTransaction,
    refetchUserBalances
  } = props

  const { vault } = useSelectedVault()

  const { isModalOpen, setIsModalOpen } = useIsModalOpen(MODAL_KEYS.withdraw)

  const [view, setView] = useState<WithdrawModalView>('main')

  const [withdrawTxHash, setWithdrawTxHash] = useState<string>()

  const formTokenAmount = useAtomValue(withdrawFormTokenAmountAtom)

  const createToast = () => {
    if (!!vault && !!withdrawTxHash && view !== 'success' && view !== 'error') {
      toast.custom((id) => (
        <TransactionToast
          id={id}
          type='withdraw'
          vault={vault}
          txHash={withdrawTxHash}
          formattedAmount={formatNumberForDisplay(formTokenAmount)}
          addRecentTransaction={addRecentTransaction}
          refetchUserBalances={refetchUserBalances}
        />
      ))
    }
  }

  const handleClose = () => {
    createToast()
    setIsModalOpen(false)
    setView('main')
  }

  if (isModalOpen && !!vault) {
    const modalViews: Record<WithdrawModalView, ReactNode> = {
      main: <MainView vault={vault} />,
      review: <ReviewView vault={vault} />,
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
              hidden: view !== 'main' && view !== 'review'
            })}
          >
            <WithdrawTxButton
              vault={vault}
              modalView={view}
              setModalView={setView}
              setWithdrawTxHash={setWithdrawTxHash}
              openConnectModal={openConnectModal}
              openChainModal={openChainModal}
              addRecentTransaction={addRecentTransaction}
              refetchUserBalances={refetchUserBalances}
            />
          </div>
        }
        onClose={handleClose}
        hideHeader={true}
      />
    )
  }
}
