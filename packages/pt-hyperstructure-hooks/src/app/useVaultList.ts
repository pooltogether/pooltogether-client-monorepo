import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { NO_REFETCH } from 'pt-generic-hooks'
import { VaultList } from 'pt-types'
import { getVaultList, getVaultListId } from 'pt-utilities'
import { QUERY_KEYS } from '../constants'
import { useCachedVaultLists } from './useCachedVaultLists'
import { useSelectedVaultLists } from './useSelectedVaultLists'

/**
 * Returns a vault list object from a HTTPS URL, IPFS/IPNS hash or ENS domain
 *
 * Caches and selects vault list
 * @param src the source of the vault list
 * @returns
 */
export const useVaultList = (src: string): UseQueryResult<VaultList | undefined, unknown> => {
  const queryKey = [QUERY_KEYS.vaultList, src]

  const { cachedVaultLists, cacheVaultList } = useCachedVaultLists()

  const { selectVaultList } = useSelectedVaultLists()

  return useQuery(queryKey, async () => await getVaultList(src), {
    enabled: !!src,
    ...NO_REFETCH,
    onSuccess: (vaultList) => {
      if (!!vaultList) {
        const vaultListId = getVaultListId(vaultList)
        const cachedVaultListIds = cachedVaultLists.map((vaultList) => getVaultListId(vaultList))
        if (!cachedVaultListIds.includes(vaultListId)) {
          cacheVaultList(vaultList)
          selectVaultList(vaultList)
        }
      }
    }
  })
}
