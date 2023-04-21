import { atom, useAtom } from 'jotai'
import { VaultList } from 'pt-types'
import { LOCAL_STORAGE_KEYS } from '../constants'

const getInitialCachedVaultLists = (): { [id: string]: VaultList } => {
  if (typeof window === 'undefined') return {}
  const cachedVaultLists = localStorage.getItem(LOCAL_STORAGE_KEYS.cachedVaultLists)
  return JSON.parse(cachedVaultLists ?? '{}')
}

const cachedVaultListsAtom = atom<{ [id: string]: VaultList | undefined }>(
  getInitialCachedVaultLists()
)

// TODO: use service worker cache instead of localstorage to store cached vault lists
/**
 * Returns currently cached vault lists
 *
 * Stores state in local storage
 * @returns
 */
export const useCachedVaultLists = () => {
  const [cachedVaultLists, setCachedVaultLists] = useAtom(cachedVaultListsAtom)

  const set = (vaultLists: { [id: string]: VaultList }) => {
    setCachedVaultLists(vaultLists)
    localStorage.setItem(LOCAL_STORAGE_KEYS.cachedVaultLists, JSON.stringify(vaultLists))
  }

  const cache = (id: string, vaultList: VaultList) => {
    const newVaultLists = { ...cachedVaultLists, [id]: vaultList }
    setCachedVaultLists(newVaultLists)
    localStorage.setItem(LOCAL_STORAGE_KEYS.cachedVaultLists, JSON.stringify(newVaultLists))
  }

  const remove = (id: string) => {
    const newVaultLists = { ...cachedVaultLists, [id]: undefined }
    setCachedVaultLists(newVaultLists)
    localStorage.setItem(LOCAL_STORAGE_KEYS.cachedVaultLists, JSON.stringify(newVaultLists))
  }

  const clear = () => {
    setCachedVaultLists({})
    localStorage.removeItem(LOCAL_STORAGE_KEYS.cachedVaultLists)
  }

  return {
    cachedVaultLists,
    set,
    cache,
    remove,
    clear
  }
}
