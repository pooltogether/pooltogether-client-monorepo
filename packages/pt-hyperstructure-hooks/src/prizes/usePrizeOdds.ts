import { PrizePool, Vault } from 'pt-client-js'
import { calculateOdds } from 'pt-utilities'
import { useVaultPercentageContribution } from '../vaults/useVaultPercentageContribution'
import { useVaultShareData } from '../vaults/useVaultShareData'
import { useEstimatedPrizeCount } from './useEstimatedPrizeCount'

/**
 * Returns the odds of winning any prize within any draw for a specific vault, given a specific share balance
 * @param prizePool instance of the `PrizePool` class
 * @param vault instance of the `Vault` class
 * @param shares share amount to calculate odds for
 * @returns
 */
export const usePrizeOdds = (
  prizePool: PrizePool,
  vault: Vault,
  shares: string
): { data?: { percent: number; oneInX: number }; isFetched: boolean } => {
  const { data: shareData, isFetched: isFetchedShareData } = useVaultShareData(vault)

  const { data: vaultContribution, isFetched: isFetchedVaultContribution } =
    useVaultPercentageContribution(prizePool, vault)

  const { data: prizeCount, isFetched: isFetchedPrizeCount } = useEstimatedPrizeCount(prizePool)

  const isFetched = isFetchedShareData && isFetchedVaultContribution && isFetchedPrizeCount

  const data =
    !!prizePool &&
    !!vault &&
    !!shareData &&
    vaultContribution !== undefined &&
    prizeCount !== undefined
      ? calculateOdds(shares, shareData.totalSupply, vaultContribution, prizeCount)
      : undefined

  return { data, isFetched }
}
