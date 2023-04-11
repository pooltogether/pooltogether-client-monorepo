import { BigNumber } from 'ethers'
import { useAccount } from 'wagmi'
import { NetworkBadge, VaultBadge } from 'pt-components'
import { useAllUserVaultBalances, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Table, TableProps } from 'pt-ui'
import { AccountVaultBalance } from './AccountVaultBalance'
import { AccountVaultButtons } from './AccountVaultButtons'

interface AccountVaultsTableProps {
  className?: string
}

// TODO: sort by balance by default
// TODO: add sorting when clicking headers
export const AccountVaultsTable = (props: AccountVaultsTableProps) => {
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

  const tableData: TableProps['data'] = {
    headers: {
      token: { content: 'Token' },
      prizePool: { content: 'Prize Pool', position: 'center' },
      deposited: { content: 'Deposited', position: 'center' },
      manage: { content: 'Manage', position: 'right' }
    },
    rows:
      isFetchedVaultBalances && !!vaultBalances
        ? Object.keys(vaultBalances)
            .map((vaultId) => {
              const vault = vaults.vaults[vaultId]
              const shareBalance = BigNumber.from(vaultBalances[vaultId]?.amount ?? 0)
              if (!!vaultBalances[vaultId] && shareBalance.gt(0) && vault.decimals !== undefined) {
                const cells: TableProps['data']['rows'][0]['cells'] = {
                  // TODO: add onclick to vaultbadge (go to detailed vault page)
                  token: { content: <VaultBadge vault={vault} /> },
                  prizePool: {
                    content: <NetworkBadge chainId={vault.chainId} appendText='Prize Pool' />
                  },
                  deposited: {
                    content: <AccountVaultBalance vault={vault} shareBalance={shareBalance} />,
                    position: 'center'
                  },
                  manage: { content: <AccountVaultButtons vault={vault} />, position: 'right' }
                }
                return { cells }
              }
            })
            .filter((row) => !!row)
        : []
  }

  if (typeof window !== 'undefined' && userAddress === undefined) {
    return <span>Connect your wallet to check your vault balances.</span>
  } else if (noBalances) {
    return <span>You haven't deposited into any vaults yet.</span>
  }

  if (isFetchedVaultBalances && !!vaultBalances) {
    return (
      <Table data={tableData} keyPrefix='accountVaultsTable' rounded={true} className={className} />
    )
  }
}
