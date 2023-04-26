import { Vault } from 'pt-client-js'
import { usePrizePools, useVaultPrizePower } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'
import { formatPrizePools } from '../../utils'

interface VaultPrizePowerProps {
  vault: Vault
}

export const VaultPrizePower = (props: VaultPrizePowerProps) => {
  const { vault } = props

  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)

  const prizePool =
    !!vault && Object.values(prizePools).find((prizePool) => prizePool.chainId === vault.chainId)

  const { data: prizePower, isFetched: isFetchedPrizePower } = useVaultPrizePower(vault, prizePool)

  if (!isFetchedPrizePower) {
    return <Spinner />
  }

  return (
    <>
      {formatNumberForDisplay(prizePower * 100, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </>
  )
}
