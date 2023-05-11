import { useRouter } from 'next/router'
import { Vault } from 'pt-client-js'
import { PrizePowerTooltip, VaultBadge } from 'pt-components'
import { Table, TableProps } from 'pt-ui'
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

  const tableData: TableProps['data'] = {
    headers: {
      token: { content: 'Token' },
      prizePower: { content: <PrizePowerHeader />, position: 'center' },
      totalDeposits: { content: 'Total Deposits', position: 'center' },
      balance: { content: 'My Balance', position: 'center' },
      manage: { content: <ManageHeader />, position: 'right' }
    },
    rows: vaults.map((vault) => ({
      cells: {
        token: {
          content: (
            <VaultBadge
              vault={vault}
              onClick={() => router.push(`/vault/${vault.id}`)}
              className='isolate'
            />
          )
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
          content: <AccountVaultBalance vault={vault} />,
          position: 'center'
        },
        manage: { content: <VaultButtons vault={vault} />, position: 'right' }
      }
    }))
  }

  return <Table data={tableData} keyPrefix='vaultsTable' rounded={true} className={className} />
}

const PrizePowerHeader = () => {
  return (
    <span className='flex gap-1 items-center'>
      Prize Power <PrizePowerTooltip iconSize='lg' />
    </span>
  )
}

const ManageHeader = () => {
  return <span className='mr-[18px]'>Manage</span>
}
