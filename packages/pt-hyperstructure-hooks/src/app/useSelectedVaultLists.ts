import { atom, useAtom } from 'jotai'
import { VaultList } from 'pt-types'
import { DEFAULT_VAULT_LIST_ID, defaultVaultList, getVaultListId } from 'pt-utilities'
import { LOCAL_STORAGE_KEYS } from '../constants'

const getSelectedAndCachedVaultLists = (selectedIds: string[]) => {
  const selectedAndCachedVaultLists: VaultList[] = []

  // Bumping default vault list version if necessary:
  const defaultVaultListName = DEFAULT_VAULT_LIST_ID.split('-').slice(0, -1).join('-')
  const defaultVaultListVersion = DEFAULT_VAULT_LIST_ID.split('-').slice(-1)[0]
  const foundIndex = selectedIds.findIndex((id) => id.startsWith(defaultVaultListName))
  if (foundIndex !== -1) {
    const foundVersion = selectedIds[foundIndex].split('-').slice(-1)[0]
    if (foundVersion !== defaultVaultListVersion) {
      selectedIds[foundIndex] = DEFAULT_VAULT_LIST_ID
      localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultListIds, JSON.stringify(selectedIds))
    }
    selectedAndCachedVaultLists.push(defaultVaultList)
  }

  // Adding other cached vault lists:
  const cachedVaultLists = localStorage.getItem(LOCAL_STORAGE_KEYS.cachedVaultLists)
  if (!!cachedVaultLists) {
    const vaultLists: VaultList[] = JSON.parse(cachedVaultLists)
    vaultLists.forEach((vaultList) => {
      const vaultListId = getVaultListId(vaultList)
      if (selectedIds.includes(vaultListId)) {
        selectedAndCachedVaultLists.push(vaultList)
      }
    })
  }

  return selectedAndCachedVaultLists
}

const getInitialSelectedVaultLists = (): VaultList[] => {
  if (typeof window === 'undefined') return [defaultVaultList]
  const cachedSelectedVaultListIds = localStorage.getItem(LOCAL_STORAGE_KEYS.selectedVaultListIds)
  if (!!cachedSelectedVaultListIds) {
    const selectedIds: string[] = JSON.parse(cachedSelectedVaultListIds)
    return getSelectedAndCachedVaultLists(selectedIds)
  } else {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.selectedVaultListIds,
      JSON.stringify([DEFAULT_VAULT_LIST_ID])
    )
    return [defaultVaultList]
  }
}

const selectedVaultListsAtom = atom<VaultList[]>(getInitialSelectedVaultLists())

/**
 * Returns the state of `selectedVaultListsAtom` as well as a method to change it
 *
 * Stores IDs in local storage
 * @returns
 */
export const useSelectedVaultLists = () => {
  const [selectedVaultLists, _setSelectedVaultLists] = useAtom(selectedVaultListsAtom)

  const selectedVaultListIds = selectedVaultLists.map((list) => getVaultListId(list))

  const setSelectedVaultLists = (vaultLists: VaultList[]) => {
    const ids = vaultLists.map((list) => getVaultListId(list))
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultListIds, JSON.stringify(ids))
    _setSelectedVaultLists(vaultLists)
  }

  const selectVaultList = (vaultList: VaultList) => {
    const newVaultLists = [...selectedVaultLists, vaultList]
    const ids = newVaultLists.map((list) => getVaultListId(list))
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultListIds, JSON.stringify(ids))
    _setSelectedVaultLists(newVaultLists)
  }

  const unselectVaultList = (vaultList: VaultList) => {
    const vaultListId = getVaultListId(vaultList)
    const newVaultLists = selectedVaultLists.filter((list) => getVaultListId(list) !== vaultListId)
    const ids = newVaultLists.map((list) => getVaultListId(list))
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultListIds, JSON.stringify(ids))
    _setSelectedVaultLists(newVaultLists)
  }

  return {
    selectedVaultLists,
    selectedVaultListIds,
    setSelectedVaultLists,
    selectVaultList,
    unselectVaultList
  }
}
