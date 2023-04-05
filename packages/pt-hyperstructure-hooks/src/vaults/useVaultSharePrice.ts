import { BigNumber } from 'ethers'
import { Vault } from 'pt-client-js'
import { CURRENCY_ID } from 'pt-generic-hooks'
import { getAssetsFromShares } from 'pt-utilities'
import { useVaultExchangeRate, useVaultTokenPrice } from '..'

/**
 * Returns a vault's share price
 * @param vault instance of the `Vault` class
 * @param currency optional currency (default is 'eth')
 * @returns
 */
export const useVaultSharePrice = (vault: Vault, currency?: CURRENCY_ID) => {
  const {
    tokenPrice,
    isFetched: isFetchedTokenPrice,
    refetch: refetchTokenPrice
  } = useVaultTokenPrice(vault, currency)

  const {
    data: exchangeRate,
    isFetched: isFetchedExchangeRate,
    refetch: refetchExchangeRate
  } = useVaultExchangeRate(vault)

  const sharePrice =
    !!exchangeRate && vault.decimals !== undefined
      ? getAssetsFromShares(
          BigNumber.from(Math.round(tokenPrice * 1000)),
          exchangeRate,
          vault.decimals
        ).toNumber() / 1000
      : 0

  const isFetched = isFetchedTokenPrice && isFetchedExchangeRate

  const refetch = () => {
    refetchTokenPrice()
    refetchExchangeRate()
  }

  return { sharePrice, isFetched, refetch }
}
