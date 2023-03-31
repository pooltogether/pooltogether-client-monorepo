import { BigNumber, utils } from 'ethers'
import { useAtomValue } from 'jotai'
import { useAccount, useProvider } from 'wagmi'
import { Vault } from 'pt-client-js'
import { useIsDepositModalOpen } from 'pt-generic-hooks'
import {
  useSendWithdrawTransaction,
  useTokenBalance,
  useUserVaultBalance
} from 'pt-hyperstructure-hooks'
import { isValidFormInput } from '../Form/TxFormInput'
import { withdrawFormShareAmountAtom } from '../Form/WithdrawForm'
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
  const provider = useProvider({ chainId: vault.chainId })

  const { setIsDepositModalOpen } = useIsDepositModalOpen()

  const {
    data: vaultInfoWithBalance,
    isFetched: isFetchedVaultBalance,
    refetch: refetchUserVaultBalance
  } = useUserVaultBalance(vault, userAddress as `0x${string}`)

  const { refetch: refetchTokenBalance } = useTokenBalance(
    provider,
    userAddress as `0x${string}`,
    vault.tokenData?.address as string
  )

  const formShareAmount = useAtomValue(withdrawFormShareAmountAtom)
  const withdrawAmount =
    vault.decimals !== undefined
      ? utils.parseUnits(
          isValidFormInput(formShareAmount, vault.decimals) ? formShareAmount : '0',
          vault.decimals
        )
      : BigNumber.from(0)

  const isValidFormShareAmount =
    vault.decimals !== undefined ? isValidFormInput(formShareAmount, vault.decimals) : false

  const {
    isLoading: isWithdrawing,
    isSuccess: isSuccessfulWithdrawal,
    txHash: withdrawTxHash,
    sendWithdrawTransaction
  } = useSendWithdrawTransaction(withdrawAmount, vault, {
    onSuccess: () => {
      refetchTokenBalance()
      refetchUserVaultBalance()
      setIsDepositModalOpen(false)
    }
  })

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
      isTxLoading={isWithdrawing}
      isTxSuccess={isSuccessfulWithdrawal}
      write={sendWithdrawTransaction}
      txHash={withdrawTxHash}
      txDescription={`${vault.shareData?.symbol} Withdrawal`}
      fullSized={true}
      disabled={!withdrawEnabled}
      openConnectModal={openConnectModal}
      openChainModal={openChainModal}
      addRecentTransaction={addRecentTransaction}
    >
      {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
    </TransactionButton>
  )
}
