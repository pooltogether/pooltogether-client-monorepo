import { BigNumber, utils } from 'ethers'
import { UseFormWatch } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { useSendWithdrawTransaction, useUserVaultBalance, useVault } from 'pt-hyperstructure-hooks'
import { VaultInfo } from 'pt-types'
import { isValidFormInput, TxFormValues } from '../Form/TxFormInput'
import { TransactionButton } from '../Transaction/TransactionButton'

interface WithdrawModalFooterProps {
  vaultInfo: VaultInfo
  watch: UseFormWatch<TxFormValues>
  isValidFormInputs: boolean
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModalFooter = (props: WithdrawModalFooterProps) => {
  const {
    vaultInfo,
    watch,
    isValidFormInputs,
    openConnectModal,
    openChainModal,
    addRecentTransaction
  } = props

  const { address: userAddress, isDisconnected } = useAccount()

  const vault = useVault(vaultInfo)

  const { data: vaultInfoWithBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
    vault,
    userAddress as `0x${string}`
  )

  const formShareAmount = watch('shareAmount', '0')
  const withdrawAmount = utils.parseUnits(
    isValidFormInput(formShareAmount, vaultInfo.decimals) ? formShareAmount : '0',
    vaultInfo.decimals
  )

  const { data: withdrawTxData, sendWithdrawTransaction } = useSendWithdrawTransaction(
    withdrawAmount,
    vaultInfo
  )

  const withdrawEnabled =
    !isDisconnected &&
    !!userAddress &&
    isFetchedVaultBalance &&
    !!vaultInfoWithBalance &&
    !withdrawAmount.isZero() &&
    BigNumber.from(vaultInfoWithBalance.balance).gte(withdrawAmount) &&
    isValidFormInputs

  return (
    <TransactionButton
      chainId={vaultInfo.chainId}
      write={sendWithdrawTransaction}
      txHash={withdrawTxData?.hash}
      txDescription={`${vaultInfo.extensions.underlyingAsset.symbol} Withdrawal`}
      fullSized={true}
      disabled={!withdrawEnabled}
      openConnectModal={openConnectModal}
      openChainModal={openChainModal}
      addRecentTransaction={addRecentTransaction}
    >
      Withdraw
    </TransactionButton>
  )
}
