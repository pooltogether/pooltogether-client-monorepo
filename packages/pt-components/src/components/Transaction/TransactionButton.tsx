import { useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { Button, ButtonProps } from 'pt-ui'
import { getBlockExplorerUrl, getNiceNetworkNameByChainId } from 'pt-utilities'

export interface TransactionButtonProps extends Omit<ButtonProps, 'onClick'> {
  chainId: number
  write?: () => void
  txHash?: string
  txDescription?: string
  showReceipt?: boolean
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

// TODO: add toasts
export const TransactionButton = (props: TransactionButtonProps) => {
  const {
    chainId,
    write,
    txHash,
    txDescription,
    showReceipt,
    openConnectModal,
    openChainModal,
    addRecentTransaction,
    disabled,
    ...rest
  } = props

  const { isDisconnected } = useAccount()
  const { chain } = useNetwork()

  const { isLoading: isSwitchingNetwork, switchNetwork } = useSwitchNetwork()

  const networkName = getNiceNetworkNameByChainId(chainId)

  useEffect(() => {
    if (!!txHash && !!txDescription && !!addRecentTransaction) {
      addRecentTransaction({
        hash: txHash,
        description: `${networkName}: ${txDescription}`
      })
    }
  }, [txHash, txDescription])

  if (isDisconnected) {
    return (
      <Button onClick={openConnectModal} {...rest}>
        Connect
      </Button>
    )
  } else if (chain?.id !== chainId) {
    return (
      <Button
        onClick={() =>
          !!switchNetwork ? switchNetwork(chainId) : !!openChainModal ? openChainModal() : undefined
        }
        disabled={isSwitchingNetwork}
        {...rest}
      >
        {isSwitchingNetwork && <span>Switching to {networkName}...</span>}
        {!isSwitchingNetwork && <span>Switch to {networkName} Network</span>}
      </Button>
    )
  }

  return (
    <>
      <Button {...rest} onClick={write} disabled={disabled || write === undefined} />
      {/* TODO: style receipt */}
      {!!txHash && showReceipt && <a href={getBlockExplorerUrl(chainId, txHash, 'tx')}>Receipt</a>}
    </>
  )
}
