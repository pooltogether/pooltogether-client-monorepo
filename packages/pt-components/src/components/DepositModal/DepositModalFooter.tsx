import { BigNumber, utils } from 'ethers'
import { UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { Vault } from 'pt-client-js'
import {
  useSendApproveTransaction,
  useSendDepositTransaction,
  useSingleVaultTokenData,
  useTokenAllowance,
  useTokenBalance
} from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay } from 'pt-utilities'
import { isValidFormInput, TxFormValues } from '../Form/TxFormInput'
import { TransactionButton } from '../Transaction/TransactionButton'

interface DepositModalFooterProps {
  vault: Vault
  watch: UseFormWatch<TxFormValues>
  isValidFormInputs: boolean
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const DepositModalFooter = (props: DepositModalFooterProps) => {
  const {
    vault,
    watch,
    isValidFormInputs,
    openConnectModal,
    openChainModal,
    addRecentTransaction
  } = props

  const { address: userAddress, isDisconnected } = useAccount()
  const provider = useProvider({ chainId: vault.chainId })

  const { data: tokenData } = useSingleVaultTokenData(vault)

  const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
    provider,
    userAddress as `0x${string}`,
    vault.address,
    tokenData?.address as string
  )

  const { data: userBalance, isFetched: isFetchedUserBalance } = useTokenBalance(
    provider,
    userAddress as `0x${string}`,
    tokenData?.address as string
  )

  const formTokenAmount = watch('tokenAmount', '0')
  const depositAmount = !!tokenData
    ? utils.parseUnits(
        isValidFormInput(formTokenAmount, tokenData.decimals) ? formTokenAmount : '0',
        tokenData.decimals
      )
    : BigNumber.from(0)
  const formattedDepositAmount = !!tokenData
    ? formatBigNumberForDisplay(depositAmount, tokenData.decimals)
    : '0'

  // TODO: implement infinite approval?
  const { data: approveTxData, sendApproveTransaction } = useSendApproveTransaction(
    depositAmount,
    vault
  )

  const { data: depositTxData, sendDepositTransaction } = useSendDepositTransaction(
    depositAmount,
    vault
  )

  const approvalEnabled =
    !isDisconnected &&
    !!userAddress &&
    !!tokenData &&
    isFetchedUserBalance &&
    !!userBalance &&
    isFetchedAllowance &&
    !!allowance &&
    !depositAmount.isZero() &&
    isValidFormInputs

  const depositEnabled =
    !isDisconnected &&
    !!userAddress &&
    !!tokenData &&
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
        chainId={vault.chainId}
        write={sendApproveTransaction}
        txHash={approveTxData?.hash}
        txDescription={`${tokenData?.symbol} Approval`}
        fullSized={true}
        disabled={!approvalEnabled}
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
      >
        Approve {formattedDepositAmount} {tokenData?.symbol ?? <Spinner />}
      </TransactionButton>
    )
  } else {
    return (
      <TransactionButton
        chainId={vault.chainId}
        write={sendDepositTransaction}
        txHash={depositTxData?.hash}
        txDescription={`${tokenData?.symbol} Deposit`}
        fullSized={true}
        disabled={!depositEnabled}
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
      >
        Deposit
      </TransactionButton>
    )
  }
}
