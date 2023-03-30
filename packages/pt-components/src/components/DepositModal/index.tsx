import { useEffect, useState } from 'react'
import { Vault } from 'pt-client-js'
import { useIsDepositModalOpen } from 'pt-generic-hooks'
import { Modal } from 'pt-ui'
import { DepositModalBody } from './DepositModalBody'
import { DepositModalFooter } from './DepositModalFooter'

export interface DepositModalProps {
  vault: Vault
  bgColor?: 'light' | 'dark'
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const DepositModal = (props: DepositModalProps) => {
  const { vault, bgColor, openConnectModal, openChainModal, addRecentTransaction } = props

  const { isDepositModalOpen, setIsDepositModalOpen } = useIsDepositModalOpen()

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  if (isBrowser && !!vault) {
    return (
      <Modal
        show={isDepositModalOpen}
        dismissible={true}
        position='center'
        bgColor={bgColor}
        bodyContent={<DepositModalBody vault={vault} />}
        footerContent={
          <DepositModalFooter
            vault={vault}
            openConnectModal={openConnectModal}
            openChainModal={openChainModal}
            addRecentTransaction={addRecentTransaction}
          />
        }
        onClose={() => setIsDepositModalOpen(false)}
      />
    )
  }
}
