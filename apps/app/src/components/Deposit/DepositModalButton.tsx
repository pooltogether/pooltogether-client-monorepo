import { useSendDepositTransaction } from '@hooks/transactions/useSendDepositTransaction'
import { useAddRecentTransaction, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { BigNumber } from 'ethers'
import { useTokenAllowance } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { formatUnformattedBigNumberForDisplay, getNiceNetworkNameByChainId } from 'pt-utilities'
import { useEffect } from 'react'
import { useAccount, useNetwork, useProvider } from 'wagmi'

interface DepositModalButtonProps {
  vaultInfo: VaultInfo
  depositAmount: BigNumber
}

export const DepositModalButton = (props: DepositModalButtonProps) => {
  const { vaultInfo, depositAmount } = props

  const { address: userAddress, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()

  const addRecentTransaction = useAddRecentTransaction()

  const provider = useProvider({ chainId: vaultInfo.chainId })
  const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
    provider,
    userAddress,
    vaultInfo.address,
    vaultInfo.extensions.underlyingAsset.address
  )

  const { data: depositTxData, sendDepositTransaction } = useSendDepositTransaction(
    depositAmount,
    vaultInfo
  )

  const networkName = getNiceNetworkNameByChainId(vaultInfo.chainId)
  const tokenSymbol = vaultInfo.extensions.underlyingAsset.symbol

  useEffect(() => {
    if (!!depositTxData) {
      addRecentTransaction({
        hash: depositTxData.hash,
        description: `${networkName}: ${tokenSymbol} Deposit`
      })
    }
  }, [depositTxData])

  if (isDisconnected) {
    return (
      <Button fullSized={true} onClick={openConnectModal}>
        Connect
      </Button>
    )
  }

  if (chain.id !== vaultInfo.chainId) {
    return (
      <Button fullSized={true} onClick={openChainModal}>
        Switch to {networkName} Network
      </Button>
    )
  }

  if (!isFetchedAllowance || allowance.lt(depositAmount)) {
    const formattedDepositAmount = formatUnformattedBigNumberForDisplay(
      depositAmount,
      vaultInfo.decimals.toString()
    )

    return (
      // TODO: setup approve transaction
      // <Button fullSized={true} onClick={sendApproveTransaction}>
      <Button fullSized={true}>
        Approve {formattedDepositAmount} {tokenSymbol}
      </Button>
    )
  }

  return (
    <Button fullSized={true} onClick={sendDepositTransaction}>
      Deposit
    </Button>
  )
}
