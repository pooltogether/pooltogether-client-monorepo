import { BigNumber } from 'ethers'
import { PrizePool, Vault } from 'pt-client-js'
import { calculateOdds } from 'pt-utilities'
import { useVaultPercentageContribution } from '../vaults/useVaultPercentageContribution'
import { useVaultShareData } from '../vaults/useVaultShareData'
import { useEstimatedPrizeCount } from './useEstimatedPrizeCount'

/**
 * Returns the odds of winning any prize within any one draw for a specific vault, given a specific share balance
 * @param prizePool instance of the `PrizePool` class
 * @param vault instance of the `Vault` class
 * @param shares share amount to calculate odds for
 * @param options optional settings
 * @returns
 */
export const usePrizeOdds = (
  prizePool: PrizePool,
  vault: Vault,
  shares: string,
  options?: { isCumulative?: boolean }
): { data?: { percent: number; oneInX: number }; isFetched: boolean } => {
  const { data: shareData, isFetched: isFetchedShareData } = useVaultShareData(vault)

  const { data: vaultContribution, isFetched: isFetchedVaultContribution } =
    useVaultPercentageContribution(prizePool, vault)

  const { data: prizeCount, isFetched: isFetchedPrizeCount } = useEstimatedPrizeCount(prizePool)

  const isFetched = isFetchedShareData && isFetchedVaultContribution && isFetchedPrizeCount

  const percent =
    !!shareData && vaultContribution !== undefined && prizeCount !== undefined && !!shares
      ? calculateOdds(
          BigNumber.from(shares),
          BigNumber.from(shareData.totalSupply).add(
            options?.isCumulative ? BigNumber.from(shares) : 0
          ),
          shareData.decimals,
          vaultContribution,
          prizeCount
        )
      : 0

  const oneInX = 1 / percent

  const data = { percent, oneInX }

  return { data, isFetched }
}