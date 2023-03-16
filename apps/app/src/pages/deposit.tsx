import Link from 'next/link'
import { useState } from 'react'
import { PrizePoolHeader } from 'pt-components'
import { VaultInfo } from 'pt-types'
import { Layout } from '@components/Layout'
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
    <Layout className='gap-14'>
      <div className='w-full flex items-center gap-8 dark:bg-pt-bg-purple-dark px-6 py-5 rounded-lg'>
        <span className='text-lg font-semibold'>Filter</span>
        <VaultFilters onFilter={handleFilteredVaults} />
      </div>
      {networks.map((network) => {
        if (vaults[network] === undefined || vaults[network].length === 0) return
        return (
          <div key={`pp-${network}`}>
            <PrizePoolHeader
              chainId={network}
              size='large'
              appendItem={
                <Link href={`/prizes?network=${network}`} className='text-pt-purple-400 my-auto'>
                  See Prize Details
                </Link>
              }
              className='ml-6 mb-4'
            />
            <VaultList vaults={vaults[network]} />
          </div>
        )
      })}
    </Layout>
  )
}
