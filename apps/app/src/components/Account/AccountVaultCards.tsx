import classNames from 'classnames'
import { useAccount } from 'wagmi'
import { useAllUserVaultBalances, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { useSortedVaults } from '@hooks/useSortedVaults'
import { AccountVaultCard } from './AccountVaultCard'

interface AccountVaultsCardsProps {
  className?: string
}

export const AccountVaultCards = (props: AccountVaultsCardsProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  const { vaults } = useSelectedVaults()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useAllUserVaultBalances(
    vaults,
    userAddress
  )

  const { sortedVaults, isFetched } = useSortedVaults(Object.values(vaults.vaults), {
    defaultSortId: 'userBalance'
  })

  if (isFetched && isFetchedVaultBalances) {
    return (
      <div className={classNames('w-full flex flex-col gap-4', className)}>
        {!!vaultBalances &&
          sortedVaults.map((vault) => {
            const shareBalance = vaultBalances[vault.id]?.amount ?? 0n
            if (shareBalance > 0n && vault.decimals !== undefined) {
              return <AccountVaultCard key={vault.id} vault={vault} />
            }
          })}
      </div>
    )
  }
}
