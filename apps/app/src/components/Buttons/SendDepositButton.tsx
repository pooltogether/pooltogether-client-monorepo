import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { BigNumber } from 'ethers'
import { useEffect } from 'react'
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

  return (
    <Button onClick={sendDepositTransaction} {...rest}>
      Deposit
    </Button>
  )
}
