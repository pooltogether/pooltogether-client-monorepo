import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useUserVaultBalances, useVaultExchangeRates, useVaults } from 'pt-hyperstructure-hooks'
import { VaultInfoWithBalance } from 'pt-types'
import { getAssetsFromShares, getTokenPriceFromObject } from 'pt-utilities'
import defaultVaultList from '@constants/defaultVaultList'
import { useAllCoingeckoTokenPrices } from './useAllCoingeckoTokenPrices'

/**
 * Returns a user's total balance in USD
 * @returns
 */
export const useUserTotalUsdBalance = () => {
  const { address: userAddress } = useAccount()

  const vaults = useVaults(defaultVaultList)

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()

  // const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useUserVaultBalances(
  //   vaults,
  //   userAddress
  // )

  // const { data: vaultExchangeRates, isFetched: isFetchedVaultExchangeRates } =
  //   useVaultExchangeRates(vaults)

  // TODO: remove and uncomment hooks above once vaults are setup
  const vaultExchangeRates: { [vaultId: string]: BigNumber } = {
    '0x4200000000000000000000000000000000000006-10': utils.parseUnits('2', 18)
  }
  const vaultBalances: { [vaultId: string]: VaultInfoWithBalance } = {
    '0x4200000000000000000000000000000000000006-10': {
      chainId: 10,
      address: '0x4200000000000000000000000000000000000006',
      name: 'WETH Vault',
      decimals: 18,
      symbol: 'ptaWETH',
      logoURI: 'https://optimistic.etherscan.io/token/images/weth_28.png',
      extensions: {
        yieldSource: 'Aave',
        underlyingAsset: {
          chainId: 10,
          address: '0x4200000000000000000000000000000000000006',
          symbol: 'WETH',
          name: 'Wrapped Ether',
          decimals: '18',
          logoURI: 'https://optimistic.etherscan.io/token/images/weth_28.png'
        }
      },
      balance: '12345678909876543210'
    }
  }
  const isFetchedVaultBalances: boolean = true
  const isFetchedVaultExchangeRates: boolean = true

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
