import classNames from 'classnames'
import { ReactNode, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { NetworkBadge, VaultBadge } from 'pt-components'
import { useSelectedVaults, useUserVaultBalances } from 'pt-hyperstructure-hooks'
import { Spinner, Table, TableProps } from 'pt-ui'
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

  const vaults = useSelectedVaults()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useUserVaultBalances(
    vaults,
    userAddress
  )

  const noBalances =
    isFetchedVaultBalances && !!vaultBalances
      ? Object.keys(vaultBalances).every((vaultId) => vaultBalances[vaultId].balance === '0')
      : false

  const tableHeaders: TableProps['headers'] = [
    <span className='block text-left'>Token</span>,
    'Prize Pool',
    'Winning Chances',
    'Deposited',
    'Manage'
  ]

  const tableRows: TableProps['rows'] =
    isFetchedVaultBalances && !!vaultBalances
      ? Object.keys(vaultBalances).map((vaultId) => {
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
      : []

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
      {isFetchedVaultBalances && !!vaultBalances && (
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
