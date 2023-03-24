import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PrizePoolHeader } from 'pt-components'
import { Layout } from '@components/Layout'
import { VaultFilters } from '@components/Vault/VaultFilters'
import { VaultList } from '@components/Vault/VaultList'
import { useNetworks } from '@hooks/useNetworks'

export default function DepositPage() {
  const networks = useNetworks()

  const [vaultIds, setVaultIds] = useState<string[]>([])

  const vaultIdsByNetwork = useMemo(() => {
    const ids: { [chainId: number]: string[] } = {}

    networks.forEach((network) => {
      ids[network] = []
    })

    vaultIds.forEach((id) => {
      const network = parseInt(id.split('-')[1])
      ids[network].push(id)
    })

    return ids
  }, [networks, vaultIds])

  return (
    <Layout className='gap-14'>
      <div className='w-full flex items-center gap-8 dark:bg-pt-bg-purple-dark px-6 py-5 rounded-lg'>
        <span className='text-lg font-semibold'>Filter</span>
        <VaultFilters onFilter={setVaultIds} />
      </div>
      {networks.map((network) => {
        if (vaultIdsByNetwork[network] === undefined || vaultIdsByNetwork[network].length === 0)
          return
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
            <VaultList vaultIds={vaultIdsByNetwork[network]} />
          </div>
        )
      })}
    </Layout>
  )
}
