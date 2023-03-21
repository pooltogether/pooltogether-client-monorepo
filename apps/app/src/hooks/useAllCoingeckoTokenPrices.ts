import {
  useCoingeckoSimpleTokenPrices,
  useCoingeckoTokenPricesAcrossChains
} from 'pt-generic-hooks'
import { CoingeckoTokenPrices } from 'pt-types'
import { getVaultUnderlyingTokenAddresses, NETWORK, POOL_TOKEN_ADDRESSES } from 'pt-utilities'
import defaultVaultList from '@constants/defaultVaultList'

/**
 * Returns token prices from CoinGecko for all mainnet tokens from a vault list
 * @param currencies optional currencies array (default is ['usd'])
 * @returns
 */
export const useAllCoingeckoTokenPrices = (currencies: string[] = ['usd']) => {
  const {
    data: coingeckoSimpleTokenPrices,
    isFetched: isFetchedCoingeckoSimpleTokenPrices,
    refetch: refetchCoingeckoSimpleTokenPrices
  } = useCoingeckoSimpleTokenPrices(currencies)

  const tokenAddresses = getVaultUnderlyingTokenAddresses(defaultVaultList.tokens)

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

  const data: { simple: CoingeckoTokenPrices; [chainId: number]: CoingeckoTokenPrices } = {
    simple: coingeckoSimpleTokenPrices,
    ...coingeckoTokenPrices
  }

  const isFetched = isFetchedCoingeckoSimpleTokenPrices && isFetchedCoingeckoTokenPrices

  const refetch = async () => {
    await Promise.all([refetchCoingeckoSimpleTokenPrices(), refetchCoingeckoTokenPrices()])
  }

  return { data, isFetched, refetch }
}
