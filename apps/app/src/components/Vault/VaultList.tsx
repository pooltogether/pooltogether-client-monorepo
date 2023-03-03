import classNames from 'classnames'
import { ReactNode } from 'react'
import { VaultInfo } from 'pt-types'
import { Table, TableProps } from 'pt-ui'
import { VaultButtons } from './VaultButtons'
import { VaultPrizePower } from './VaultPrizePower'
import { VaultToken } from './VaultToken'
import { VaultTotalDeposits } from './VaultTotalDeposits'

interface VaultListProps {
  vaults: VaultInfo[]
  className?: string
}

export const VaultList = (props: VaultListProps) => {
  const tableHeaders: TableProps['headers'] = [
    <span className='block text-left'>Token</span>,
    'Yield Source',
    'Prize Power', // TODO: add icon with tooltip next to prize power header
    'Total Deposits',
    ''
  ]

  const tableRows: TableProps['rows'] = props.vaults.map((vaultInfo) => {
    const cells: ReactNode[] = [
      <VaultToken vaultInfo={vaultInfo} />,
      vaultInfo.extensions.yieldSource,
      <VaultPrizePower vaultInfo={vaultInfo} />,
      <VaultTotalDeposits vaultInfo={vaultInfo} displayCurrency={true} />,
      <VaultButtons vaultInfo={vaultInfo} />
    ]
    const className = 'text-center'
    return { cells, className }
  })

  return (
    <div className={classNames('bg-pt-bg-purple-dark p-4 rounded-lg', props.className)}>
      <Table
        headers={tableHeaders}
        rows={tableRows}
        keyPrefix='vaultList'
        roundedRows={true}
        headerClassName='text-center'
        cellClassName='min-w-[15vw] text-center'
      />
    </div>
  )
}
