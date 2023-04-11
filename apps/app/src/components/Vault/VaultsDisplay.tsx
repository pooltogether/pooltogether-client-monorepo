import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { PrizePoolHeader } from 'pt-components'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { filteredVaultsAtom } from '@atoms'
import { useNetworks } from '@hooks/useNetworks'
import { VaultsTable } from './VaultsTable'

export const VaultsDisplay = () => {
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
            <VaultsTable vaults={filteredVaults[network]} />
          </div>
        )
      })}
    </>
  )
}
