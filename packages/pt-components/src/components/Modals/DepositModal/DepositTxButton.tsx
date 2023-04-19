import { BigNumber, utils } from 'ethers'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useAccount, useProvider } from 'wagmi'
import { Vault } from 'pt-client-js'
import {
  useSendApproveTransaction,
  useSendDepositTransaction,
  useTokenAllowance,
  useTokenBalance,
  useUserVaultBalance
} from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay } from 'pt-utilities'
import { DepositModalView } from '.'
import { depositFormTokenAmountAtom } from '../../Form/DepositForm'
import { isValidFormInput } from '../../Form/TxFormInput'
import { TransactionButton } from '../../Transaction/TransactionButton'

interface DepositTxButtonProps {
  vault: Vault
  setModalView: (view: DepositModalView) => void
  setDepositTxHash: (txHash: string) => void
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const DepositTxButton = (props: DepositTxButtonProps) => {
  const {
    vault,
    setModalView,
    setDepositTxHash,
    openConnectModal,
    openChainModal,
    addRecentTransaction
  } = props

  const { address: userAddress, isDisconnected } = useAccount()
  const provider = useProvider({ chainId: vault.chainId })

  const {
    data: allowance,
    isFetched: isFetchedAllowance,
    refetch: refetchTokenAllowance
  } = useTokenAllowance(
    provider,
    userAddress as `0x${string}`,
    vault.address,
    vault.tokenData?.address as string
  )

  const {
    data: userBalance,
    isFetched: isFetchedUserBalance,
    refetch: refetchTokenBalance
  } = useTokenBalance(provider, userAddress as `0x${string}`, vault.tokenData?.address as string)

  const { refetch: refetchUserVaultBalance } = useUserVaultBalance(
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
  const formattedDepositAmount =
    vault.decimals !== undefined ? formatBigNumberForDisplay(depositAmount, vault.decimals) : '0'

  const isValidFormTokenAmount =
    vault.decimals !== undefined ? isValidFormInput(formTokenAmount, vault.decimals) : false

  // TODO: implement infinite approval?
  const {
    isWaiting: isWaitingApproval,
    isConfirming: isConfirmingApproval,
    isSuccess: isSuccessfulApproval,
    txHash: approvalTxHash,
    sendApproveTransaction
  } = useSendApproveTransaction(depositAmount, vault, {
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
      refetchUserVaultBalance()
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
    !!sendApproveTransaction

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

  if (!isFetchedAllowance || (isFetchedAllowance && allowance?.lt(depositAmount))) {
    return (
      <TransactionButton
        chainId={vault.chainId}
        isTxLoading={isWaitingApproval || isConfirmingApproval}
        isTxSuccess={isSuccessfulApproval}
        write={sendApproveTransaction}
        txHash={approvalTxHash}
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
        Deposit
      </TransactionButton>
    )
  }
}
