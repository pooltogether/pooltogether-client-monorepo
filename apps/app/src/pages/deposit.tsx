import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Vault } from 'pt-client-js'
import { PrizePoolHeader } from 'pt-components'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Layout } from '@components/Layout'
import { VaultFilters } from '@components/Vault/VaultFilters'
import { VaultList } from '@components/Vault/VaultList'
import { useNetworks } from '@hooks/useNetworks'

export default function DepositPage() {
  const networks = useNetworks()

  const { vaults } = useSelectedVaults()

  const [vaultIds, setVaultIds] = useState<string[]>([])

  // Filtering out invalid vaults:
  const validVaults = vaultIds
    .map((vaultId) => {
      const vault = vaults.vaults[vaultId]

      if (!!vault.shareData && !!vault.tokenData && vault.decimals !== undefined) {
        return vault
      }
    })
    .filter((vault) => !!vault)

  const vaultsByNetwork = useMemo(() => {
    const vaults: { [chainId: number]: Vault[] } = {}

    networks.forEach((network) => {
      vaults[network] = []
    })

    validVaults.forEach((vault) => {
      vaults[vault.chainId].push(vault)
    })

    return vaults
  }, [networks, validVaults])

  return (
    <Layout className='gap-14'>
      <div className='w-full flex items-center gap-8 dark:bg-pt-bg-purple-dark px-6 py-5 rounded-lg'>
        <span className='text-lg font-semibold'>Filter</span>
        <VaultFilters onFilter={setVaultIds} />
      </div>
      {networks.map((network) => {
        if (vaultsByNetwork[network] === undefined || vaultsByNetwork[network].length === 0) return
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
            <VaultList vaults={vaultsByNetwork[network]} />
          </div>
        )
      })}
    </Layout>
  )
}
