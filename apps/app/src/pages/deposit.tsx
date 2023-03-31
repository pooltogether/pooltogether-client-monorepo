import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { PrizePoolHeader } from 'pt-components'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { filteredVaultsAtom } from '@atoms'
import { Layout } from '@components/Layout'
import { VaultFilters } from '@components/Vault/VaultFilters'
import { VaultList } from '@components/Vault/VaultList'
import { useNetworks } from '@hooks/useNetworks'

export default function DepositPage() {
  const networks = useNetworks()

  const { isFetched: isFetchedVaultData } = useSelectedVaults()

  const filteredVaults = useAtomValue(filteredVaultsAtom)

  return (
    <Layout className='gap-14'>
      <div className='w-full flex items-center gap-8 dark:bg-pt-bg-purple-dark px-6 py-5 rounded-lg'>
        <span className='text-lg font-semibold'>Filter</span>
        <VaultFilters />
      </div>
      {!isFetchedVaultData && <Spinner />}
      {isFetchedVaultData &&
        networks.map((network) => {
          if (filteredVaults[network] === undefined || filteredVaults[network].length === 0) return
          return (
            <div key={`pp-${network}`}>
              <PrizePoolHeader
                chainId={network}
                appendItem={
                  <Link
                    href={`/prizes?network=${network}`}
                    className='text-sm text-pt-purple-400 my-auto'
                  >
                    See Prize Details
                  </Link>
                }
                className='ml-4 mb-6'
                headerClassName='font-averta'
              />
              <VaultList vaults={filteredVaults[network]} />
            </div>
          )
        })}
    </Layout>
  )
}
