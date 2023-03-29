import { BigNumber, utils } from 'ethers'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { useSendWithdrawTransaction, useUserVaultBalance } from 'pt-hyperstructure-hooks'
import { isValidFormInput } from '../Form/TxFormInput'
import { TransactionButton } from '../Transaction/TransactionButton'

interface WithdrawModalFooterProps {
  vault: Vault
  formShareAmount: string
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModalFooter = (props: WithdrawModalFooterProps) => {
  const { vault, formShareAmount, openConnectModal, openChainModal, addRecentTransaction } = props

  const { address: userAddress, isDisconnected } = useAccount()

  const { data: vaultInfoWithBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
    vault,
    userAddress as `0x${string}`
  )

  const withdrawAmount =
    vault.decimals !== undefined
      ? utils.parseUnits(
          isValidFormInput(formShareAmount, vault.decimals) ? formShareAmount : '0',
          vault.decimals
        )
      : BigNumber.from(0)

  const isValidFormShareAmount =
    vault.decimals !== undefined ? isValidFormInput(formShareAmount, vault.decimals) : false

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
    isValidFormShareAmount &&
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
