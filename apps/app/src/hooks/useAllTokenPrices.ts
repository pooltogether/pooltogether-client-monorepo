import {
  useCoingeckoSimpleTokenPrices,
  useCoingeckoTokenPricesAcrossChains
} from 'pt-generic-hooks'
import { useSelectedVaults, useVaultTokenAddresses } from 'pt-hyperstructure-hooks'
import { CoingeckoTokenPrices } from 'pt-types'
import { NETWORK, POOL_TOKEN_ADDRESSES } from 'pt-utilities'

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

  const vaults = useSelectedVaults()

  const {
    data: { byChain: tokenAddresses }
  } = useVaultTokenAddresses(vaults)

  // Adding POOL token addresses:
  if (!!tokenAddresses) {
    if (tokenAddresses[NETWORK.mainnet] === undefined) {
      tokenAddresses[NETWORK.mainnet] = [POOL_TOKEN_ADDRESSES[NETWORK.mainnet]]
    } else if (!tokenAddresses[NETWORK.mainnet].includes(POOL_TOKEN_ADDRESSES[NETWORK.mainnet])) {
      tokenAddresses[NETWORK.mainnet].push(POOL_TOKEN_ADDRESSES[NETWORK.mainnet])
    }
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
      '0x56159f593155e3079a2d0ae253e97c703dbe54a8': { usd: 0.995 },
      '0x346ca12ac254b843879733b17c6ed3d9c53333f0': { usd: 1 },
      '0xd13905ef313f0f8cd0855e25c566354a2b7b9780': { usd: 1.005 },
      '0xf33e8157569e09a9090e058b0a6d685d394258ed': { usd: 27_624.85 },
      '0x0a30769c05876521b79d61669513129abeef5b84': { usd: 1_751.11 },
      '0xfff6e20deb5cc0e66bc697eb779f7a884ecfab5d': { usd: 1.03 }
    }
  }

  const isFetched = isFetchedCoingeckoSimpleTokenPrices && isFetchedCoingeckoTokenPrices

  const refetch = async () => {
    await Promise.all([refetchCoingeckoSimpleTokenPrices(), refetchCoingeckoTokenPrices()])
  }

  return { data, isFetched, refetch }
}
