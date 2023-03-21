import { atom } from 'jotai'
import { SettingsModalView } from 'pt-components'
import { defaultVaultList } from 'pt-hyperstructure-hooks'
import { VaultInfo } from 'pt-types'

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
