import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { BigNumber } from 'ethers'
import { useEffect } from 'react'
import { useAccount, useProvider } from 'wagmi'
import { useTokenAllowance, useTokenBalance } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { Button, ButtonProps } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { useSendDepositTransaction } from '@hooks/transactions/useSendDepositTransaction'

interface SendDepositButtonProps extends ButtonProps {
  depositAmount: BigNumber
  vaultInfo: VaultInfo
}

export const SendDepositButton = (props: SendDepositButtonProps) => {
  const { depositAmount, vaultInfo, ...rest } = props

  const provider = useProvider({ chainId: vaultInfo.chainId })
  const { address: userAddress, isConnected } = useAccount()

  const { data: userBalance, isFetched: isFetchedUserBalance } = useTokenBalance(
    provider,
    userAddress,
    vaultInfo.extensions.underlyingAsset.address
  )

  // const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
  //   provider,
  //   userAddress,
  //   vaultInfo.address,
  //   vaultInfo.extensions.underlyingAsset.address
  // )
  // TODO: remove and uncomment above once vaults are setup:
  const allowance = BigNumber.from(0)
  const isFetchedAllowance: boolean = true

  const { data: depositTxData, sendDepositTransaction } = useSendDepositTransaction(
    depositAmount,
    vaultInfo
  )

  const addRecentTransaction = useAddRecentTransaction()

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

  const enabled =
    isConnected &&
    !!userAddress &&
    isFetchedUserBalance &&
    !!userBalance &&
    isFetchedAllowance &&
    !!allowance &&
    !depositAmount.isZero() &&
    BigNumber.from(userBalance.balance).gte(depositAmount) &&
    allowance.gte(depositAmount)

  return (
    <Button onClick={sendDepositTransaction} disabled={!enabled} {...rest}>
      Deposit
    </Button>
  )
}
