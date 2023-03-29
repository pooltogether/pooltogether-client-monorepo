import { useEffect, useState } from 'react'
import { Vault } from 'pt-client-js'
import { useIsWithdrawModalOpen } from 'pt-generic-hooks'
import { Modal } from 'pt-ui'
import { TxFormValues } from '../Form/TxFormInput'
import { WithdrawModalBody } from './WithdrawModalBody'
import { WithdrawModalFooter } from './WithdrawModalFooter'

export interface WithdrawModalProps {
  vault: Vault
  bgColor?: 'light' | 'dark'
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModal = (props: WithdrawModalProps) => {
  const { vault, bgColor, openConnectModal, openChainModal, addRecentTransaction } = props

  const { isWithdrawModalOpen, setIsWithdrawModalOpen } = useIsWithdrawModalOpen()

  const [formShareAmount, setFormShareAmount] = useState<TxFormValues['shareAmount']>('0')

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  if (isBrowser && !!vault) {
    return (
      <Modal
        show={isWithdrawModalOpen}
        dismissible={true}
        position='center'
        bgColor={bgColor}
        bodyContent={<WithdrawModalBody vault={vault} setFormShareAmount={setFormShareAmount} />}
        footerContent={
          <WithdrawModalFooter
            vault={vault}
            formShareAmount={formShareAmount}
            openConnectModal={openConnectModal}
            openChainModal={openChainModal}
            addRecentTransaction={addRecentTransaction}
          />
        }
        onClose={() => setIsWithdrawModalOpen(false)}
      />
    )
  }
}
