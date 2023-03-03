import classNames from 'classnames'
import { ReactNode, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { NetworkIcon } from 'pt-components'
import { useUserVaultBalances } from 'pt-hooks'
import { VaultInfoWithBalance } from 'pt-types'
import { Spinner, Table, TableProps } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { VaultToken } from '@components/Vault/VaultToken'
import defaultVaultList from '@data/defaultVaultList'
import { useProviders } from '@hooks/useProviders'
import { AccountVaultBalance } from './AccountVaultBalance'
import { AccountVaultButtons } from './AccountVaultButtons'

interface AccountVaultListProps {
  className?: string
}

// TODO: sort by balance by default
// TODO: add sorting when clicking headers
export const AccountVaultList = (props: AccountVaultListProps) => {
  const { address: userAddress } = useAccount()

  // const providers = useProviders()
  // const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useUserVaultBalances(
  //   providers,
  //   userAddress,
  //   defaultVaultList
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
    ''
  ]

  const tableRows: TableProps['rows'] = Object.keys(vaultBalances).map((vaultId) => {
    const vaultInfo = vaultBalances[vaultId]
    const cells: ReactNode[] = [
      <VaultToken vaultInfo={vaultInfo} />,
      <VaultPrizePool chainId={vaultInfo.chainId} />,
      '1 in X',
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
        <div className={classNames('bg-pt-bg-purple-dark p-4 rounded-lg', props.className)}>
          <Table
            headers={tableHeaders}
            rows={tableRows}
            keyPrefix='dpVaultList'
            roundedRows={true}
            headerClassName='text-center'
            cellClassName='min-w-[15vw] text-center'
          />
        </div>
      )}
      {!isFetchedVaultBalances && <Spinner />}
    </>
  )
}

interface VaultPrizePoolProps {
  chainId: number
}

const VaultPrizePool = (props: VaultPrizePoolProps) => {
  const networkName = getNiceNetworkNameByChainId(props.chainId)

  return (
    <span className='inline-flex items-center justify-center gap-2 text-sm dark:bg-pt-transparent px-3 py-1 rounded-lg'>
      <NetworkIcon chainId={props.chainId} className='h-4 w-4' />
      <span>{networkName} Prize Pool</span>
    </span>
  )
}
