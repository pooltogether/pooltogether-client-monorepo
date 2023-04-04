import { useEffect, useState } from 'react'
import { useIsDepositModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Modal } from 'pt-ui'
import { DepositModalBody } from './DepositModalBody'
import { DepositModalFooter } from './DepositModalFooter'

export interface DepositModalProps {
  bgColor?: 'light' | 'dark'
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const DepositModal = (props: DepositModalProps) => {
  const { bgColor, openConnectModal, openChainModal, addRecentTransaction } = props

  const { vault } = useSelectedVault()

  const { isDepositModalOpen, setIsDepositModalOpen } = useIsDepositModalOpen()

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  if (isBrowser) {
    return (
      <Modal
        show={isDepositModalOpen}
        dismissible={true}
        position='center'
        bgColor={bgColor}
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
}
