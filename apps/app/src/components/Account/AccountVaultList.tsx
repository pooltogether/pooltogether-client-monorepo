import classNames from 'classnames'
import { ReactNode, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { NetworkBadge, VaultBadge } from 'pt-components'
import { useUserVaultBalances, useVaults } from 'pt-hyperstructure-hooks'
import { VaultInfoWithBalance } from 'pt-types'
import { Spinner, Table, TableProps } from 'pt-ui'
import defaultVaultList from '@constants/defaultVaultList'
import { AccountVaultBalance } from './AccountVaultBalance'
import { AccountVaultButtons } from './AccountVaultButtons'
import { AccountVaultOdds } from './AccountVaultOdds'

interface AccountVaultListProps {
  className?: string
}

// TODO: sort by balance by default
// TODO: add sorting when clicking headers
export const AccountVaultList = (props: AccountVaultListProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  const vaults = useVaults(defaultVaultList)

  // const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useUserVaultBalances(
  //   vaults,
  //   userAddress
  // )

  // TODO: remove and uncomment hook above once vaults are setup
  const vaultBalances: { [vaultId: string]: VaultInfoWithBalance } = {
    '0x4200000000000000000000000000000000000006-10': {
      chainId: 10,
      address: '0x4200000000000000000000000000000000000006',
      name: 'WETH Vault',
      decimals: 18,
      symbol: 'ptaWETH',
      logoURI: 'https://optimistic.etherscan.io/token/images/weth_28.png',
      extensions: {
        yieldSource: 'Aave',
        underlyingAsset: {
          chainId: 10,
          address: '0x4200000000000000000000000000000000000006',
          symbol: 'WETH',
          name: 'Wrapped Ether',
          decimals: '18',
          logoURI: 'https://optimistic.etherscan.io/token/images/weth_28.png'
        }
      },
      balance: '12345678909876543210'
    }
  }
  const isFetchedVaultBalances: boolean = true

  const noBalances = isFetchedVaultBalances
    ? Object.keys(vaultBalances).every((vaultId) => vaultBalances[vaultId].balance === '0')
    : false

  const tableHeaders: TableProps['headers'] = [
    <span className='block text-left'>Token</span>,
    'Prize Pool',
    'Winning Chances',
    'Deposited',
    'Manage'
  ]

  const tableRows: TableProps['rows'] = Object.keys(vaultBalances).map((vaultId) => {
    const vaultInfo = vaultBalances[vaultId]
    const cells: ReactNode[] = [
      <VaultBadge vaultInfo={vaultInfo} />,
      <NetworkBadge chainId={vaultInfo.chainId} appendText={'Prize Pool'} hideIcon={true} />,
      <AccountVaultOdds vaultInfo={vaultInfo} />,
      <AccountVaultBalance vaultInfo={vaultInfo} />,
      <AccountVaultButtons vaultInfo={vaultInfo} />
    ]
    return { cells }
  })

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  if (isBrowser && userAddress === undefined) {
    return <span>Connect your wallet to check your vault balances.</span>
  } else if (noBalances) {
    return <span>You haven't deposited into any vaults yet.</span>
  }

  return (
    <>
      {isFetchedVaultBalances && (
        <div className={classNames('bg-pt-bg-purple-dark px-4 rounded-lg', className)}>
          <Table
            headers={tableHeaders}
            rows={tableRows}
            keyPrefix='dpVaultList'
            roundedRows={true}
            headerCellClassName='font-normal'
          />
        </div>
      )}
      {!isFetchedVaultBalances && <Spinner />}
    </>
  )
}
