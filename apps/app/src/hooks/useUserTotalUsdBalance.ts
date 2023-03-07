import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useUserVaultBalances, useVaultShareMultipliers } from 'pt-hooks'
import { VaultInfoWithBalance } from 'pt-types'
import defaultVaultList from '@constants/defaultVaultList'
import { useAllCoingeckoTokenPrices } from './useAllCoingeckoTokenPrices'
import { useProviders } from './useProviders'

/**
 * Returns a user's total balance in USD
 * @returns
 */
export const useUserTotalUsdBalance = () => {
  const { address: userAddress } = useAccount()

  const providers = useProviders()

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()

  // const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useUserVaultBalances(
  //   providers,
  //   userAddress,
  //   defaultVaultList
  // )

  // const {data: vaultMultipliers, isFetched: isFetchedVaultMultipliers} = useVaultShareMultipliers(providers, defaultVaultList)

  // TODO: remove and uncomment hooks above once vaults are setup
  const vaultMultipliers: { [vaultId: string]: BigNumber } = {
    '0x4200000000000000000000000000000000000006-10': BigNumber.from('2')
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
  const isFetchedVaultMultipliers: boolean = true

  const isFetched = isFetchedTokenPrices && isFetchedVaultBalances && isFetchedVaultMultipliers

  const enabled = isFetched && !!tokenPrices && !!vaultBalances && !!vaultMultipliers

  const data = useMemo(() => {
    if (enabled) {
      let totalUsdBalance: number = 0
      for (const vaultId in vaultBalances) {
        const vaultInfo = vaultBalances[vaultId]
        const vaultMultiplier = vaultMultipliers[vaultId]

        if (!!vaultMultiplier) {
          const usdPrice =
            tokenPrices[vaultInfo.chainId][
              vaultInfo.extensions.underlyingAsset.address.toLowerCase()
            ]?.['usd'] ?? 0

          const shareBalance = BigNumber.from(vaultInfo.balance)
          const tokenBalance = shareBalance.mul(vaultMultiplier)

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
    isFetchedVaultMultipliers,
    vaultMultipliers
  ])

  return { data, isFetched }
}
