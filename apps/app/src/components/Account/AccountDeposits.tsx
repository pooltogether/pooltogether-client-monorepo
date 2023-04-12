import { useAccount } from 'wagmi'
import { useAllUserVaultBalances, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { AccountDepositsHeader } from './AccountDepositsHeader'
import { AccountDepositsOdds } from './AccountDepositsOdds'
import { AccountDepositsTable } from './AccountDepositsTable'

interface AccountDepositsProps {
  className?: string
}

export const AccountDeposits = (props: AccountDepositsProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  const { vaults } = useSelectedVaults()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useAllUserVaultBalances(
    vaults,
    userAddress
  )

  const noBalances =
    isFetchedVaultBalances && !!vaultBalances
      ? Object.keys(vaultBalances).every((vaultId) => vaultBalances[vaultId].amount === '0')
      : false

  if (typeof window !== 'undefined' && userAddress === undefined) {
    return <span>Connect your wallet to check your vault balances.</span>
  } else if (noBalances) {
    return <span>You haven't deposited into any vaults yet.</span>
  }

  if (isFetchedVaultBalances && !!vaultBalances) {
    return (
      <div className={className}>
        <AccountDepositsHeader />
        <AccountDepositsTable rounded={true} className='mt-8' />
        <AccountDepositsOdds className='mt-4' />
      </div>
    )
  }
}
