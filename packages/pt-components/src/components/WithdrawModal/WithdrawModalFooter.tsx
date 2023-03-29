import { BigNumber, utils } from 'ethers'
import { useFormContext } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { useSendWithdrawTransaction, useUserVaultBalance } from 'pt-hyperstructure-hooks'
import { isValidFormInput, TxFormValues } from '../Form/TxFormInput'
import { TransactionButton } from '../Transaction/TransactionButton'

interface WithdrawModalFooterProps {
  vault: Vault
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModalFooter = (props: WithdrawModalFooterProps) => {
  const { vault, openConnectModal, openChainModal, addRecentTransaction } = props

  const { address: userAddress, isDisconnected } = useAccount()

  const { data: vaultInfoWithBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
    vault,
    userAddress as `0x${string}`
  )

  const {
    watch,
    formState: { isValid: isValidFormInputs }
  } = useFormContext<TxFormValues>()

  const formShareAmount = watch('shareAmount', '0')
  const withdrawAmount =
    vault.decimals !== undefined
      ? utils.parseUnits(
          isValidFormInput(formShareAmount, vault.decimals) ? formShareAmount : '0',
          vault.decimals
        )
      : BigNumber.from(0)

  const { data: withdrawTxData, sendWithdrawTransaction } = useSendWithdrawTransaction(
    withdrawAmount,
    vault
  )

  const withdrawEnabled =
    !isDisconnected &&
    !!userAddress &&
    !!vault.shareData &&
    isFetchedVaultBalance &&
    !!vaultInfoWithBalance &&
    !withdrawAmount.isZero() &&
    BigNumber.from(vaultInfoWithBalance.balance).gte(withdrawAmount) &&
    isValidFormInputs &&
    vault.decimals !== undefined

  return (
    <TransactionButton
      chainId={vault.chainId}
      write={sendWithdrawTransaction}
      txHash={withdrawTxData?.hash}
      txDescription={`${vault.shareData?.symbol} Withdrawal`}
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
