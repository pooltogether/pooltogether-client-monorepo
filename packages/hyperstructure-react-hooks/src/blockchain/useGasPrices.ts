import { getGasPrices, sToMs } from '@pooltogether/utilities'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'

/**
 * Returns gas prices for a given chain ID
 * @param chainId chain ID to get gas prices for
 * @param refetchInterval optional refetch interval in ms (default is 5000ms)
 * @returns
 */
export const useGasPrices = (chainId: number, refetchInterval?: number) => {
  const enabled = !!chainId

  return useQuery([QUERY_KEYS.gasPrices, chainId], async () => await getGasPrices(chainId), {
    refetchInterval: refetchInterval ?? sToMs(5),
    enabled
  })
}
