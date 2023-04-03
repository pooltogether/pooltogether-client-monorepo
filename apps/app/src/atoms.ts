import { atom } from 'jotai'
import { Vault } from 'pt-client-js'
import { SettingsModalView } from 'pt-components'

/* ================================== Atoms ================================== */

/**
 * Settings modal view
 */
export const settingsModalViewAtom = atom<SettingsModalView>('menu')

/**
 * Filtered vaults
 */
export const filteredVaultsAtom = atom<{ [chainId: number]: Vault[] }>({})
