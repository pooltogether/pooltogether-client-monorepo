import { utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { CURRENCY_ID } from 'pt-generic-hooks'
import { TokenWithPrice } from 'pt-types'
import { getAssetsFromShares } from 'pt-utilities'
import { useVaultExchangeRate, useVaultShareData, useVaultTokenPrice } from '..'

/**
 * Returns a vault's share price
 * @param vault instance of the `Vault` class
 * @param currency optional currency (default is 'eth')
 * @returns
 */
export const useVaultSharePrice = (vault: Vault, currency?: CURRENCY_ID) => {
  const { data: shareData, isFetched: isFetchedShareData } = useVaultShareData(vault)

  const {
    data: tokenWithPrice,
    isFetched: isFetchedTokenPrice,
    refetch: refetchTokenPrice
  } = useVaultTokenPrice(vault, currency)
  const tokenPrice = utils.parseEther(tokenWithPrice?.price.toString() ?? '0')

  const {
    data: exchangeRate,
    isFetched: isFetchedExchangeRate,
    refetch: refetchExchangeRate
  } = useVaultExchangeRate(vault)

  const isFetched = isFetchedShareData && isFetchedTokenPrice && isFetchedExchangeRate

  const enabled = isFetched && !!shareData && !!tokenWithPrice && !!exchangeRate

  const sharePrice = enabled
    ? parseFloat(
        utils.formatEther(getAssetsFromShares(tokenPrice, exchangeRate, tokenWithPrice.decimals))
      )
    : undefined

  const data: TokenWithPrice | undefined =
    enabled && sharePrice !== undefined ? { ...shareData, price: sharePrice } : undefined

  const refetch = () => {
    refetchTokenPrice()
    refetchExchangeRate()
  }

  return { data, isFetched, refetch }
}
