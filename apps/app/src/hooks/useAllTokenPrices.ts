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
 * @param currencies optional currencies array (default is ['usd'])
 * @returns
 */
export const useAllTokenPrices = (currencies: string[] = ['usd']) => {
  const {
    data: coingeckoSimpleTokenPrices,
    isFetched: isFetchedCoingeckoSimpleTokenPrices,
    refetch: refetchCoingeckoSimpleTokenPrices
  } = useCoingeckoSimpleTokenPrices(currencies)

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
  } = useCoingeckoTokenPricesAcrossChains(tokenAddresses, currencies)

  // TODO: get token prices on-chain (those missing from coingecko)

  const data: { simple: CoingeckoTokenPrices; [chainId: number]: CoingeckoTokenPrices } = {
    simple: coingeckoSimpleTokenPrices,
    ...coingeckoTokenPrices,
    [NETWORK.goerli]: {
      '0xb49f1bbd905a7a869dd50c1df7d42e7907bce7b4': { usd: 0.995 }, // DAI
      '0xa07af90b215b4edccabc99dd45cca6d1127790ec': { usd: 1 }, // USDC
      '0x0ea26b1023ace3dcbbc2a11343b7a188bc4b5b9c': { usd: 1.005 }, // GUSD
      '0x50f7638aae955ec17d1173d8aaca69923923afc6': { usd: 27_624.85 }, // WBTC
      '0xe322f82175964b8dfaebac6c448442a176eef492': { usd: 1_751.11 }, // WETH
      '0xc26ef73d0cdf27d5f184df3e05ac6e2f490ccedf': { usd: 1.03 } // POOL
    }
  }

  const isFetched =
    isFetchedCoingeckoSimpleTokenPrices && isFetchedVaultData && isFetchedCoingeckoTokenPrices

  const refetch = async () => {
    await Promise.all([refetchCoingeckoSimpleTokenPrices(), refetchCoingeckoTokenPrices()])
  }

  return { data, isFetched, refetch }
}
