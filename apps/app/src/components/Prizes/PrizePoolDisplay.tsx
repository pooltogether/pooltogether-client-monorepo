import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { PrizePoolDropdown } from 'pt-components'
import { useSelectedVault, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Button } from 'pt-ui'
import { NETWORK } from 'pt-utilities'
import { useNetworks } from '@hooks/useNetworks'
import { useSelectedPrizePool } from '@hooks/useSelectedPrizePool'
import { PrizesTable } from './PrizesTable'

export const PrizePoolDisplay = () => {
  const router = useRouter()

  const networks = useNetworks()

  const { vaults } = useSelectedVaults()
  const { vault, setSelectedVaultById } = useSelectedVault()

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

  const selectedNetwork = useMemo(() => vault?.chainId ?? networks[0], [vault])

  return (
    <>
      <PrizePoolDropdown
        networks={networks}
        selectedNetwork={selectedNetwork}
        onSelect={handleNetworkChange}
      />
      <Link href={`/vaults?network=${selectedNetwork}`} passHref={true}>
        <Button>Deposit to Win</Button>
      </Link>
      {!!selectedPrizePool && <PrizesTable prizePool={selectedPrizePool} />}
    </>
  )
}
