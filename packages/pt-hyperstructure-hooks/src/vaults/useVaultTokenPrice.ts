import { Vault } from 'pt-client-js'
import { CURRENCY_ID } from 'pt-generic-hooks'
import { getTokenPriceFromObject } from 'pt-utilities'
import { useTokenPrices, useVaultTokenAddress } from '..'

/**
 * Returns a vault's underlying token price
 * @param vault instance of the `Vault` class
 * @param currency optional currency (default is 'eth')
 * @returns
 */
export const useVaultTokenPrice = (vault: Vault, currency?: CURRENCY_ID) => {
  const { data: tokenAddress, isFetched: isFetchedTokenAddress } = useVaultTokenAddress(vault)

  const {
    data: tokenPrices,
    isFetched: isFetchedTokenPrices,
    refetch
  } = useTokenPrices(
    vault.chainId,
    !!tokenAddress ? [tokenAddress] : [],
    !!currency ? [currency] : undefined
  )

  const tokenPrice = !!tokenAddress
    ? getTokenPriceFromObject(
        vault.chainId,
        tokenAddress,
        {
          [vault.chainId]: tokenPrices ?? {}
        },
        currency
      )
    : undefined

  const isFetched = isFetchedTokenAddress && isFetchedTokenPrices

  return { tokenPrice, isFetched, refetch }
}
