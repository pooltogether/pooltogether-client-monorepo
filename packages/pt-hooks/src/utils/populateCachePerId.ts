import { QueryClient, QueryKey } from '@tanstack/react-query'

/**
 * Function for populating individual caches when querying for lists of data.
 * Ex. Populating the cache for each token's balance after querying for many.
 * @param queryClient a valid react-query client
 * @param queryKey a key to set cache to
 * @param data the data object retrieved from the original query
 * @returns
 */
export const populateCachePerId = (
  queryClient: QueryClient,
  queryKey: QueryKey,
  data: { [key: string]: any }
) => {
  const ids = Object.keys(data)
  if (ids.length === 1) return

  ids.forEach((id) => {
    const datum = data[id]
    queryClient.setQueryData(queryKey, { [id]: datum })
  })
}
