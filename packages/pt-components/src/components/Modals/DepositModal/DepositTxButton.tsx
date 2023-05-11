import { BigNumber, constants, utils } from 'ethers'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import {
  useSendApproveTransaction,
  useSendDepositTransaction,
  useTokenAllowance,
  useTokenBalance,
  useUserVaultTokenBalance
} from 'pt-hyperstructure-hooks'
import { Button, Spinner } from 'pt-ui'
import { DepositModalView } from '.'
import { depositFormTokenAmountAtom } from '../../Form/DepositForm'
import { isValidFormInput } from '../../Form/TxFormInput'
import { ExactApprovalTooltip } from '../../Tooltips/ExactApprovalTooltip'
import { InfiniteApprovalTooltip } from '../../Tooltips/InfiniteApprovalTooltip'
import { TransactionButton } from '../../Transaction/TransactionButton'

interface DepositTxButtonProps {
  vault: Vault
  modalView: string
  setModalView: (view: DepositModalView) => void
  setDepositTxHash: (txHash: string) => void
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
  refetchUserBalances?: () => void
}

// TODO: BUG - buttons should not be clickable (enabled) if there are any form errors
export const DepositTxButton = (props: DepositTxButtonProps) => {
  const {
    vault,
    modalView,
    setModalView,
    setDepositTxHash,
    openConnectModal,
    openChainModal,
    addRecentTransaction,
    refetchUserBalances
  } = props

  const { address: userAddress, isDisconnected } = useAccount()

  const {
    data: allowance,
    isFetched: isFetchedAllowance,
    refetch: refetchTokenAllowance
  } = useTokenAllowance(
    vault.chainId,
    userAddress as `0x${string}`,
    vault.address,
    vault.tokenData?.address as string
  )

  const {
    data: userBalance,
    isFetched: isFetchedUserBalance,
    refetch: refetchTokenBalance
  } = useTokenBalance(
    vault.chainId,
    userAddress as `0x${string}`,
    vault.tokenData?.address as string
  )

  const { refetch: refetchUserVaultTokenBalance } = useUserVaultTokenBalance(
    vault,
    userAddress as `0x${string}`
  )

  const formTokenAmount = useAtomValue(depositFormTokenAmountAtom)
  const depositAmount =
    vault.decimals !== undefined
      ? utils.parseUnits(
          isValidFormInput(formTokenAmount, vault.decimals) ? formTokenAmount : '0',
          vault.decimals
        )
      : BigNumber.from(0)

  const isValidFormTokenAmount =
    vault.decimals !== undefined ? isValidFormInput(formTokenAmount, vault.decimals) : false

  const {
    isWaiting: isWaitingExactApproval,
    isConfirming: isConfirmingExactApproval,
    isSuccess: isSuccessfulExactApproval,
    txHash: exactApprovalTxHash,
    sendApproveTransaction: sendExactApproveTransaction
  } = useSendApproveTransaction(depositAmount, vault, {
    onSuccess: () => refetchTokenAllowance(),
    onError: () => setModalView('error')
  })

  const {
    isWaiting: isWaitingInfiniteApproval,
    isConfirming: isConfirmingInfiniteApproval,
    isSuccess: isSuccessfulInfiniteApproval,
    txHash: infiniteApprovalTxHash,
    sendApproveTransaction: sendInfiniteApproveTransaction
  } = useSendApproveTransaction(constants.MaxUint256, vault, {
    onSuccess: () => refetchTokenAllowance(),
    onError: () => setModalView('error')
  })

  const {
    isWaiting: isWaitingDeposit,
    isConfirming: isConfirmingDeposit,
    isSuccess: isSuccessfulDeposit,
    txHash: depositTxHash,
    sendDepositTransaction
  } = useSendDepositTransaction(depositAmount, vault, {
    onSend: () => {
      setModalView('waiting')
    },
    onSuccess: () => {
      refetchTokenBalance()
      refetchUserVaultTokenBalance()
      refetchUserBalances?.()
      setModalView('success')
    },
    onError: () => {
      setModalView('error')
    }
  })

  useEffect(() => {
    if (!!depositTxHash && isConfirmingDeposit && !isWaitingDeposit && !isSuccessfulDeposit) {
      setDepositTxHash(depositTxHash)
      setModalView('confirming')
    }
  }, [depositTxHash, isConfirmingDeposit])

  const approvalEnabled =
    !isDisconnected &&
    !!userAddress &&
    !!vault.tokenData &&
    isFetchedUserBalance &&
    !!userBalance &&
    isFetchedAllowance &&
    !!allowance &&
    !depositAmount.isZero() &&
    BigNumber.from(userBalance.amount).gte(depositAmount) &&
    isValidFormTokenAmount &&
    vault.decimals !== undefined &&
    !!sendExactApproveTransaction &&
    !!sendInfiniteApproveTransaction

  const depositEnabled =
    !isDisconnected &&
    !!userAddress &&
    !!vault.tokenData &&
    isFetchedUserBalance &&
    !!userBalance &&
    isFetchedAllowance &&
    !!allowance &&
    !depositAmount.isZero() &&
    BigNumber.from(userBalance.amount).gte(depositAmount) &&
    allowance.gte(depositAmount) &&
    isValidFormTokenAmount &&
    vault.decimals !== undefined &&
    !!sendDepositTransaction

  if (depositAmount.isZero()) {
    return (
      <Button color='transparent' fullSized={true} disabled={true}>
        Enter an amount
      </Button>
    )
  } else if (isFetchedAllowance && allowance?.lt(depositAmount)) {
    return (
      <div className='flex flex-col w-full gap-6'>
        <TransactionButton
          chainId={vault.chainId}
          isTxLoading={isWaitingExactApproval || isConfirmingExactApproval}
          isTxSuccess={isSuccessfulExactApproval}
          write={sendExactApproveTransaction}
          txHash={exactApprovalTxHash}
          txDescription={`Exact ${vault.tokenData?.symbol} Approval`}
          fullSized={true}
          disabled={!approvalEnabled}
          openConnectModal={openConnectModal}
          openChainModal={openChainModal}
          addRecentTransaction={addRecentTransaction}
        >
          Approve exact amount of {vault.tokenData?.symbol ?? <Spinner />}
          <ExactApprovalTooltip tokenSymbol={vault.tokenData?.symbol ?? '?'} iconClassName='ml-3' />
        </TransactionButton>
        <TransactionButton
          chainId={vault.chainId}
          isTxLoading={isWaitingInfiniteApproval || isConfirmingInfiniteApproval}
          isTxSuccess={isSuccessfulInfiniteApproval}
          write={sendInfiniteApproveTransaction}
          txHash={infiniteApprovalTxHash}
          txDescription={`Infinite ${vault.tokenData?.symbol} Approval`}
          fullSized={true}
          disabled={!approvalEnabled}
          openConnectModal={openConnectModal}
          openChainModal={openChainModal}
          addRecentTransaction={addRecentTransaction}
          color='transparent'
        >
          Approve unlimited amount of {vault.tokenData?.symbol ?? <Spinner />}
          <InfiniteApprovalTooltip
            tokenSymbol={vault.tokenData?.symbol ?? '?'}
            iconClassName='ml-3'
          />
        </TransactionButton>
      </div>
    )
  } else if (modalView === 'main') {
    return (
      <Button onClick={() => setModalView('review')} fullSized={true} disabled={!depositEnabled}>
        Review Deposit
      </Button>
    )
  } else {
    return (
      <TransactionButton
        chainId={vault.chainId}
        isTxLoading={isWaitingDeposit || isConfirmingDeposit}
        isTxSuccess={isSuccessfulDeposit}
        write={sendDepositTransaction}
        txHash={depositTxHash}
        txDescription={`${vault.tokenData?.symbol} Deposit`}
        fullSized={true}
        disabled={!depositEnabled}
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
      >
        Confirm Deposit
      </TransactionButton>
    )
  }
}
