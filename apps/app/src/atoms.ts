import { atom } from 'jotai'
import { SettingsModalView } from 'pt-components'
import { defaultVaultList, getVaultId } from 'pt-utilities'

/* ============================= Helper Functions ============================= */

const getInitialSelectedVaultId = (): string => {
  return getVaultId(defaultVaultList.tokens[0])
}

/* ================================== Atoms ================================== */

/**
 * Settings modal view
 */
export const settingsModalViewAtom = atom<SettingsModalView>('menu')

/**
 * Selected vault
 */
export const selectedVaultIdAtom = atom<string>(getInitialSelectedVaultId())
