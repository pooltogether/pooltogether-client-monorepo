import { atom, useAtom } from 'jotai'
import { defaultVaultListId, LOCAL_STORAGE_KEYS } from '../constants'

const getInitialSelectedVaultLists = (): string[] => {
  if (typeof window === 'undefined') return [defaultVaultListId]
  const cachedSelectedVaultLists = localStorage.getItem(LOCAL_STORAGE_KEYS.selectedVaultLists)
  if (!!cachedSelectedVaultLists) {
    return cachedSelectedVaultLists.split(',')
  } else {
    return [defaultVaultListId]
  }
}

const selectedVaultListsAtom = atom<string[]>(getInitialSelectedVaultLists())

/**
 * Returns the state of `selectedVaultListsAtom` as well as a method to change it
 *
 * Stores state in local storage
 * @returns
 */
export const useSelectedVaultLists = () => {
  const [selectedVaultLists, _setSelectedVaultLists] = useAtom(selectedVaultListsAtom)

  const setSelectedVaultLists = (vaultListIds: string[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultLists, vaultListIds.toString())
    _setSelectedVaultLists(vaultListIds)
  }

  const addVaultList = (vaultListId: string) => {
    const newVaultLists = [...selectedVaultLists, vaultListId]
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultLists, newVaultLists.toString())
    _setSelectedVaultLists(newVaultLists)
  }

  const removeVaultList = (vaultListId: string) => {
    const newVaultLists = selectedVaultLists.filter((id) => id !== vaultListId)
    localStorage.setItem(LOCAL_STORAGE_KEYS.selectedVaultLists, newVaultLists.toString())
    _setSelectedVaultLists(newVaultLists)
  }

  return { selectedVaultLists, setSelectedVaultLists, addVaultList, removeVaultList }
}
