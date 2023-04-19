import { BigNumber, utils } from 'ethers'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useAccount, useProvider } from 'wagmi'
import { Vault } from 'pt-client-js'
import {
  useSendWithdrawTransaction,
  useTokenBalance,
  useUserVaultBalance
} from 'pt-hyperstructure-hooks'
import { WithdrawModalView } from '.'
import { isValidFormInput } from '../../Form/TxFormInput'
import { withdrawFormShareAmountAtom } from '../../Form/WithdrawForm'
import { TransactionButton } from '../../Transaction/TransactionButton'

interface WithdrawTxButtonProps {
  vault: Vault
  setModalView: (view: WithdrawModalView) => void
  setWithdrawTxHash: (txHash: string) => void
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawTxButton = (props: WithdrawTxButtonProps) => {
  const {
    vault,
    setModalView,
    setWithdrawTxHash,
    openConnectModal,
    openChainModal,
    addRecentTransaction
  } = props

  const { address: userAddress, isDisconnected } = useAccount()
  const provider = useProvider({ chainId: vault.chainId })

  const {
    data: vaultInfoWithAmount,
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
    isWaiting: isWaitingWithdrawal,
    isConfirming: isConfirmingWithdrawal,
    isSuccess: isSuccessfulWithdrawal,
    txHash: withdrawTxHash,
    sendWithdrawTransaction
  } = useSendWithdrawTransaction(withdrawAmount, vault, {
    onSend: () => {
      setModalView('waiting')
    },
    onSuccess: () => {
      refetchTokenBalance()
      refetchUserVaultBalance()
      setModalView('success')
    },
    onError: () => {
      setModalView('error')
    }
  })

  useEffect(() => {
    if (
      !!withdrawTxHash &&
      isConfirmingWithdrawal &&
      !isWaitingWithdrawal &&
      !isSuccessfulWithdrawal
    ) {
      setWithdrawTxHash(withdrawTxHash)
      setModalView('confirming')
    }
  }, [withdrawTxHash, isConfirmingWithdrawal])

  const withdrawEnabled =
    !isDisconnected &&
    !!userAddress &&
    !!vault.shareData &&
    isFetchedVaultBalance &&
    !!vaultInfoWithAmount &&
    !withdrawAmount.isZero() &&
    BigNumber.from(vaultInfoWithAmount.amount).gte(withdrawAmount) &&
    isValidFormShareAmount &&
    vault.decimals !== undefined &&
    !!sendWithdrawTransaction

  return (
    <TransactionButton
      chainId={vault.chainId}
      isTxLoading={isWaitingWithdrawal || isConfirmingWithdrawal}
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
      Withdraw
    </TransactionButton>
  )
}
