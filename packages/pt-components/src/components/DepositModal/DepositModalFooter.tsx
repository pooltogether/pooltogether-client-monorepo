import { BigNumber, utils } from 'ethers'
import { UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { Vault } from 'pt-client-js'
import {
  useSendApproveTransaction,
  useSendDepositTransaction,
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

  const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
    provider,
    userAddress as `0x${string}`,
    vault.address,
    vault.tokenData?.address as string
  )

  const { data: userBalance, isFetched: isFetchedUserBalance } = useTokenBalance(
    provider,
    userAddress as `0x${string}`,
    vault.tokenData?.address as string
  )

  const formTokenAmount = watch('tokenAmount', '0')
  const depositAmount =
    vault.decimals !== undefined
      ? utils.parseUnits(
          isValidFormInput(formTokenAmount, vault.decimals) ? formTokenAmount : '0',
          vault.decimals
        )
      : BigNumber.from(0)
  const formattedDepositAmount =
    vault.decimals !== undefined ? formatBigNumberForDisplay(depositAmount, vault.decimals) : '0'

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
    !!vault.tokenData &&
    isFetchedUserBalance &&
    !!userBalance &&
    isFetchedAllowance &&
    !!allowance &&
    !depositAmount.isZero() &&
    isValidFormInputs &&
    vault.decimals !== undefined

  const depositEnabled =
    !isDisconnected &&
    !!userAddress &&
    !!vault.tokenData &&
    isFetchedUserBalance &&
    !!userBalance &&
    isFetchedAllowance &&
    !!allowance &&
    !depositAmount.isZero() &&
    BigNumber.from(userBalance.balance).gte(depositAmount) &&
    allowance.gte(depositAmount) &&
    isValidFormInputs &&
    vault.decimals !== undefined

  if (!isFetchedAllowance || (isFetchedAllowance && allowance?.lt(depositAmount))) {
    return (
      <TransactionButton
        chainId={vault.chainId}
        write={sendApproveTransaction}
        txHash={approveTxData?.hash}
        txDescription={`${vault.tokenData?.symbol} Approval`}
        fullSized={true}
        disabled={!approvalEnabled}
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
      >
        Approve {formattedDepositAmount} {vault.tokenData?.symbol ?? <Spinner />}
      </TransactionButton>
    )
  } else {
    return (
      <TransactionButton
        chainId={vault.chainId}
        write={sendDepositTransaction}
        txHash={depositTxData?.hash}
        txDescription={`${vault.tokenData?.symbol} Deposit`}
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
