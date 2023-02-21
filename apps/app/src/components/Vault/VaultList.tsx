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
    'Token',
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
    return { cells }
  })

  return (
    <Table
      headers={tableHeaders}
      rows={tableRows}
      _key={'vaultList'}
      className={classNames(props.classname)}
    />
  )
}

interface VaultToken {
  vaultInfo: VaultInfo
}

export const VaultToken = (props: VaultToken) => {
  return (
    <div>
      <img src={props.vaultInfo.logoURI} alt={`${props.vaultInfo.name} Logo`} className='h-6 w-6' />
      <span>{props.vaultInfo.name}</span>
      <span>{props.vaultInfo.symbol}</span>
    </div>
  )
}

const VaultButtons = () => {
  return (
    <div>
      <Button>Deposit</Button>
      <Button>Details</Button>
    </div>
  )
}
