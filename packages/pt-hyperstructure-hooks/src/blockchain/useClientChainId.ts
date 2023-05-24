import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PublicClient, WalletClient } from 'viem'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a client's chain ID
 * @param client a Viem client to get the chain ID from
 * @returns
 */
export const useClientChainId = (
  client: PublicClient | WalletClient
): UseQueryResult<number, unknown> => {
  const queryKey = [QUERY_KEYS.clientChainId, client.key]

  return useQuery(queryKey, async () => await client.getChainId(), {
    ...NO_REFETCH
  })
}
