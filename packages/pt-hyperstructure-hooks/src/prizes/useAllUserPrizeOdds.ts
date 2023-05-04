import { BigNumber } from 'ethers'
import { PrizePool, Vaults } from 'pt-client-js'
import { calculateOdds, calculateUnionProbability } from 'pt-utilities'
import { useAllUserVaultBalances } from '../vaults/useAllUserVaultBalances'
import { useAllVaultPercentageContributions } from '../vaults/useAllVaultPercentageContributions'
import { useAllVaultShareData } from '../vaults/useAllVaultShareData'
import { useEstimatedPrizeCount } from './useEstimatedPrizeCount'

// TODO: refactor this to take multiple prize pools
/**
 * Returns a user's odds of winning any prize within any one draw, in any vault
 * @param prizePool instance of the `PrizePool` class
 * @param vaults instance of the `Vaults` class
 * @param userAddress the user address to calculate odds for
 * @returns
 */
export const useAllUserPrizeOdds = (
  prizePool: PrizePool,
  vaults: Vaults,
  userAddress: string
): { data?: { percent: number; oneInX: number }; isFetched: boolean } => {
  const { data: shareData, isFetched: isFetchedShareData } = useAllVaultShareData(vaults)

  const { data: vaultContributions, isFetched: isFetchedVaultContributions } =
    useAllVaultPercentageContributions(prizePool, vaults)

  const { data: prizeCount, isFetched: isFetchedPrizeCount } = useEstimatedPrizeCount(prizePool)

  const { data: shareBalances, isFetched: isFetchedShareBalances } = useAllUserVaultBalances(
    vaults,
    userAddress
  )

  const isFetched =
    isFetchedShareData &&
    isFetchedVaultContributions &&
    isFetchedPrizeCount &&
    isFetchedShareBalances

  const probabilities =
    !!shareData && !!vaultContributions && prizeCount !== undefined && !!shareBalances
      ? Object.keys(shareData).map((vaultId) => {
          return calculateOdds(
            BigNumber.from(shareBalances[vaultId]?.amount ?? 0),
            BigNumber.from(shareData[vaultId].totalSupply),
            shareData[vaultId].decimals,
            vaultContributions[vaultId],
            prizeCount
          )
        })
      : []

  const percent = calculateUnionProbability(probabilities)

  const oneInX = Math.round(1 / percent)

  const data = { percent, oneInX }

  return { data, isFetched }
}
