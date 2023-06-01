import { CURRENCY_ID } from 'generic-react-hooks'
import { TokenWithPrice, Vault } from 'hyperstructure-client-js'
import { getTokenPriceFromObject } from 'utilities'
import { useTokenPrices, useVaultTokenData } from '..'

/**
 * Returns a vault's underlying token price
 * @param vault instance of the `Vault` class
 * @param currency optional currency (default is 'eth')
 * @returns
 */
export const useVaultTokenPrice = (vault: Vault, currency?: CURRENCY_ID) => {
  const { data: tokenData, isFetched: isFetchedTokenData } = useVaultTokenData(vault)

  const {
    data: tokenPrices,
    isFetched: isFetchedTokenPrices,
    refetch
  } = useTokenPrices(
    vault.chainId,
    !!tokenData ? [tokenData.address] : [],
    !!currency ? [currency] : undefined
  )

  const tokenPrice = !!tokenData
    ? getTokenPriceFromObject(
        vault.chainId,
        tokenData.address,
        {
          [vault.chainId]: tokenPrices ?? {}
        },
        currency
      )
    : undefined

  const isFetched = isFetchedTokenData && isFetchedTokenPrices

  const data: TokenWithPrice | undefined =
    !!tokenData && tokenPrice !== undefined ? { ...tokenData, price: tokenPrice } : undefined

  return { data, isFetched, refetch }
}
