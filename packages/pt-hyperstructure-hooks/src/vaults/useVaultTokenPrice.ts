import { Vault } from 'pt-client-js'
import { CURRENCY_ID, useCoingeckoTokenPrices } from 'pt-generic-hooks'
import { getTokenPriceFromObject } from 'pt-utilities'
import { useVaultTokenAddress } from '..'

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
  } = useCoingeckoTokenPrices(vault.chainId, !!tokenAddress ? [tokenAddress] : [], [
    currency ?? 'eth'
  ])

  const tokenPrice = !!tokenAddress
    ? getTokenPriceFromObject(
        vault.chainId,
        tokenAddress,
        {
          [vault.chainId]: tokenPrices ?? {}
        },
        currency
      )
    : 0

  const isFetched = isFetchedTokenAddress && isFetchedTokenPrices

  return { tokenPrice, isFetched, refetch }
}
