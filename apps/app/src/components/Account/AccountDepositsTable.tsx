import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { VaultBadge } from 'pt-components'
import { useAllUserVaultBalances, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Table, TableProps } from 'pt-ui'
import { AccountVaultBalance } from './AccountVaultBalance'
import { AccountVaultButtons } from './AccountVaultButtons'

interface AccountDepositsTableProps extends Omit<TableProps, 'data' | 'keyPrefix'> {}

// TODO: sort by balance by default
// TODO: add sorting when clicking headers
export const AccountDepositsTable = (props: AccountDepositsTableProps) => {
  const { ...rest } = props

  const router = useRouter()

  const { address: userAddress } = useAccount()

  const { vaults } = useSelectedVaults()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useAllUserVaultBalances(
    vaults,
    userAddress
  )

  const odds = 'X' // TODO: calculate odds

  const tableData: TableProps['data'] = {
    headers: {
      token: { content: 'Token' },
      odds: { content: 'My Win Chance', position: 'center' },
      balance: { content: 'My Balance', position: 'center' },
      manage: { content: 'Manage', position: 'center' }
    },
    rows:
      isFetchedVaultBalances && !!vaultBalances
        ? Object.keys(vaultBalances)
            .map((vaultId) => {
              const vault = vaults.vaults[vaultId]
              const shareBalance = BigNumber.from(vaultBalances[vaultId]?.amount ?? 0)
              if (!!vaultBalances[vaultId] && shareBalance.gt(0) && vault.decimals !== undefined) {
                const cells: TableProps['data']['rows'][0]['cells'] = {
                  token: {
                    content: (
                      <VaultBadge vault={vault} onClick={() => router.push(`/vault/${vault.id}`)} />
                    )
                  },
                  odds: {
                    content: `1 in ${odds}`,
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
