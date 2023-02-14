import { CoingeckoExchangeRates } from 'pt-types'
import { getCoingeckoExchangeRates } from 'pt-utilities'
import { useQuery, UseQueryResult } from 'react-query'
import { NO_REFETCH, QUERY_KEYS } from '../constants'

/**
 * Returns exchange rates from CoinGecko
 * @returns
 */
export const useCoingeckoExchangeRates = (): UseQueryResult<CoingeckoExchangeRates, unknown> => {
  return useQuery(
    [QUERY_KEYS.coingeckoExchangeRates],
    async () => await getCoingeckoExchangeRates(),
    {
      staleTime: Infinity,
      enabled: true,
      ...NO_REFETCH
    }
  )
}
