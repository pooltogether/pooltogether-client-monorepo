import { VaultInfo } from 'pt-types'
import { Modal } from 'pt-ui'
import { useEffect, useState } from 'react'

interface DepositModalProps {
  vaultInfo: VaultInfo
  isOpen: boolean
  onClose?: () => void
}

export const DepositModal = (props: DepositModalProps) => {
  const { vaultInfo, isOpen, onClose } = props
  const [isBrowser, setIsBrowser] = useState(false)

  // NOTE: This is necessary due to hydration errors otherwise.
  useEffect(() => setIsBrowser(true), [])

  if (isBrowser) {
    return (
      <Modal
        show={isOpen}
        dismissible={true}
        headerContent={'HEADER'}
        bodyContent={'BODY'}
        footerContent={'FOOTER'}
        onClose={onClose}
      />
    )
  }
}
