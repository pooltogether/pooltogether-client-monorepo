import { useIsDepositModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Modal } from 'pt-ui'
import { DepositModalBody } from './DepositModalBody'
import { DepositModalFooter } from './DepositModalFooter'

export interface DepositModalProps {
  theme?: 'light' | 'dark'
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const DepositModal = (props: DepositModalProps) => {
  const { theme, openConnectModal, openChainModal, addRecentTransaction } = props

  const { vault } = useSelectedVault()

  const { isDepositModalOpen, setIsDepositModalOpen } = useIsDepositModalOpen()

  return (
    <Modal
      isOpen={isDepositModalOpen}
      theme={theme}
      bodyContent={!!vault && <DepositModalBody vault={vault} />}
      footerContent={
        !!vault && (
          <DepositModalFooter
            vault={vault}
            openConnectModal={openConnectModal}
            openChainModal={openChainModal}
            addRecentTransaction={addRecentTransaction}
          />
        )
      }
      onClose={() => setIsDepositModalOpen(false)}
    />
  )
}
