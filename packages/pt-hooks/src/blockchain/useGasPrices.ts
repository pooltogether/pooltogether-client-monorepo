import { getGasPrices, sToMs } from 'pt-utilities'
import { useQuery } from 'react-query'
import { QUERY_KEYS } from '../constants'

/**
 * Returns gas prices for a given chain ID
 * @param chainId chain ID to get gas prices for
 * @param refetchInterval optional refetch interval in ms (default is 5000ms)
 * @returns
 */
export const useGasPrices = (chainId: number, refetchInterval?: number) => {
  const enabled = !!chainId

  return useQuery([QUERY_KEYS.gasPrices, chainId], async () => getGasPrices(chainId), {
    refetchInterval: refetchInterval ?? sToMs(5),
    enabled
  })
}