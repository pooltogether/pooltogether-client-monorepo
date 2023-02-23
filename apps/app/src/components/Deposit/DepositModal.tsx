import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { VaultInfo } from 'pt-types'
import { Modal } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { DepositModalButton } from './DepositModalButton'

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

  if (isBrowser) {
    return (
      <Modal
        show={isOpen}
        dismissible={true}
        headerContent={<DepositModalHeader vaultInfo={vaultInfo} />}
        bodyContent={<DepositModalBody vaultInfo={vaultInfo} />}
        footerContent={<DepositModalFooter vaultInfo={vaultInfo} />}
        onClose={onClose}
      />
    )
  }
}

interface DepositModalHeaderProps {
  vaultInfo: VaultInfo
}

const DepositModalHeader = (props: DepositModalHeaderProps) => {
  const vaultName = props.vaultInfo.name
  const networkName = getNiceNetworkNameByChainId(props.vaultInfo.chainId)

  return (
    <span className='font-semibold text-center mt-6'>
      Deposit to {vaultName} on {networkName}
    </span>
  )
}

interface DepositModalBodyProps {
  vaultInfo: VaultInfo
}

const DepositModalBody = (props: DepositModalBodyProps) => {
  // TODO: form with token inputs

  return <></>
}

interface DepositModalFooterProps {
  vaultInfo: VaultInfo
}

const DepositModalFooter = (props: DepositModalFooterProps) => {
  // TODO: get deposit amount from form data and pass it to button
  const depositAmount = BigNumber.from(0)
  return <DepositModalButton vaultInfo={props.vaultInfo} depositAmount={depositAmount} />
}
