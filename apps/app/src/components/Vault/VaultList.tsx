import classNames from 'classnames'
import { VaultInfo } from 'pt-types'
import { Button, Table, TableProps } from 'pt-ui'
import { getVaultsByChainId } from 'pt-utilities'
import { ReactNode } from 'react'
import defaultVaultList from '../../data/defaultVaultList'

export interface VaultListProps {
  chainId: number
  classname?: string
}

export const VaultList = (props: VaultListProps) => {
  const vaults = getVaultsByChainId(props.chainId, defaultVaultList)

  const tableHeaders: TableProps['headers'] = [
    <span className='block text-left'>Token</span>,
    'Yield Source',
    'Prize Power',
    'Total Deposits',
    ''
  ]

  const tableRows: TableProps['rows'] = vaults.map((vault) => {
    const cells: ReactNode[] = [
      <VaultToken vaultInfo={vault} />,
      vault.extensions.yieldSource,
      '',
      '0',
      <VaultButtons />
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

interface VaultTokenProps {
  vaultInfo: VaultInfo
}

export const VaultToken = (props: VaultTokenProps) => {
  return (
    <div className='flex items-center gap-2'>
      <img src={props.vaultInfo.logoURI} alt={`${props.vaultInfo.name} Logo`} className='h-6 w-6' />
      <div className='flex flex-col'>
        <span>{props.vaultInfo.name}</span>
        <span className='text-sm'>{props.vaultInfo.symbol}</span>
      </div>
    </div>
  )
}

const VaultButtons = () => {
  return (
    <div className='flex gap-2'>
      <Button>Deposit</Button>
      <Button>Details</Button>
    </div>
  )
}
