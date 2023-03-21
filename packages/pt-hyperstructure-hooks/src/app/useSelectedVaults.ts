import { Vaults } from 'pt-client-js'
import { VaultInfo } from 'pt-types'
import { getVaultId } from 'pt-utilities'
import { useProvidersByChain } from '../blockchain/useProviders'
import { useSelectedVaultLists } from './useSelectedVaultLists'

/**
 * Returns an instance of a `Vaults` class with only selected vault lists' vaults
 * @returns
 */
export const useSelectedVaults = (): Vaults => {
  const providers = useProvidersByChain()

  const { selectedVaultLists } = useSelectedVaultLists()

  const selectedVaultInfo: VaultInfo[] = []
  const selectedVaultIds = new Set<string>()

  selectedVaultLists.forEach((vaultList) => {
    vaultList.tokens.forEach((vaultInfo) => {
      const vaultId = getVaultId(vaultInfo)
      if (!selectedVaultIds.has(vaultId)) {
        selectedVaultIds.add(vaultId)
        selectedVaultInfo.push(vaultInfo)
      }
    })
  })

  const selectedVaults = new Vaults(selectedVaultInfo, providers)

  return selectedVaults
}
