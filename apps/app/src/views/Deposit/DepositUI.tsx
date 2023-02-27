import { useState } from 'react'
import { VaultInfo } from 'pt-types'
import { PrizePoolHeader } from '@components/PrizePool/PrizePoolHeader'
import { VaultFilters } from '@components/Vault/VaultFilters'
import { VaultList } from '@components/Vault/VaultList'
import { SUPPORTED_NETWORKS } from '@constants/networks'

export const DepositUI = () => {
  const [vaults, setVaults] = useState<{ [chainId: number]: VaultInfo[] }>({})

  const handleFilteredVaults = (filteredVaults: VaultInfo[]) => {
    const newVaults: { [chainId: number]: VaultInfo[] } = {}
    SUPPORTED_NETWORKS.mainnets.forEach((network) => {
      newVaults[network] = []
    })
    filteredVaults.forEach((vault) => {
      newVaults[vault.chainId].push(vault)
    })
    setVaults(newVaults)
  }

  return (
    <div className='flex flex-col items-center py-2'>
      <main className='flex flex-col items-center mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 gap-14'>
        <VaultFilters onFilter={handleFilteredVaults} />
        {SUPPORTED_NETWORKS.mainnets.map((network) => {
          return (
            <div key={`pp-${network}`}>
              <PrizePoolHeader chainId={network} className='mb-4' />
              <VaultList vaults={vaults[network] ?? []} />
            </div>
          )
        })}
      </main>
    </div>
  )
}
