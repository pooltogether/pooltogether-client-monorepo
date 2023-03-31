import { useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { Button, ButtonProps } from 'pt-ui'
import { getBlockExplorerUrl, getNiceNetworkNameByChainId } from 'pt-utilities'

export interface TransactionButtonProps extends Omit<ButtonProps, 'onClick'> {
  chainId: number
  isTxLoading: boolean
  isTxSuccess: boolean
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
    isTxLoading,
    isTxSuccess,
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
    if (isTxSuccess && !!txHash && !!txDescription && !!addRecentTransaction) {
      addRecentTransaction({
        hash: txHash,
        description: `${networkName}: ${txDescription}`
      })
    }
  }, [isTxSuccess, txHash, txDescription])

  if (isDisconnected) {
    return (
      <Button onClick={openConnectModal} {...rest}>
        Connect Wallet
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
      <Button onClick={write} disabled={!write || isTxLoading || disabled} {...rest} />
      {/* TODO: style receipt */}
      {isTxSuccess && showReceipt && !!txHash && (
        <a href={getBlockExplorerUrl(chainId, txHash, 'tx')}>Receipt</a>
      )}
    </>
  )
}
