import { BigNumber, utils } from 'ethers'
import { UseFormWatch } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import {
  useSendWithdrawTransaction,
  useSingleVaultShareData,
  useUserVaultBalance
} from 'pt-hyperstructure-hooks'
import { isValidFormInput, TxFormValues } from '../Form/TxFormInput'
import { TransactionButton } from '../Transaction/TransactionButton'

interface WithdrawModalFooterProps {
  vault: Vault
  watch: UseFormWatch<TxFormValues>
  isValidFormInputs: boolean
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModalFooter = (props: WithdrawModalFooterProps) => {
  const {
    vault,
    watch,
    isValidFormInputs,
    openConnectModal,
    openChainModal,
    addRecentTransaction
  } = props

  const { address: userAddress, isDisconnected } = useAccount()

  const { data: shareData } = useSingleVaultShareData(vault)

  const { data: vaultInfoWithBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
    vault,
    userAddress as `0x${string}`
  )

  const formShareAmount = watch('shareAmount', '0')
  const withdrawAmount = !!shareData
    ? utils.parseUnits(
        isValidFormInput(formShareAmount, shareData.decimals) ? formShareAmount : '0',
        shareData.decimals
      )
    : BigNumber.from(0)

  const { data: withdrawTxData, sendWithdrawTransaction } = useSendWithdrawTransaction(
    withdrawAmount,
    vault
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
      chainId={vault.chainId}
      write={sendWithdrawTransaction}
      txHash={withdrawTxData?.hash}
      txDescription={`${shareData?.symbol} Withdrawal`}
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
