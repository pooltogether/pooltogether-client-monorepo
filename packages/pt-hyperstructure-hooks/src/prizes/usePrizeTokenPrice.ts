import { PrizePool } from 'pt-client-js'
import { CURRENCY_ID, useCoingeckoTokenPrices } from 'pt-generic-hooks'
import { getTokenPriceFromObject } from 'pt-utilities'
import { usePrizeTokenData } from '..'

/**
 * Returns the price of the token awarded by a prize pool
 * @param prizePool instance of the `PrizePool` class
 * @param currency optional currency (default is 'eth')
 * @returns
 */
export const usePrizeTokenPrice = (prizePool: PrizePool, currency?: CURRENCY_ID) => {
  const { data: prizeToken, isFetched: isFetchedPrizeToken } = usePrizeTokenData(prizePool)

  const {
    data: tokenPrices,
    isFetched: isFetchedTokenPrices,
    refetch
  } = useCoingeckoTokenPrices(prizePool?.chainId, !!prizeToken ? [prizeToken.address] : [], [
    currency ?? 'eth'
  ])

  const tokenPrice = !!prizeToken
    ? getTokenPriceFromObject(
        prizePool.chainId,
        prizeToken.address,
        {
          [prizePool.chainId]: tokenPrices ?? {}
        },
        currency
      )
    : 0

  const isFetched = isFetchedPrizeToken && isFetchedTokenPrices

  return { tokenPrice, isFetched, refetch }
}
