import { useSelectedVault, useSelectedVaults } from '@pooltogether/hyperstructure-react-hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PrizePoolDropdown } from 'react-components'
import { Button } from 'ui'
import { NETWORK } from 'utilities'
import { useNetworks } from '@hooks/useNetworks'
import { useSelectedPrizePool } from '@hooks/useSelectedPrizePool'
import { PrizesTable } from './PrizesTable'

export const PrizePoolDisplay = () => {
  const router = useRouter()

  const networks = useNetworks()

  const { vaults } = useSelectedVaults()
  const { setSelectedVaultById } = useSelectedVault()

  const { selectedPrizePool } = useSelectedPrizePool()

  const handleNetworkChange = (chainId: number) => {
    if (!!chainId && chainId in NETWORK) {
      const firstVaultInChain = Object.values(vaults.vaults).find(
        (vault) => vault.chainId === chainId
      )
      !!firstVaultInChain && setSelectedVaultById(firstVaultInChain.id)
    }
  }

  useEffect(() => {
    const rawUrlNetwork = router.query['network']
    const chainId =
      !!rawUrlNetwork && typeof rawUrlNetwork === 'string' ? parseInt(rawUrlNetwork) : undefined
    handleNetworkChange(chainId)
  }, [router])

  return (
    <>
      <PrizePoolDropdown
        networks={networks}
        selectedNetwork={selectedPrizePool.chainId}
        onSelect={handleNetworkChange}
      />
      <Link href={`/vaults?network=${selectedPrizePool.chainId}`} passHref={true}>
        <Button>Deposit to Win</Button>
      </Link>
      {!!selectedPrizePool && <PrizesTable prizePool={selectedPrizePool} />}
    </>
  )
}
