import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { BigNumber } from 'ethers'
import { useEffect } from 'react'
import { VaultInfo } from 'pt-types'
import { Button, ButtonProps } from 'pt-ui'
import { formatUnformattedBigNumberForDisplay, getNiceNetworkNameByChainId } from 'pt-utilities'
import { useSendApproveTransaction } from '@hooks/transactions/useSendApproveTransaction'

interface SendApproveButtonProps extends ButtonProps {
  depositAmount: BigNumber
  vaultInfo: VaultInfo
}

// TODO: implement infinite approval as well?
export const SendApproveButton = (props: SendApproveButtonProps) => {
  const { depositAmount, vaultInfo, ...rest } = props

  const { data: approveTxData, sendApproveTransaction } = useSendApproveTransaction(
    depositAmount,
    vaultInfo
  )

  const addRecentTransaction = useAddRecentTransaction()

  const networkName = getNiceNetworkNameByChainId(vaultInfo.chainId)
  const tokenSymbol = vaultInfo.extensions.underlyingAsset.symbol
  const formattedDepositAmount = formatUnformattedBigNumberForDisplay(
    depositAmount,
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
    <Button onClick={sendApproveTransaction} {...rest}>
      Approve {formattedDepositAmount} {tokenSymbol}
    </Button>
  )
}
