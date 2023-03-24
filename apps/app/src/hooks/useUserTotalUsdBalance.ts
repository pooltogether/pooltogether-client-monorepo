import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import {
  useSelectedVaults,
  useUserVaultBalances,
  useVaultExchangeRates,
  useVaultTokenAddresses
} from 'pt-hyperstructure-hooks'
import { getAssetsFromShares, getTokenPriceFromObject } from 'pt-utilities'
import { useAllTokenPrices } from './useAllTokenPrices'

/**
 * Returns a user's total balance in USD
 * @returns
 */
export const useUserTotalUsdBalance = () => {
  const { address: userAddress } = useAccount()

  const vaults = useSelectedVaults()

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllTokenPrices()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useUserVaultBalances(
    vaults,
    userAddress
  )

  const { data: vaultExchangeRates, isFetched: isFetchedVaultExchangeRates } =
    useVaultExchangeRates(vaults)

  const {
    data: { byVault: vaultTokenAddresses }
  } = useVaultTokenAddresses(vaults)

  const isFetched = isFetchedTokenPrices && isFetchedVaultBalances && isFetchedVaultExchangeRates

  const enabled = isFetched && !!tokenPrices && !!vaultBalances && !!vaultExchangeRates

  const data = useMemo(() => {
    if (enabled) {
      let totalUsdBalance: number = 0
      for (const vaultId in vaultBalances) {
        const vaultExchangeRate = vaultExchangeRates[vaultId]

        if (!!vaultExchangeRate) {
          const usdPrice = getTokenPriceFromObject(
            vaultBalances[vaultId].chainId,
            vaultTokenAddresses[vaultId],
            tokenPrices
          )

          const shareBalance = BigNumber.from(vaultBalances[vaultId].balance)
          const tokenBalance = getAssetsFromShares(
            shareBalance,
            vaultExchangeRate,
            vaultBalances[vaultId].decimals
          )

          const formattedTokenBalance = utils.formatUnits(
            tokenBalance,
            vaultBalances[vaultId].decimals
          )
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
