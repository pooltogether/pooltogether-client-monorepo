import { atom, useAtom } from 'jotai'
import { LOCAL_STORAGE_KEYS } from '../constants'

type VaultListType = 'local' | 'imported'

const getInitialCachedVaultListIds = (type: VaultListType): string[] => {
  if (typeof window === 'undefined') return []
  switch (type) {
    case 'local': {
      const cachedVaultListIds = localStorage.getItem(LOCAL_STORAGE_KEYS.localVaultListIds)
      return JSON.parse(cachedVaultListIds ?? '[]')
    }
    case 'imported': {
      const cachedVaultListIds = localStorage.getItem(LOCAL_STORAGE_KEYS.importedVaultListIds)
      return JSON.parse(cachedVaultListIds ?? '[]')
    }
  }
}

const cachedLocalVaultListIds = atom<string[]>(getInitialCachedVaultListIds('local'))
const cachedImportedVaultListIds = atom<string[]>(getInitialCachedVaultListIds('imported'))

/**
 * Returns currently selected local and imported vault list IDs
 *
 * Stores state in local storage
 * @returns
 */
export const useSelectedVaultListIds = () => {
  const [localIds, setLocalIds] = useAtom(cachedLocalVaultListIds)
  const [importedIds, setImportedIds] = useAtom(cachedImportedVaultListIds)

  const set = (ids: { local?: string[]; imported?: string[] }) => {
    if (!!ids.local) {
      setLocalIds(ids.local)
      localStorage.setItem(LOCAL_STORAGE_KEYS.localVaultListIds, JSON.stringify(ids.local))
    }
    if (!!ids.imported) {
      setImportedIds(ids.imported)
      localStorage.setItem(LOCAL_STORAGE_KEYS.importedVaultListIds, JSON.stringify(ids.imported))
    }
  }

  const select = (id: string, type: VaultListType) => {
    switch (type) {
      case 'local': {
        if (!localIds.includes(id)) {
          const newLocalIds = [...localIds, id]
          setLocalIds(newLocalIds)
          localStorage.setItem(LOCAL_STORAGE_KEYS.localVaultListIds, JSON.stringify(newLocalIds))
        }
      }
      case 'imported': {
        if (!importedIds.includes(id)) {
          const newImportedIds = [...importedIds, id]
          setImportedIds(newImportedIds)
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.importedVaultListIds,
            JSON.stringify(newImportedIds)
          )
        }
      }
    }
  }

  const unselect = (id: string, type: VaultListType) => {
    switch (type) {
      case 'local': {
        const newLocalIds = localIds.filter((localId) => localId !== id)
        setLocalIds(newLocalIds)
        localStorage.setItem(LOCAL_STORAGE_KEYS.localVaultListIds, JSON.stringify(newLocalIds))
      }
      case 'imported': {
        const newImportedIds = importedIds.filter((importedId) => importedId !== id)
        setImportedIds(newImportedIds)
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.importedVaultListIds,
          JSON.stringify(newImportedIds)
        )
      }
    }
  }

  return { localIds, importedIds, set, select, unselect }
}
