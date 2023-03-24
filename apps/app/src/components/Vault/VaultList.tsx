import classNames from 'classnames'
import { ReactNode } from 'react'
import { VaultBadge } from 'pt-components'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Table, TableProps } from 'pt-ui'
import { VaultButtons } from './VaultButtons'
import { VaultPrizePower } from './VaultPrizePower'
import { VaultTotalDeposits } from './VaultTotalDeposits'

interface VaultListProps {
  vaultIds: string[]
  className?: string
}

export const VaultList = (props: VaultListProps) => {
  const { vaultIds, className } = props

  const vaults = useSelectedVaults()

  const tableHeaders: TableProps['headers'] = [
    <span className='block text-left'>Token</span>,
    'Prize Power', // TODO: add icon with tooltip next to prize power header
    'Total Deposits',
    'Manage'
  ]

  const tableRows: TableProps['rows'] = vaultIds.map((vaultId) => {
    const vault = vaults.vaults[vaultId]
    const cells: ReactNode[] = [
      <VaultBadge vault={vault} />,
      <VaultPrizePower vault={vault} />,
      <VaultTotalDeposits vault={vault} displayCurrency={true} />,
      <VaultButtons vault={vault} />
    ]
    const className = 'text-center'
    return { cells, className }
  })

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
