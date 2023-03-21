import { atom } from 'jotai'
import { SettingsModalView } from 'pt-components'
import { VaultInfo } from 'pt-types'
import { defaultVaultList } from 'pt-utilities'

/* ============================= Helper Functions ============================= */

const getInitialSelectedVault = (): VaultInfo => {
  return defaultVaultList.tokens[0]
}

/* ================================== Atoms ================================== */

/**
 * Settings modal view
 */
export const settingsModalViewAtom = atom<SettingsModalView>('menu')

/**
 * Selected vault
 */
export const selectedVaultAtom = atom<VaultInfo>(getInitialSelectedVault())
