import { useQuery, UseQueryResult } from 'react-query'
import { NO_REFETCH, QUERY_KEYS } from '../constants'
import { providers } from 'ethers'

/**
 * Returns a provider's chain ID
 * @param provider a provider to get the chain ID from
 * @returns
 */
export const useProviderChainId = (
  provider: providers.Provider
): UseQueryResult<number, unknown> => {
  const enabled = provider._isProvider

  const queryKey = [QUERY_KEYS.providerChainId, provider]

  return useQuery(queryKey, async () => (await provider.getNetwork())?.chainId, {
    enabled,
    ...NO_REFETCH
  })
}
