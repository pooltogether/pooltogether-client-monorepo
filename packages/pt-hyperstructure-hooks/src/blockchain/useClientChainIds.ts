import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PublicClient, WalletClient } from 'viem'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns multiple client's chain IDs
 * @param clients an array of Viem clients to get chain IDs from
 * @returns
 */
export const useClientChainIds = (
  clients: (PublicClient | WalletClient)[]
): UseQueryResult<number[], unknown> => {
  const queryKey = [QUERY_KEYS.providerChainId, clients.map((client) => client.key)]

  return useQuery(
    queryKey,
    async () =>
      await Promise.all(
        clients.map(async (client) => {
          return await client.getChainId()
        })
      ),
    {
      ...NO_REFETCH
    }
  )
}
