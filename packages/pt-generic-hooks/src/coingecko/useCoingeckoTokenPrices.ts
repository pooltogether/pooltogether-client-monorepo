import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'
import { CoingeckoTokenPrices } from 'pt-types'
import { COINGECKO_PLATFORM, COINGECKO_PLATFORMS, getCoingeckoTokenPrices } from 'pt-utilities'
import { QUERY_KEYS } from '../constants/keys'
import { NO_REFETCH } from '../constants/query'

/**
 * Returns token prices from CoinGecko
 * @param chainId optional currency override (default is ['usd'])
 * @param tokenAddresses token addresses to query prices for
 * @param currencies optional currency override (default is ['usd'])
 * @returns
 */
export const useCoingeckoTokenPrices = (
  chainId: number,
  tokenAddresses: string[],
  currencies?: string[]
): UseQueryResult<CoingeckoTokenPrices, unknown> => {
  const enabled =
    tokenAddresses.every((tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string') &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!chainId &&
    chainId in COINGECKO_PLATFORMS &&
    (currencies === undefined || currencies.length > 0)

  return useQuery(
    [QUERY_KEYS.coingeckoTokenPrices, chainId, tokenAddresses, currencies],
    async () =>
      await getCoingeckoTokenPrices(chainId as COINGECKO_PLATFORM, tokenAddresses, currencies),
    {
      staleTime: Infinity,
      enabled,
      ...NO_REFETCH
    }
  )
}

/**
 * Returns token prices from CoinGecko across many chains
 * @param tokenAddresses token addresses to query prices for, indexed by chain ID
 * @param currencies optional currency override (default is ['usd'])
 * @returns
 */
export const useCoingeckoTokenPricesAcrossChains = (
  tokenAddresses: { [chainId: number]: string[] },
  currencies?: string[]
) => {
  const chainIds = Object.keys(tokenAddresses)
    .map((chainId) => parseInt(chainId))
    .filter((chainId) => chainId in COINGECKO_PLATFORMS)

  const results = useQueries({
    queries: chainIds.map((chainId) => {
      const enabled =
        tokenAddresses[chainId].every(
          (tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string'
        ) &&
        Array.isArray(tokenAddresses[chainId]) &&
        tokenAddresses[chainId].length > 0 &&
        !!chainId &&
        chainId in COINGECKO_PLATFORMS &&
        (currencies === undefined || currencies.length > 0)

      return {
        queryKey: [QUERY_KEYS.coingeckoTokenPrices, chainId, tokenAddresses[chainId], currencies],
        queryFn: async () => {
          const tokenPrices = await getCoingeckoTokenPrices(
            chainId as COINGECKO_PLATFORM,
            tokenAddresses[chainId],
            currencies
          )
          return { chainId, tokenPrices }
        },
        staleTime: Infinity,
        enabled,
        ...NO_REFETCH
      }
    })
  })

  return useMemo(() => {
    const isFetched = results?.every((result) => result.isFetched)
    const refetch = async () => results?.forEach((result) => result.refetch())

    const formattedData: { [chainId: number]: CoingeckoTokenPrices } = {}
    results.forEach((result) => {
      if (result.data) {
        formattedData[result.data.chainId] = result.data.tokenPrices
      }
    })

    return { isFetched, refetch, data: formattedData }
  }, [results])
}
