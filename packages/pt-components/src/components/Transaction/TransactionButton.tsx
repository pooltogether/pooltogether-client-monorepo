import { useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { Button, ButtonProps, Spinner } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'

export interface TransactionButtonProps extends Omit<ButtonProps, 'onClick'> {
  chainId: number
  isTxLoading: boolean
  isTxSuccess: boolean
  write?: () => void
  txHash?: string
  txDescription?: string
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
    openConnectModal,
    openChainModal,
    addRecentTransaction,
    disabled,
    children,
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
    <Button onClick={write} disabled={!write || isTxLoading || disabled} {...rest}>
      {isTxLoading && <Spinner />}
      {!isTxLoading && children}
    </Button>
  )
}
