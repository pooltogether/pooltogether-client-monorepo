import { atom, useAtom } from 'jotai'
import { VaultList } from 'pt-types'
import { defaultVaultList, defaultVaultListId, getVaultListId } from 'pt-utilities'
import { LOCAL_STORAGE_KEYS } from '../constants'

const getSelectedAndCachedVaultLists = (selectedIds: string[]) => {
  const selectedAndCachedVaultLists: VaultList[] = []

  // Adding default vault list (also bumping version if necessary):
  const defaultVaultListName = defaultVaultListId.split('-').slice(0, -1).join('-')
  const defaultVaultListVersion = defaultVaultListId.split('-').slice(-1)[0]
  const foundIndex = selectedIds.findIndex((id) => id.startsWith(defaultVaultListName))
  if (foundIndex !== -1) {
    if (
      selectedIds[foundIndex].split('-')[selectedIds[foundIndex].length - 1] !==
      defaultVaultListVersion
    ) {
      selectedIds[foundIndex] = defaultVaultListId
      localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultListIds, selectedIds.toString())
    }
    selectedAndCachedVaultLists.push(defaultVaultList)
  }

  // Adding other cached vault lists:
  const cachedVaultLists = localStorage.getItem(LOCAL_STORAGE_KEYS.cachedVaultLists)
  if (!!cachedVaultLists) {
    cachedVaultLists.split(',').forEach((strVaultList) => {
      const vaultList: VaultList = JSON.parse(strVaultList)
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
    return getSelectedAndCachedVaultLists(cachedSelectedVaultListIds.split(','))
  } else {
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultListIds, defaultVaultListId)
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
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultListIds, ids.toString())
    _setSelectedVaultLists(vaultLists)
  }

  const addVaultList = (vaultList: VaultList) => {
    const newVaultLists = [...selectedVaultLists, vaultList]
    const ids = newVaultLists.map((list) => getVaultListId(list))
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultListIds, ids.toString())
    _setSelectedVaultLists(newVaultLists)
  }

  const removeVaultList = (vaultList: VaultList) => {
    const newVaultLists = selectedVaultLists.filter(
      (list) => !(list.name === vaultList.name && list.version === vaultList.version)
    )
    const ids = newVaultLists.map((list) => getVaultListId(list))
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultListIds, ids.toString())
    _setSelectedVaultLists(newVaultLists)
  }

  return {
    selectedVaultLists,
    selectedVaultListIds,
    setSelectedVaultLists,
    addVaultList,
    removeVaultList
  }
}
