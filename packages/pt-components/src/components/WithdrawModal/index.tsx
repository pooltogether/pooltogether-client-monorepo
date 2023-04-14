import { useIsWithdrawModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Modal } from 'pt-ui'
import { WithdrawModalBody } from './WithdrawModalBody'
import { WithdrawModalFooter } from './WithdrawModalFooter'

export interface WithdrawModalProps {
  theme?: 'light' | 'dark'
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModal = (props: WithdrawModalProps) => {
  const { theme, openConnectModal, openChainModal, addRecentTransaction } = props

  const { vault } = useSelectedVault()

  const { isWithdrawModalOpen, setIsWithdrawModalOpen } = useIsWithdrawModalOpen()

  if (isWithdrawModalOpen) {
    return (
      <Modal
        theme={theme}
        bodyContent={!!vault && <WithdrawModalBody vault={vault} />}
        footerContent={
          !!vault && (
            <WithdrawModalFooter
              vault={vault}
              openConnectModal={openConnectModal}
              openChainModal={openChainModal}
              addRecentTransaction={addRecentTransaction}
            />
          )
        }
        onClose={() => setIsWithdrawModalOpen(false)}
      />
    )
  }
}
