import { useRouter } from 'next/router'
import { Vault } from 'pt-client-js'
import { PrizePowerTooltip, VaultBadge } from 'pt-components'
import { Spinner, Table, TableProps } from 'pt-ui'
import { AccountVaultBalance } from '@components/Account/AccountVaultBalance'
import { SortId, useSortedVaults } from '@hooks/useSortedVaults'
import { VaultButtons } from './VaultButtons'
import { VaultPrizePower } from './VaultPrizePower'
import { VaultTotalDeposits } from './VaultTotalDeposits'

interface VaultsTableProps {
  chainId: number
  vaults: Vault[]
  className?: string
}

export const VaultsTable = (props: VaultsTableProps) => {
  const { chainId, vaults, className } = props

  const router = useRouter()

  const { sortedVaults, setSortVaultsBy, isFetched } = useSortedVaults(chainId, vaults)

  if (!isFetched) {
    return <Spinner />
  }

  const tableData: TableProps['data'] = {
    headers: {
      token: { content: 'Token' },
      prizePower: { content: <PrizePowerHeader onClick={setSortVaultsBy} />, position: 'center' },
      totalDeposits: {
        content: <TotalDepositsHeader onClick={setSortVaultsBy} />,
        position: 'center'
      },
      balance: { content: <MyBalanceHeader onClick={setSortVaultsBy} />, position: 'center' },
      manage: { content: <ManageHeader />, position: 'right' }
    },
    rows: sortedVaults.map((vault) => ({
      cells: {
        token: {
          content: (
            <VaultBadge
              vault={vault}
              onClick={() => router.push(`/vault/${vault.id}`)}
              className='isolate'
            />
          )
        },
        prizePower: {
          content: (
            <span className='text-xl font-semibold text-pt-purple-400'>
              <VaultPrizePower vault={vault} />
            </span>
          ),
          position: 'center'
        },
        totalDeposits: {
          content: <VaultTotalDeposits vault={vault} />,
          position: 'center'
        },
        balance: {
          content: <AccountVaultBalance vault={vault} />,
          position: 'center'
        },
        manage: { content: <VaultButtons vault={vault} />, position: 'right' }
      }
    }))
  }

  return <Table data={tableData} keyPrefix='vaultsTable' rounded={true} className={className} />
}

interface HeaderProps {
  onClick: (id: SortId) => void
}

const PrizePowerHeader = (props: HeaderProps) => {
  const { onClick } = props

  return (
    <span onClick={() => onClick('prizePower')} className='flex gap-1 items-center cursor-pointer'>
      Prize Power <PrizePowerTooltip iconSize='lg' />
    </span>
  )
}

const TotalDepositsHeader = (props: HeaderProps) => {
  const { onClick } = props

  return (
    <span onClick={() => onClick('totalDeposits')} className='cursor-pointer'>
      Total Deposits
    </span>
  )
}

const MyBalanceHeader = (props: HeaderProps) => {
  const { onClick } = props

  return (
    <span onClick={() => onClick('myBalance')} className='cursor-pointer'>
      My Balance
    </span>
  )
}

const ManageHeader = () => {
  return <span className='mr-[18px]'>Manage</span>
}
