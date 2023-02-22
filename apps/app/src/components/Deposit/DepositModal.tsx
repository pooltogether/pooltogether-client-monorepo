import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { VaultInfo } from 'pt-types'
import { Button, Modal } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

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
  const { address: userAddress, isDisconnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()

  if (isDisconnected) {
    return (
      <Button fullSized={true} onClick={openConnectModal}>
        Connect
      </Button>
    )
  }

  // TODO: check chain
  // TODO: check approval
  // TODO: exact approval transaction
  // TODO: deposit transaction

  return (
    <>
      <Button fullSized={true} onClick={openChainModal}>
        Chain
      </Button>
    </>
  )
}
