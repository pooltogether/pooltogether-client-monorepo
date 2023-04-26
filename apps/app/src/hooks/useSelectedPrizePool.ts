import { usePrizePools, useSelectedVault } from 'pt-hyperstructure-hooks'
import { formatPrizePools } from '../utils'

/**
 * Returns currently selected Prize Pool
 * @returns
 */
export const useSelectedPrizePool = () => {
  const { vault } = useSelectedVault()

  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)

  const selectedPrizePool = !!vault
    ? Object.values(prizePools).find((prizePool) => prizePool.chainId === vault.chainId)
    : Object.values(prizePools)[0]

  return { selectedPrizePool }
}
