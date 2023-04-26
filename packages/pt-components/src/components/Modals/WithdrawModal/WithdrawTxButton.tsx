import { BigNumber, utils } from 'ethers'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import {
  useSendRedeemTransaction,
  useTokenBalance,
  useUserVaultShareBalance
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

  const {
    data: vaultShareBalance,
    isFetched: isFetchedVaultShareBalance,
    refetch: refetchVaultShareBalance
  } = useUserVaultShareBalance(vault, userAddress as `0x${string}`)

  const { refetch: refetchTokenBalance } = useTokenBalance(
    vault.chainId,
    userAddress as `0x${string}`,
    vault.tokenData?.address as string
  )

  const formShareAmount = useAtomValue(withdrawFormShareAmountAtom)

  const isValidFormShareAmount =
    vault.decimals !== undefined ? isValidFormInput(formShareAmount, vault.decimals) : false

  const withdrawAmount = isValidFormShareAmount
    ? utils.parseUnits(formShareAmount, vault.decimals)
    : BigNumber.from(0)

  const {
    isWaiting: isWaitingWithdrawal,
    isConfirming: isConfirmingWithdrawal,
    isSuccess: isSuccessfulWithdrawal,
    txHash: withdrawTxHash,
    sendRedeemTransaction
  } = useSendRedeemTransaction(withdrawAmount, vault, {
    onSend: () => {
      setModalView('waiting')
    },
    onSuccess: () => {
      refetchTokenBalance()
      refetchVaultShareBalance()
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
    isFetchedVaultShareBalance &&
    !!vaultShareBalance &&
    isValidFormShareAmount &&
    !withdrawAmount.isZero() &&
    BigNumber.from(vaultShareBalance.amount).gte(withdrawAmount) &&
    !!sendRedeemTransaction

  return (
    <TransactionButton
      chainId={vault.chainId}
      isTxLoading={isWaitingWithdrawal || isConfirmingWithdrawal}
      isTxSuccess={isSuccessfulWithdrawal}
      write={sendRedeemTransaction}
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
