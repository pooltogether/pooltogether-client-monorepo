import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { PrizePoolDropdown } from 'pt-components'
import { usePrizePools, useSelectedVault, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Button } from 'pt-ui'
import { NETWORK } from 'pt-utilities'
import { formatPrizePools } from '@constants/config'
import { useNetworks } from '@hooks/useNetworks'
import { PrizesTable } from './PrizesTable'

export const PrizePoolDisplay = () => {
  const router = useRouter()

  const networks = useNetworks()

  const { vaults } = useSelectedVaults()
  const { vault, setSelectedVaultId } = useSelectedVault()

  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const selectedPrizePool = !!vault
    ? Object.values(prizePools).find((prizePool) => prizePool.chainId === vault.chainId)
    : Object.values(prizePools)[0]

  const handleNetworkChange = (chainId: number) => {
    if (!!chainId && chainId in NETWORK) {
      const firstVaultInChain = Object.values(vaults.vaults).find(
        (vault) => vault.chainId === chainId
      )
      !!firstVaultInChain && setSelectedVaultId(firstVaultInChain.id)
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
      <Link href={`/deposit?network=${selectedNetwork}`} passHref={true}>
        <Button>Deposit to Win</Button>
      </Link>
      {!!selectedPrizePool && <PrizesTable prizePool={selectedPrizePool} />}
    </>
  )
}
