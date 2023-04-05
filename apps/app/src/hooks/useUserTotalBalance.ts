import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import {
  useAllUserVaultBalances,
  useAllVaultExchangeRates,
  useSelectedVaults
} from 'pt-hyperstructure-hooks'
import { getAssetsFromShares, getTokenPriceFromObject } from 'pt-utilities'
import { useAllTokenPrices } from './useAllTokenPrices'

/**
 * Returns a user's total balance in ETH
 * @returns
 */
export const useUserTotalBalance = () => {
  const { address: userAddress } = useAccount()

  const { vaults, isFetched: isFetchedVaultData } = useSelectedVaults()

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllTokenPrices()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useAllUserVaultBalances(
    vaults,
    userAddress
  )

  const { data: vaultExchangeRates, isFetched: isFetchedVaultExchangeRates } =
    useAllVaultExchangeRates(vaults)

  const isFetched =
    isFetchedVaultData &&
    isFetchedTokenPrices &&
    isFetchedVaultBalances &&
    isFetchedVaultExchangeRates &&
    !!tokenPrices &&
    !!vaultBalances &&
    !!vaultExchangeRates &&
    !!vaults.underlyingTokenAddresses

  const data = useMemo(() => {
    if (isFetched) {
      let totalBalance: number = 0
      for (const vaultId in vaultBalances) {
        if (!isNaN(vaultBalances[vaultId].decimals)) {
          const vaultExchangeRate = vaultExchangeRates[vaultId]

          if (!!vaultExchangeRate) {
            const tokenPrice = getTokenPriceFromObject(
              vaultBalances[vaultId].chainId,
              vaults.underlyingTokenAddresses.byVault[vaultId],
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
            totalBalance += Number(formattedTokenBalance) * tokenPrice
          }
        }
      }
      return totalBalance
    } else {
      return 0
    }
  }, [
    isFetchedVaultData,
    isFetchedTokenPrices,
    tokenPrices,
    isFetchedVaultBalances,
    vaultBalances,
    isFetchedVaultExchangeRates,
    vaultExchangeRates,
    vaults
  ])

  return { data, isFetched }
}
