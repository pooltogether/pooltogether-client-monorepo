import { useQueries } from '@tanstack/react-query'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { PrizePool, Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { calculateOdds, calculateUnionProbability } from 'pt-utilities'
import { QUERY_KEYS } from '../constants'
import { useAllUserVaultBalances } from '../vaults/useAllUserVaultBalances'
import { useAllVaultPercentageContributions } from '../vaults/useAllVaultPercentageContributions'
import { useAllVaultShareData } from '../vaults/useAllVaultShareData'

/**
 * Return the odds of a user winning any prize within any one draw for any prize pool or vault
 * @param prizePools array of instances of the `PrizePool` class
 * @param vaults instance of the `Vaults` class
 * @param userAddress the user's wallet address
 * @returns
 */
export const useAllUserPrizeOdds = (
  prizePools: PrizePool[],
  vaults: Vaults,
  userAddress: string
): { data?: { percent: number; oneInX: number }; isFetched: boolean } => {
  const { data: shareData } = useAllVaultShareData(vaults)

  const { data: shareBalances } = useAllUserVaultBalances(vaults, userAddress)

  const { data: vaultContributions } = useAllVaultPercentageContributions(prizePools, vaults)

  const results = useQueries({
    queries: prizePools.map((prizePool) => {
      const vaultIds = Object.keys(vaults.vaults).filter(
        (vaultId) => vaults.vaults[vaultId].chainId === prizePool.chainId
      )
      const queryKey = [QUERY_KEYS.prizeOdds, prizePool?.id, vaultIds, userAddress]

      const enabled =
        !!prizePool &&
        !!vaults &&
        !!userAddress &&
        !!shareData &&
        !!shareBalances &&
        !!vaultContributions

      return {
        queryKey: queryKey,
        queryFn: async () => {
          const numPrizes = await prizePool.getEstimatedPrizeCount()

          const probabilities = vaultIds.map((vaultId) => {
            if (!!shareData && !!shareBalances) {
              const userShares = BigNumber.from(shareBalances[vaultId].amount)
              const totalShares = BigNumber.from(shareData[vaultId].totalSupply)
              const decimals = shareData[vaultId].decimals
              const vaultContribution = vaultContributions[vaultId]

              return calculateOdds(userShares, totalShares, decimals, vaultContribution, numPrizes)
            } else {
              return 0
            }
          })

          return calculateUnionProbability(probabilities)
        },
        enabled,
        ...NO_REFETCH
      }
    })
  })

  return useMemo(() => {
    const isFetched = results?.every((result) => result.isFetched)
    const refetch = () => results?.forEach((result) => result.refetch())

    const probabilities = results.map((result) => result.data ?? 0)
    const percent = calculateUnionProbability(probabilities)
    const oneInX = 1 / percent

    return { isFetched, refetch, data: { percent, oneInX } }
  }, [results])
}
