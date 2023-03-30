import classNames from 'classnames'
import { ReactNode } from 'react'
import { Vault } from 'pt-client-js'
import { VaultBadge } from 'pt-components'
import { Table, TableProps } from 'pt-ui'
import { VaultButtons } from './VaultButtons'
import { VaultPrizePower } from './VaultPrizePower'
import { VaultTotalDeposits } from './VaultTotalDeposits'

interface VaultListProps {
  vaults: Vault[]
  className?: string
}

export const VaultList = (props: VaultListProps) => {
  const { vaults, className } = props

  const tableHeaders: TableProps['headers'] = [
    <span className='block text-left'>Token</span>,
    'Vault Chance', // TODO: add icon with tooltip next to prize power header
    'Total Deposits',
    'Manage'
  ]

  const tableRows: TableProps['rows'] = vaults.map((vault) => {
    const cells: ReactNode[] = [
      <VaultBadge vault={vault} />,
      <VaultPrizePower vault={vault} />,
      <VaultTotalDeposits vault={vault} displayCurrency={true} />,
      <VaultButtons vault={vault} />
    ]
    const className = 'text-center'
    return { cells, className }
  })

  if (tableRows.length > 0) {
    return (
      <div className={classNames('bg-pt-bg-purple-dark px-4 rounded-lg', className)}>
        <Table
          headers={tableHeaders}
          rows={tableRows}
          keyPrefix='vaultList'
          roundedRows={true}
          headerCellClassName='font-normal'
        />
      </div>
    )
  }
}
