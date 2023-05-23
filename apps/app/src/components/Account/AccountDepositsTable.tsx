import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { VaultBadge } from 'pt-components'
import { useAllUserVaultBalances, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Spinner, Table, TableProps } from 'pt-ui'
import { useSortedVaults } from '@hooks/useSortedVaults'
import { AccountVaultBalance } from './AccountVaultBalance'
import { AccountVaultButtons } from './AccountVaultButtons'
import { AccountVaultOdds } from './AccountVaultOdds'

interface AccountDepositsTableProps extends Omit<TableProps, 'data' | 'keyPrefix'> {}

export const AccountDepositsTable = (props: AccountDepositsTableProps) => {
  const { ...rest } = props

  const router = useRouter()

  const { address: userAddress } = useAccount()

  const { vaults } = useSelectedVaults()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useAllUserVaultBalances(
    vaults,
    userAddress
  )

  const { sortedVaults, isFetched } = useSortedVaults(Object.values(vaults.vaults), {
    defaultSortId: 'userBalance'
  })

  if (!isFetched) {
    return <Spinner />
  }

  const tableData: TableProps['data'] = {
    headers: {
      token: { content: 'Token' },
      odds: { content: 'My Win Chance', position: 'center' },
      balance: { content: 'My Balance', position: 'center' },
      manage: { content: 'Manage', position: 'center' }
    },
    rows:
      isFetchedVaultBalances && !!vaultBalances
        ? sortedVaults
            .map((vault) => {
              const shareBalance = vaultBalances[vault.id]?.amount ?? 0n
              if (!!vaultBalances[vault.id] && shareBalance > 0n && vault.decimals !== undefined) {
                const cells: TableProps['data']['rows'][0]['cells'] = {
                  token: {
                    content: (
                      <VaultBadge vault={vault} onClick={() => router.push(`/vault/${vault.id}`)} />
                    )
                  },
                  odds: {
                    content: <AccountVaultOdds vault={vault} />,
                    position: 'center'
                  },
                  balance: {
                    content: <AccountVaultBalance vault={vault} />,
                    position: 'center'
                  },
                  manage: { content: <AccountVaultButtons vault={vault} />, position: 'center' }
                }
                return { cells }
              }
            })
            .filter((row) => !!row)
        : []
  }

  return <Table data={tableData} keyPrefix='accountVaultsTable' {...rest} />
}
