import { useQueries } from '@tanstack/react-query'
import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import {
  NO_REFETCH,
  QUERY_KEYS,
  useAllUserPrizePoolWins,
  usePrizePools
} from 'pt-hyperstructure-hooks'
import { getTokenPriceFromObject } from 'pt-utilities'
import { formatPrizePools } from '../utils'
import { useAllTokenPrices } from './useAllTokenPrices'

/**
 * Returns a user's total prize winnings in ETH
 * @returns
 */
export const useUserTotalWinnings = () => {
  const { address: userAddress } = useAccount()

  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const prizePoolsArray = Object.values(prizePools)

  const {
    data: wins,
    isFetched: isFetchedWins,
    refetch: refetchWins
  } = useAllUserPrizePoolWins(prizePoolsArray, userAddress)

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllTokenPrices()

  const totalTokensWonByChain = useMemo(() => {
    if (!!wins) {
      const totals: { [chainId: number]: BigNumber } = {}
      for (const key in wins) {
        const chainId = parseInt(key)
        totals[chainId] = wins[chainId].reduce((a, b) => a.add(b.payout), BigNumber.from(0))
      }
      return totals
    }
  }, [wins])

  const tokenDataResults = useQueries({
    queries: prizePoolsArray.map((prizePool) => {
      return {
        queryKey: [QUERY_KEYS.prizeTokenData, prizePool?.id],
        queryFn: async () => await prizePool.getPrizeTokenData(),
        staleTime: Infinity,
        enabled: !!prizePool,
        ...NO_REFETCH
      }
    })
  })

  return useMemo(() => {
    const isFetched =
      isFetchedWins &&
      isFetchedTokenPrices &&
      tokenDataResults?.every((result) => result.isFetched) &&
      !!wins &&
      !!tokenPrices &&
      !!totalTokensWonByChain

    let totalWinnings = 0

    if (isFetched) {
      for (const key in totalTokensWonByChain) {
        const chainId = parseInt(key)
        const tokenDataResult = tokenDataResults.find((result) => result.data?.chainId === chainId)
        if (!!tokenDataResult) {
          const tokenData = tokenDataResult.data
          const tokenAmount = parseFloat(
            utils.formatUnits(totalTokensWonByChain[chainId], tokenData.decimals)
          )
          const tokenPrice = getTokenPriceFromObject(chainId, tokenData.address, tokenPrices)
          totalWinnings += tokenAmount * tokenPrice
        }
      }
    }

    return { isFetched, refetch: refetchWins, data: totalWinnings }
  }, [totalTokensWonByChain, tokenDataResults])
}