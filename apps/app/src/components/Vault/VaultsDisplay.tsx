import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { NetworkBadge } from 'pt-components'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { filteredVaultsAtom } from '@atoms'
import { useNetworks } from '@hooks/useNetworks'
import { VaultsTable } from './VaultsTable'

// TODO: there should be a "no vaults" empty state that pushes the user towards vault list management
export const VaultsDisplay = () => {
  const router = useRouter()

  const networks = useNetworks()

  const { isFetched: isFetchedVaultData } = useSelectedVaults()

  const filteredVaults = useAtomValue(filteredVaultsAtom)

  if (!isFetchedVaultData) {
    return <Spinner />
  }

  return (
    <>
      {networks.map((network) => {
        if (filteredVaults[network] === undefined || filteredVaults[network].length === 0) return
        return (
          <div key={`pp-${network}`} className='flex flex-col items-center gap-6'>
            <NetworkBadge
              chainId={network}
              appendText='Prize Pool'
              textClassName='text-lg font-medium'
              onClick={() => router.push(`/prizes?network=${network}`)}
            />
            <VaultsTable vaults={filteredVaults[network]} />
          </div>
        )
      })}
    </>
  )
}
