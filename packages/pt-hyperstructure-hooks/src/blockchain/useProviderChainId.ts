import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { providers } from 'ethers'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

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

/**
 * Returns multiple provider's chain IDs
 * @param providers an array of providers to get chain IDs from
 * @returns
 */
export const useProviderChainIds = (
  providers: providers.Provider[]
): UseQueryResult<number[], unknown> => {
  const enabled = providers.every((provider) => provider._isProvider)

  const queryKey = [QUERY_KEYS.providerChainId, providers]

  return useQuery(
    queryKey,
    async () =>
      await Promise.all(
        providers.map(async (provider) => {
          return (await provider.getNetwork())?.chainId
        })
      ),
    {
      enabled,
      ...NO_REFETCH
    }
  )
}
