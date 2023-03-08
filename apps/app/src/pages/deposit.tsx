import { useState } from 'react'
import { VaultInfo } from 'pt-types'
import { Layout } from '@components/Layout'
import { PrizePoolHeader } from '@components/PrizePool/PrizePoolHeader'
import { VaultFilters } from '@components/Vault/VaultFilters'
import { VaultList } from '@components/Vault/VaultList'
import { SUPPORTED_NETWORKS } from '@constants/networks'
import { useNetworks } from '@hooks/useNetworks'

export default function DepositPage() {
  const networks = useNetworks()
  const allNetworks = [...SUPPORTED_NETWORKS.mainnets, ...SUPPORTED_NETWORKS.testnets]

  const [vaults, setVaults] = useState<{ [chainId: number]: VaultInfo[] }>({})

  const handleFilteredVaults = (filteredVaults: VaultInfo[]) => {
    const newVaults: { [chainId: number]: VaultInfo[] } = {}
    allNetworks.forEach((network) => {
      newVaults[network] = []
    })
    filteredVaults.forEach((vault) => {
      newVaults[vault.chainId].push(vault)
    })
    setVaults(newVaults)
  }

  return (
    <Layout>
      <div className='flex flex-col flex-grow items-center py-2'>
        <main className='flex flex-col items-center mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 gap-14'>
          <div className='w-full flex items-center gap-8 dark:bg-pt-bg-purple-dark px-6 py-5 rounded-lg'>
            <span className='text-lg font-semibold'>Filter</span>
            <VaultFilters onFilter={handleFilteredVaults} />
            {/* TODO: vaultlist management functionality */}
            <span className='dark:text-pt-purple-100 cursor-pointer'>Manage Prize Asset List</span>
          </div>
          {networks.map((network) => {
            if (vaults[network] === undefined || vaults[network].length === 0) return
            return (
              <div key={`pp-${network}`}>
                <PrizePoolHeader chainId={network} className='mb-4' />
                <VaultList vaults={vaults[network]} />
              </div>
            )
          })}
        </main>
      </div>
    </Layout>
  )
}
