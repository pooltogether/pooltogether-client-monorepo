import { useRouter } from 'next/router'
import { Vault } from 'pt-client-js'
import { VaultBadge } from 'pt-components'
import { Table, TableProps } from 'pt-ui'
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

  const tableData: TableProps['data'] = {
    headers: {
      token: { content: 'Token' },
      vaultChance: { content: 'Vault Chance', position: 'center' }, // TODO: add icon with tooltip
      totalDeposits: { content: 'Total Deposits', position: 'center' },
      manage: { content: 'Manage', position: 'right' }
    },
    rows: vaults.map((vault) => ({
      cells: {
        token: {
          content: <VaultBadge vault={vault} onClick={() => router.push(`/vault/${vault.id}`)} />
        },
        vaultChance: { content: <VaultPrizePower vault={vault} />, position: 'center' },
        totalDeposits: {
          content: <VaultTotalDeposits vault={vault} />,
          position: 'center'
        },
        manage: { content: <VaultButtons vault={vault} />, position: 'right' }
      }
    }))
  }

  return <Table data={tableData} keyPrefix='vaultsTable' rounded={true} className={className} />
}
