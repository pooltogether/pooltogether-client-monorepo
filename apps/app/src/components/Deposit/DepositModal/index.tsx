import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { VaultInfo } from 'pt-types'
import { Modal } from 'pt-ui'
import { DepositModalBody } from './Body'
import { DepositModalFooter } from './Footer'
import { DepositModalHeader } from './Header'

interface DepositModalProps {
  vaultInfo: VaultInfo
  isOpen: boolean
  onClose?: () => void
}

// TODO: abstract out wagmi hooks and send component to pt-components package
export const DepositModal = (props: DepositModalProps) => {
  const { vaultInfo, isOpen, onClose } = props
  const [isBrowser, setIsBrowser] = useState(false)

  // NOTE: This is necessary due to hydration errors otherwise.
  useEffect(() => setIsBrowser(true), [])

  // TODO: remove this temporary value and fetch from form here or on components themselves
  const depositAmount = BigNumber.from(0)

  if (isBrowser) {
    return (
      <Modal
        show={isOpen}
        dismissible={true}
        headerContent={<DepositModalHeader vaultInfo={vaultInfo} />}
        bodyContent={<DepositModalBody vaultInfo={vaultInfo} />}
        footerContent={<DepositModalFooter vaultInfo={vaultInfo} depositAmount={depositAmount} />}
        onClose={onClose}
      />
    )
  }
}
