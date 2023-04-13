import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { VaultBadge } from 'pt-components'
import { useAllUserVaultBalances, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Spinner, Table, TableProps } from 'pt-ui'
import { AccountVaultBalance } from '@components/Account/AccountVaultBalance'
import { VaultButtons } from './VaultButtons'
import { VaultPrizePower } from './VaultPrizePower'
import { VaultTotalDeposits } from './VaultTotalDeposits'

interface VaultsTableProps {
  vaults: Vault[]
  className?: string
}

export const VaultsTable = (props: VaultsTableProps) => {
  const { vaults, className } = props

  const router = useRouter()

  const { address: userAddress } = useAccount()

  const { vaults: selectedVaults } = useSelectedVaults()

  const { data: vaultBalances } = useAllUserVaultBalances(selectedVaults, userAddress)

  const tableData: TableProps['data'] = {
    headers: {
      token: { content: 'Token' },
      prizePower: { content: 'Prize Power', position: 'center' }, // TODO: add tooltip
      totalDeposits: { content: 'Total Deposits', position: 'center' },
      balance: { content: 'My Balance', position: 'center' },
      manage: { content: 'Manage', position: 'right' }
    },
    rows: vaults.map((vault) => {
      const shareBalance = BigNumber.from(vaultBalances?.[vault.id]?.amount ?? 0)
      const cells: TableProps['data']['rows'][0]['cells'] = {
        token: {
          content: <VaultBadge vault={vault} onClick={() => router.push(`/vault/${vault.id}`)} />
        },
        prizePower: {
          content: (
            <span className='text-xl font-semibold text-pt-purple-400'>
              <VaultPrizePower vault={vault} />
            </span>
          ),
          position: 'center'
        },
        totalDeposits: {
          content: <VaultTotalDeposits vault={vault} />,
          position: 'center'
        },
        balance: {
          content:
            !!vaultBalances || !userAddress ? (
              <>
                {shareBalance.gt(0) && (
                  <AccountVaultBalance vault={vault} shareBalance={shareBalance} />
                )}
                {shareBalance.isZero() && '-'}
              </>
            ) : (
              <Spinner />
            ),
          position: 'center'
        },
        manage: { content: <VaultButtons vault={vault} />, position: 'right' }
      }
      return { cells }
    })
  }

  return <Table data={tableData} keyPrefix='vaultsTable' rounded={true} className={className} />
}
