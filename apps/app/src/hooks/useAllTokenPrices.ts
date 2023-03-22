import {
  useCoingeckoSimpleTokenPrices,
  useCoingeckoTokenPricesAcrossChains
} from 'pt-generic-hooks'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { CoingeckoTokenPrices } from 'pt-types'
import { getVaultUnderlyingTokenAddresses, NETWORK, POOL_TOKEN_ADDRESSES } from 'pt-utilities'

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

  const { allVaultInfo } = useSelectedVaults()

  const tokenAddresses = getVaultUnderlyingTokenAddresses(allVaultInfo)

  // Adding POOL token addresses:
  if (tokenAddresses[NETWORK.mainnet] === undefined) {
    tokenAddresses[NETWORK.mainnet] = [POOL_TOKEN_ADDRESSES[NETWORK.mainnet]]
  } else if (!tokenAddresses[NETWORK.mainnet].includes(POOL_TOKEN_ADDRESSES[NETWORK.mainnet])) {
    tokenAddresses[NETWORK.mainnet].push(POOL_TOKEN_ADDRESSES[NETWORK.mainnet])
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
      '0x56159f593155E3079A2d0Ae253e97C703dBe54A8': { usd: 0.99 },
      '0x346ca12Ac254b843879733b17c6ed3d9c53333f0': { usd: 1.0 },
      '0xD13905EF313F0F8cd0855E25c566354A2b7b9780': { usd: 1.01 },
      '0xF33e8157569e09a9090E058b0a6D685d394258ed': { usd: 27_624.85 },
      '0x0a30769C05876521B79d61669513129aBeeF5B84': { usd: 1_751.11 }
    }
  }

  const isFetched = isFetchedCoingeckoSimpleTokenPrices && isFetchedCoingeckoTokenPrices

  const refetch = async () => {
    await Promise.all([refetchCoingeckoSimpleTokenPrices(), refetchCoingeckoTokenPrices()])
  }

  return { data, isFetched, refetch }
}
