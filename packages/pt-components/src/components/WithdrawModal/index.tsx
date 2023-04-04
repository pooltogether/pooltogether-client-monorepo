import { useEffect, useState } from 'react'
import { useIsWithdrawModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Modal } from 'pt-ui'
import { WithdrawModalBody } from './WithdrawModalBody'
import { WithdrawModalFooter } from './WithdrawModalFooter'

export interface WithdrawModalProps {
  bgColor?: 'light' | 'dark'
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModal = (props: WithdrawModalProps) => {
  const { bgColor, openConnectModal, openChainModal, addRecentTransaction } = props

  const { vault } = useSelectedVault()

  const { isWithdrawModalOpen, setIsWithdrawModalOpen } = useIsWithdrawModalOpen()

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  if (isBrowser) {
    return (
      <Modal
        show={isWithdrawModalOpen}
        dismissible={true}
        position='center'
        bgColor={bgColor}
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
