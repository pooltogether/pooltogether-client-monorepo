import {
  useCoingeckoSimpleTokenPrices,
  useCoingeckoTokenPricesAcrossChains
} from 'pt-generic-hooks'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { CoingeckoTokenPrices } from 'pt-types'
import { NETWORK } from 'pt-utilities'
import { PRIZE_POOLS } from '@constants/config'

/**
 * Returns token prices for all vaults' underlying tokens
 * @param currencies optional currencies array (default is ['eth'])
 * @returns
 */
export const useAllTokenPrices = () => {
  const {
    data: coingeckoSimpleTokenPrices,
    isFetched: isFetchedCoingeckoSimpleTokenPrices,
    refetch: refetchCoingeckoSimpleTokenPrices
  } = useCoingeckoSimpleTokenPrices()

  const { vaults, isFetched: isFetchedVaultData } = useSelectedVaults()

  const tokenAddresses: { [chainId: number]: `0x${string}`[] } = {}

  // Adding vault token addresses:
  if (!!vaults.underlyingTokenAddresses) {
    Object.assign(tokenAddresses, vaults.underlyingTokenAddresses.byChain)
  }

  // Adding prize token addresses:
  if (!!vaults.underlyingTokenAddresses) {
    Object.entries(PRIZE_POOLS).forEach((prizePool) => {
      const chainId = parseInt(prizePool[0])
      const prizeTokenAddress = prizePool[1].prizeTokenAddress as `0x${string}`
      if (tokenAddresses[chainId] === undefined) {
        tokenAddresses[chainId] = [prizeTokenAddress]
      } else if (!tokenAddresses[chainId].includes(prizeTokenAddress)) {
        tokenAddresses[chainId].push(prizeTokenAddress)
      }
    })
  }

  const {
    data: coingeckoTokenPrices,
    isFetched: isFetchedCoingeckoTokenPrices,
    refetch: refetchCoingeckoTokenPrices
  } = useCoingeckoTokenPricesAcrossChains(tokenAddresses)

  // TODO: get token prices on-chain (those missing from coingecko)

  const data: { simple: CoingeckoTokenPrices; [chainId: number]: CoingeckoTokenPrices } = {
    simple: coingeckoSimpleTokenPrices,
    ...coingeckoTokenPrices,
    [NETWORK.goerli]: {
      '0xb49f1bbd905a7a869dd50c1df7d42e7907bce7b4': { eth: 0.00052801 }, // DAI
      '0xa07af90b215b4edccabc99dd45cca6d1127790ec': { eth: 0.00052801 }, // USDC
      '0x0ea26b1023ace3dcbbc2a11343b7a188bc4b5b9c': { eth: 0.00052801 }, // GUSD
      '0x50f7638aae955ec17d1173d8aaca69923923afc6': { eth: 14.764395 }, // WBTC
      '0xe322f82175964b8dfaebac6c448442a176eef492': { eth: 0.99929941 }, // WETH
      '0xc26ef73d0cdf27d5f184df3e05ac6e2f490ccedf': { eth: 0.00052918 } // POOL
    }
  }

  const isFetched =
    isFetchedCoingeckoSimpleTokenPrices && isFetchedVaultData && isFetchedCoingeckoTokenPrices

  const refetch = async () => {
    await Promise.all([refetchCoingeckoSimpleTokenPrices(), refetchCoingeckoTokenPrices()])
  }

  return { data, isFetched, refetch }
}
