import { atom, useAtom } from 'jotai'
import { VaultList } from 'pt-types'
import { LOCAL_STORAGE_KEYS } from '../constants'

const getInitialCachedVaultLists = (): VaultList[] => {
  if (typeof window === 'undefined') return []
  const cachedVaultLists = localStorage.getItem(LOCAL_STORAGE_KEYS.cachedVaultLists)
  if (!!cachedVaultLists) {
    return JSON.parse(cachedVaultLists)
  } else {
    return []
  }
}

const cachedVaultListsAtom = atom<VaultList[]>(getInitialCachedVaultLists())

// TODO: use service worker cache instead of localstorage to store cached vault lists
/**
 * Returns the state of `cachedVaultListsAtom` as well as a method to change it
 *
 * Stores state in local storage
 * @returns
 */
export const useCachedVaultLists = () => {
  const [cachedVaultLists, _setCachedVaultLists] = useAtom(cachedVaultListsAtom)

  const setCachedVaultLists = (vaultLists: VaultList[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.cachedVaultLists, getStrVaultLists(vaultLists))
    _setCachedVaultLists(vaultLists)
  }

  const cacheVaultList = (vaultList: VaultList) => {
    const newVaultLists = [...cachedVaultLists, vaultList]
    localStorage.setItem(LOCAL_STORAGE_KEYS.cachedVaultLists, getStrVaultLists(newVaultLists))
    _setCachedVaultLists(newVaultLists)
  }

  const removeCachedVaultList = (vaultList: VaultList) => {
    const newVaultLists = cachedVaultLists.filter(
      (list) => !(list.name === vaultList.name && list.version === vaultList.version)
    )
    localStorage.setItem(LOCAL_STORAGE_KEYS.cachedVaultLists, getStrVaultLists(newVaultLists))
    _setCachedVaultLists(newVaultLists)
  }

  const clearCachedVaultLists = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.cachedVaultLists)
    _setCachedVaultLists([])
  }

  return {
    cachedVaultLists,
    setCachedVaultLists,
    cacheVaultList,
    removeCachedVaultList,
    clearCachedVaultLists
  }
}

const getStrVaultLists = (vaultLists: VaultList[]) => {
  return vaultLists.map((vaultList) => JSON.stringify(vaultList)).toString()
}
