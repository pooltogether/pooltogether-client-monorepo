import { QueryClient } from 'react-query'

/**
 * Generic function for populating individual caches
 * when querying for lists of data.
 * Ex. Populating the cache for a user's token balances for indiviudal
 * tokens after querying for a list of tokens.
 * @param queryClient
 * @param getCacheKey
 * @param data
 * @returns
 */
export const populateCachePerId = (
  queryClient: QueryClient,
  cacheKey: (string | number | (string | number)[])[],
  data: object
) => {
  const ids = Object.keys(data)
  if (ids.length === 1) return

  ids.forEach((id) => {
    // @ts-ignore
    const datum = data[id]
    queryClient.setQueryData(cacheKey, { [id]: datum })
  })
}
