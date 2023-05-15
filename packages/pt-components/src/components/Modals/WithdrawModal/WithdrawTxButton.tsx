import { BigNumber, utils } from 'ethers'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { Vault } from 'pt-client-js'
import {
  useSendRedeemTransaction,
  useTokenBalance,
  useUserVaultShareBalance
} from 'pt-hyperstructure-hooks'
import { Button } from 'pt-ui'
import { WithdrawModalView } from '.'
import { isValidFormInput } from '../../Form/TxFormInput'
import { withdrawFormShareAmountAtom } from '../../Form/WithdrawForm'
import { TransactionButton } from '../../Transaction/TransactionButton'

interface WithdrawTxButtonProps {
  vault: Vault
  modalView: string
  setModalView: (view: WithdrawModalView) => void
  setWithdrawTxHash: (txHash: string) => void
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
  refetchUserBalances?: () => void
}

// TODO: BUG - buttons should not be clickable (enabled) if there are any form errors
export const WithdrawTxButton = (props: WithdrawTxButtonProps) => {
  const {
    vault,
    modalView,
    setModalView,
    setWithdrawTxHash,
    openConnectModal,
    openChainModal,
    addRecentTransaction,
    refetchUserBalances
  } = props

  const { address: userAddress, isDisconnected } = useAccount()
  const { chain } = useNetwork()

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
      refetchUserBalances?.()
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

  if (withdrawAmount.isZero()) {
    return (
      <Button color='transparent' fullSized={true} disabled={true}>
        Enter an amount
      </Button>
    )
  } else if (!isDisconnected && chain?.id === vault.chainId && modalView === 'main') {
    return (
      <Button onClick={() => setModalView('review')} fullSized={true} disabled={!withdrawEnabled}>
        Review Withdrawal
      </Button>
    )
  } else {
    return (
      <TransactionButton
        chainId={vault.chainId}
        isTxLoading={isWaitingWithdrawal || isConfirmingWithdrawal}
        isTxSuccess={isSuccessfulWithdrawal}
        write={sendRedeemTransaction}
        txHash={withdrawTxHash}
        txDescription={`${vault.tokenData?.symbol} Withdrawal`}
        fullSized={true}
        disabled={!withdrawEnabled}
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
      >
        Confirm Withdrawal
      </TransactionButton>
    )
  }
}
