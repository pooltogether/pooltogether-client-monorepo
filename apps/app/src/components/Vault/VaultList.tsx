import classNames from 'classnames'
import { ReactNode } from 'react'
import { VaultBadge } from 'pt-components'
import { VaultInfo } from 'pt-types'
import { Table, TableProps } from 'pt-ui'
import { VaultButtons } from './VaultButtons'
import { VaultPrizePower } from './VaultPrizePower'
import { VaultTotalDeposits } from './VaultTotalDeposits'
import { VaultYieldSource } from './VaultYieldSource'

interface VaultListProps {
  vaults: VaultInfo[]
  className?: string
}

export const VaultList = (props: VaultListProps) => {
  const { vaults, className } = props

  const tableHeaders: TableProps['headers'] = [
    <span className='block text-left'>Token</span>,
    'Yield Source',
    'Prize Power', // TODO: add icon with tooltip next to prize power header
    'Total Deposits',
    'Manage'
  ]

  const tableRows: TableProps['rows'] = vaults.map((vaultInfo) => {
    const cells: ReactNode[] = [
      <VaultBadge vaultInfo={vaultInfo} />,
      <VaultYieldSource vaultInfo={vaultInfo} />,
      <VaultPrizePower vaultInfo={vaultInfo} />,
      <VaultTotalDeposits vaultInfo={vaultInfo} displayCurrency={true} />,
      <VaultButtons vaultInfo={vaultInfo} />
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
