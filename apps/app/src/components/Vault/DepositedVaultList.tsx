import classNames from 'classnames'
import { BigNumber } from 'ethers'
import { useAllUserVaultBalances } from 'pt-hooks'
import { VaultInfoWithBalance } from 'pt-types'
import { Button, Table, TableProps } from 'pt-ui'
import { formatUnformattedBigNumberForDisplay, getNiceNetworkNameByChainId } from 'pt-utilities'
import { ReactNode } from 'react'
import { useAccount } from 'wagmi'
import defaultVaultList from '../../data/defaultVaultList'
import { useProviders } from '../../hooks/useProviders'
import { VaultToken } from './VaultList'

export interface DepositedVaultListProps {
  className?: string
}

// TODO: coingecko pricing of each token
// TODO: sort by balance by default
// TODO: add sorting when clicking headers
export const DepositedVaultList = (props: DepositedVaultListProps) => {
  const { address: userAddress } = useAccount()
  const providers = useProviders()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useAllUserVaultBalances(
    providers,
    userAddress,
    defaultVaultList
  )

  const noBalances = isFetchedVaultBalances
    ? Object.keys(vaultBalances).every((vaultId) => vaultBalances[vaultId].balance === '0')
    : false

  if (userAddress === undefined) {
    return <span>Connect your wallet to check your vault balances.</span>
  } else if (noBalances) {
    return <span>You haven't deposited into any vaults yet.</span>
  }

  const tableHeaders: TableProps['headers'] = [
    'Token',
    'Prize Pool',
    'Winning Chances',
    'Deposited',
    ''
  ]

  const tableRows: TableProps['rows'] = Object.keys(vaultBalances).map((vaultId) => {
    const cells: ReactNode[] = [
      <VaultToken vaultInfo={vaultBalances[vaultId]} />,
      getNiceNetworkNameByChainId(vaultBalances[vaultId].chainId),
      '1 in X',
      <DepositedVaultBalance vaultInfo={vaultBalances[vaultId]} />,
      <DepositedVaultButtons />
    ]
    return { cells }
  })

  return (
    <>
      {isFetchedVaultBalances && (
        <Table
          headers={tableHeaders}
          rows={tableRows}
          keyPrefix='dpVaultList'
          className={classNames(props.className)}
        />
      )}
      {!isFetchedVaultBalances && <span>Loading...</span>}
    </>
  )
}

interface DepositedVaultBalanceProps {
  vaultInfo: VaultInfoWithBalance
}

const DepositedVaultBalance = (props: DepositedVaultBalanceProps) => {
  return (
    <span>
      {formatUnformattedBigNumberForDisplay(
        BigNumber.from(props.vaultInfo.balance),
        props.vaultInfo.decimals.toString()
      )}{' '}
      {props.vaultInfo.extensions.underlyingAsset.symbol}
    </span>
  )
}

const DepositedVaultButtons = () => {
  return (
    <div>
      <Button>Deposit</Button>
      <Button>Withdraw</Button>
    </div>
  )
}
