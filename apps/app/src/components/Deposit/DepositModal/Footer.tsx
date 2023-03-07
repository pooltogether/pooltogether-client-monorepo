import { BigNumber, utils } from 'ethers'
import { UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { useTokenAllowance, useTokenBalance } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { formatBigNumberForDisplay } from 'pt-utilities'
import { TransactionButton } from '@components/TransactionButton'
import { useSendApproveTransaction } from '@hooks/transactions/useSendApproveTransaction'
import { useSendDepositTransaction } from '@hooks/transactions/useSendDepositTransaction'
import { DepositFormValues } from './DepositForm'
import { isValidFormInput } from './DepositFormInput'

interface DepositModalFooterProps {
  vaultInfo: VaultInfo
  watch: UseFormWatch<DepositFormValues>
  isValidFormInputs: boolean
}

export const DepositModalFooter = (props: DepositModalFooterProps) => {
  const { vaultInfo, watch, isValidFormInputs } = props

  const { address: userAddress, isDisconnected } = useAccount()
  const provider = useProvider({ chainId: vaultInfo.chainId })

  // const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
  //   provider,
  //   userAddress,
  //   vaultInfo.address,
  //   vaultInfo.extensions.underlyingAsset.address
  // )
  // TODO: remove and uncomment above once vaults are setup:
  const allowance = BigNumber.from(0)
  const isFetchedAllowance: boolean = true

  const { data: userBalance, isFetched: isFetchedUserBalance } = useTokenBalance(
    provider,
    userAddress,
    vaultInfo.extensions.underlyingAsset.address
  )

  const formTokenAmount = watch('tokenAmount', '0')
  const depositAmount = utils.parseUnits(
    isValidFormInput(formTokenAmount, vaultInfo.decimals) ? formTokenAmount : '0',
    vaultInfo.decimals
  )
  const formattedDepositAmount = formatBigNumberForDisplay(
    depositAmount,
    vaultInfo.decimals.toString()
  )

  // TODO: implement infinite approval?
  const { data: approveTxData, sendApproveTransaction } = useSendApproveTransaction(
    depositAmount,
    vaultInfo
  )

  const { data: depositTxData, sendDepositTransaction } = useSendDepositTransaction(
    depositAmount,
    vaultInfo
  )

  const approvalEnabled =
    !isDisconnected &&
    !!userAddress &&
    isFetchedUserBalance &&
    !!userBalance &&
    isFetchedAllowance &&
    !!allowance &&
    !depositAmount.isZero() &&
    isValidFormInputs

  const depositEnabled =
    !isDisconnected &&
    !!userAddress &&
    isFetchedUserBalance &&
    !!userBalance &&
    isFetchedAllowance &&
    !!allowance &&
    !depositAmount.isZero() &&
    BigNumber.from(userBalance.balance).gte(depositAmount) &&
    allowance.gte(depositAmount) &&
    isValidFormInputs

  if (!isFetchedAllowance || (isFetchedAllowance && allowance?.lt(depositAmount))) {
    return (
      <TransactionButton
        chainId={vaultInfo.chainId}
        write={sendApproveTransaction}
        txHash={approveTxData?.hash}
        txDescription={`${vaultInfo.extensions.underlyingAsset.symbol} Approval`}
        fullSized={true}
        disabled={!approvalEnabled}
      >
        Approve {formattedDepositAmount} {vaultInfo.extensions.underlyingAsset.symbol}
      </TransactionButton>
    )
  } else {
    return (
      <TransactionButton
        chainId={vaultInfo.chainId}
        write={sendDepositTransaction}
        txHash={depositTxData?.hash}
        txDescription={`${vaultInfo.extensions.underlyingAsset.symbol} Deposit`}
        fullSized={true}
        disabled={!depositEnabled}
      >
        Deposit
      </TransactionButton>
    )
  }
}
