import { CURRENCY_ID } from 'generic-react-hooks'
import { PrizePool, TokenWithPrice } from 'hyperstructure-client-js'
import { getTokenPriceFromObject } from 'utilities'
import { usePrizeTokenData, useTokenPrices } from '..'

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
  } = useTokenPrices(
    prizePool?.chainId,
    !!prizeToken ? [prizeToken.address] : [],
    !!currency ? [currency] : undefined
  )

  const tokenPrice = !!prizeToken
    ? getTokenPriceFromObject(
        prizePool.chainId,
        prizeToken.address,
        {
          [prizePool.chainId]: tokenPrices ?? {}
        },
        currency
      )
    : undefined

  const isFetched = isFetchedPrizeToken && isFetchedTokenPrices

  const data: TokenWithPrice | undefined =
    !!prizeToken && tokenPrice !== undefined ? { ...prizeToken, price: tokenPrice } : undefined

  return { data, isFetched, refetch }
}
