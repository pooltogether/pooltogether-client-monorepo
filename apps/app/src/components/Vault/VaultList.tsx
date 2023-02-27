import classNames from 'classnames'
import { ReactNode } from 'react'
import { Table, TableProps } from 'pt-ui'
import { getVaultsByChainId } from 'pt-utilities'
import defaultVaultList from '@data/defaultVaultList'
import { VaultButtons } from './VaultButtons'
import { VaultPrizePower } from './VaultPrizePower'
import { VaultToken } from './VaultToken'
import { VaultTotalDeposits } from './VaultTotalDeposits'

interface VaultListProps {
  chainId: number
  classname?: string
}

export const VaultList = (props: VaultListProps) => {
  const vaults = getVaultsByChainId(props.chainId, defaultVaultList)

  const tableHeaders: TableProps['headers'] = [
    <span className='block text-left'>Token</span>,
    'Yield Source',
    'Prize Power', // TODO: add icon with tooltip next to prize power header
    'Total Deposits',
    ''
  ]

  const tableRows: TableProps['rows'] = vaults.map((vaultInfo) => {
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
    <div className={classNames('bg-pt-bg-purple-dark p-4 rounded-lg', props.classname)}>
      <Table
        headers={tableHeaders}
        rows={tableRows}
        keyPrefix='vaultList'
        roundedRows={true}
        headerClassName='text-center'
        cellClassName='min-w-[15vw]'
      />
    </div>
  )
}
