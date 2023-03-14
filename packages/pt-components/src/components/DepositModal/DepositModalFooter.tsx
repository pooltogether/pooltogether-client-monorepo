import { BigNumber, utils } from 'ethers'
import { UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import {
  useSendApproveTransaction,
  useSendDepositTransaction,
  useTokenAllowance,
  useTokenBalance
} from 'pt-hyperstructure-hooks'
import { VaultInfo } from 'pt-types'
import { formatBigNumberForDisplay } from 'pt-utilities'
import { isValidFormInput, TxFormValues } from '../Form/TxFormInput'
import { TransactionButton } from '../Transaction/TransactionButton'

interface DepositModalFooterProps {
  vaultInfo: VaultInfo
  watch: UseFormWatch<TxFormValues>
  isValidFormInputs: boolean
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const DepositModalFooter = (props: DepositModalFooterProps) => {
  const {
    vaultInfo,
    watch,
    isValidFormInputs,
    openConnectModal,
    openChainModal,
    addRecentTransaction
  } = props

  const { address: userAddress, isDisconnected } = useAccount()
  const provider = useProvider({ chainId: vaultInfo.chainId })

  // const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
  //   provider,
  //   userAddress as `0x${string}`,
  //   vaultInfo.address,
  //   vaultInfo.extensions.underlyingAsset.address
  // )
  // TODO: remove and uncomment above once vaults are setup:
  const allowance = BigNumber.from(0)
  const isFetchedAllowance: boolean = true

  const { data: userBalance, isFetched: isFetchedUserBalance } = useTokenBalance(
    provider,
    userAddress as `0x${string}`,
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
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
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
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
      >
        Deposit
      </TransactionButton>
    )
  }
}
