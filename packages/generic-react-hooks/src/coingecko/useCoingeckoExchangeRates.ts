import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { CoingeckoExchangeRates } from 'types'
import { getCoingeckoExchangeRates } from 'utilities'
import { QUERY_KEYS } from '../constants/keys'
import { NO_REFETCH } from '../constants/query'

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
