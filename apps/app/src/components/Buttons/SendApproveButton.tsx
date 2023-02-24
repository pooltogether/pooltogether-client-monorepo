import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { BigNumber } from 'ethers'
import { useEffect } from 'react'
import { VaultInfo } from 'pt-types'
import { Button, ButtonProps } from 'pt-ui'
import { formatUnformattedBigNumberForDisplay, getNiceNetworkNameByChainId } from 'pt-utilities'
import { useSendApproveTransaction } from '@hooks/transactions/useSendApproveTransaction'

interface SendApproveButtonProps extends ButtonProps {
  amount: BigNumber
  vaultInfo: VaultInfo
}

// TODO: implement infinite approval as well?
export const SendApproveButton = (props: SendApproveButtonProps) => {
  const { amount, vaultInfo, ...rest } = props

  const { data: approveTxData, sendApproveTransaction } = useSendApproveTransaction(
    amount,
    vaultInfo
  )

  const addRecentTransaction = useAddRecentTransaction()

  const networkName = getNiceNetworkNameByChainId(vaultInfo.chainId)
  const tokenSymbol = vaultInfo.extensions.underlyingAsset.symbol
  const formattedAmount = formatUnformattedBigNumberForDisplay(
    amount,
    vaultInfo.decimals.toString()
  )

  useEffect(() => {
    if (!!approveTxData) {
      addRecentTransaction({
        hash: approveTxData.hash,
        description: `${networkName}: ${tokenSymbol} Approval`
      })
    }
  }, [approveTxData])

  return (
    <Button onClick={sendApproveTransaction} disabled={amount.isZero()} {...rest}>
      Approve {formattedAmount} {tokenSymbol}
    </Button>
  )
}
