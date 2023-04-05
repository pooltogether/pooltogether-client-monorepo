import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { CoingeckoTokenPrices } from 'pt-types'
import { getCoingeckoSimpleTokenPrices } from 'pt-utilities'
import { QUERY_KEYS } from '../constants/keys'
import { NO_REFETCH } from '../constants/query'

/**
 * Returns native token prices from CoinGecko
 * @param currencies optional currency override (default is ['eth'])
 * @returns
 */
export const useCoingeckoSimpleTokenPrices = (
  currencies?: string[]
): UseQueryResult<CoingeckoTokenPrices, unknown> => {
  const enabled = currencies === undefined || currencies.length > 0

  return useQuery(
    [QUERY_KEYS.coingeckoSimpleTokenPrices, currencies],
    async () => await getCoingeckoSimpleTokenPrices(currencies),
    {
      staleTime: Infinity,
      enabled,
      ...NO_REFETCH
    }
  )
}
