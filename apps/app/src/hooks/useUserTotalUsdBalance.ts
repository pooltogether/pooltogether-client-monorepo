import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import {
  useSelectedVaults,
  useUserVaultBalances,
  useVaultExchangeRates
} from 'pt-hyperstructure-hooks'
import { getAssetsFromShares, getTokenPriceFromObject } from 'pt-utilities'
import { useAllCoingeckoTokenPrices } from './useAllCoingeckoTokenPrices'

/**
 * Returns a user's total balance in USD
 * @returns
 */
export const useUserTotalUsdBalance = () => {
  const { address: userAddress } = useAccount()

  const vaults = useSelectedVaults()

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useUserVaultBalances(
    vaults,
    userAddress
  )

  const { data: vaultExchangeRates, isFetched: isFetchedVaultExchangeRates } =
    useVaultExchangeRates(vaults)

  const isFetched = isFetchedTokenPrices && isFetchedVaultBalances && isFetchedVaultExchangeRates

  const enabled = isFetched && !!tokenPrices && !!vaultBalances && !!vaultExchangeRates

  const data = useMemo(() => {
    if (enabled) {
      let totalUsdBalance: number = 0
      for (const vaultId in vaultBalances) {
        const vaultInfo = vaultBalances[vaultId]
        const vaultExchangeRate = vaultExchangeRates[vaultId]

        if (!!vaultExchangeRate) {
          const usdPrice = getTokenPriceFromObject(
            vaultInfo.chainId,
            vaultInfo.extensions.underlyingAsset.address,
            tokenPrices
          )

          const shareBalance = BigNumber.from(vaultInfo.balance)
          const tokenBalance = getAssetsFromShares(
            shareBalance,
            vaultExchangeRate,
            vaultInfo.decimals
          )

          const formattedTokenBalance = utils.formatUnits(tokenBalance, vaultInfo.decimals)
          totalUsdBalance += Number(formattedTokenBalance) * usdPrice
        }
      }
      return totalUsdBalance
    } else {
      return 0
    }
  }, [
    isFetchedTokenPrices,
    tokenPrices,
    isFetchedVaultBalances,
    vaultBalances,
    isFetchedVaultExchangeRates,
    vaultExchangeRates
  ])

  return { data, isFetched }
}
