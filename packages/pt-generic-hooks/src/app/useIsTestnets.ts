import { atom, useAtom } from 'jotai'
import { LOCAL_STORAGE_KEYS } from '../constants/keys'

const getInitialIsTestnets = (): boolean => {
  if (typeof window === 'undefined') return false
  const cachedIsTestnets = localStorage.getItem(LOCAL_STORAGE_KEYS.isTestnets)
  return cachedIsTestnets === 'true'
}

const isTestnetsAtom = atom<boolean>(getInitialIsTestnets())

/**
 * Returns the state of `isTestnetsAtom` as well as methods to toggle it
 *
 * Stores state in local storage
 * @returns
 */
export const useIsTestnets = () => {
  const [isTestnets, setIsTestnets] = useAtom(isTestnetsAtom)

  const enableTestnets = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.isTestnets, 'true')
    setIsTestnets(true)
  }

  const disableTestnets = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.isTestnets, 'false')
    setIsTestnets(false)
  }

  return { isTestnets, enableTestnets, disableTestnets }
}
