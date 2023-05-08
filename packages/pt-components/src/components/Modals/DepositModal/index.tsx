import classNames from 'classnames'
import { ReactNode, useMemo, useState } from 'react'
import { PrizePool } from 'pt-client-js'
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
  prizePools: PrizePool[]
  onGoToAccount?: () => void
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
  refetchUserBalances?: () => void
}

export const DepositModal = (props: DepositModalProps) => {
  const {
    prizePools,
    onGoToAccount,
    openConnectModal,
    openChainModal,
    addRecentTransaction,
    refetchUserBalances
  } = props

  const { vault } = useSelectedVault()

  const { isModalOpen, setIsModalOpen } = useIsModalOpen(MODAL_KEYS.deposit)

  const [view, setView] = useState<DepositModalView>('main')

  const [depositTxHash, setDepositTxHash] = useState<string>()

  const prizePool = useMemo(() => {
    if (!!vault) {
      return prizePools.find((prizePool) => prizePool.chainId === vault.chainId)
    }
  }, [prizePools, vault])

  const handleClose = () => {
    setIsModalOpen(false)
    setView('main')
  }

  if (isModalOpen && !!vault) {
    const modalViews: Record<DepositModalView, ReactNode> = {
      main: <MainView vault={vault} prizePool={prizePool as PrizePool} />,
      waiting: <WaitingView vault={vault} closeModal={handleClose} />,
      confirming: <ConfirmingView vault={vault} txHash={depositTxHash} closeModal={handleClose} />,
      success: (
        <SuccessView
          vault={vault}
          txHash={depositTxHash}
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
            <DepositTxButton
              vault={vault}
              setModalView={setView}
              setDepositTxHash={setDepositTxHash}
              openConnectModal={openConnectModal}
              openChainModal={openChainModal}
              addRecentTransaction={addRecentTransaction}
              refetchUserBalances={refetchUserBalances}
            />
            <DepositDisclaimer />
          </div>
        }
        onClose={handleClose}
        hideHeader={true}
      />
    )
  }
}

const DepositDisclaimer = () => {
  return (
    <span className='text-xs text-pt-purple-100 px-6'>
      By clicking "Deposit", you agree to PoolTogether's Terms of Service and acknowledge that you
      have read and understand the PoolTogether protocol disclaimer.
    </span>
  )
}
