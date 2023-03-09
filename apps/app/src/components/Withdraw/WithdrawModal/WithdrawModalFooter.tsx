import { BigNumber, utils } from 'ethers'
import { UseFormWatch } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { useUserVaultBalance } from 'pt-hyperstructure-hooks'
import { VaultInfo, VaultInfoWithBalance } from 'pt-types'
import { isValidFormInput, TxFormValues } from '@components/Form/TxFormInput'
import { TransactionButton } from '@components/TransactionButton'
import { useSendWithdrawTransaction } from '@hooks/transactions/useSendWithdrawTransaction'
import { useVault } from '@hooks/useVaults'

interface WithdrawModalFooterProps {
  vaultInfo: VaultInfo
  watch: UseFormWatch<TxFormValues>
  isValidFormInputs: boolean
}

export const WithdrawModalFooter = (props: WithdrawModalFooterProps) => {
  const { vaultInfo, watch, isValidFormInputs } = props

  const { address: userAddress, isDisconnected } = useAccount()

  const vault = useVault(vaultInfo)

  // const { data: vaultInfoWithBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
  //   vault,
  //   userAddress
  // )
  // TODO: remove the following once vaults are setup (and uncomment above)
  const isFetchedVaultBalance: boolean = true
  const vaultInfoWithBalance: VaultInfoWithBalance = { ...vaultInfo, balance: '0' }

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
    >
      Withdraw
    </TransactionButton>
  )
}
