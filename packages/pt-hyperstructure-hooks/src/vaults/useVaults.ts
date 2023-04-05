import { Vaults } from 'pt-client-js'
import { VaultInfo } from 'pt-types'
import { useProvidersByChain } from '../blockchain/useProviders'

/**
 * Returns an instance of a `Vaults` class
 * @param allVaultInfo array of vaults' info
 * @returns
 */
export const useVaults = (allVaultInfo: VaultInfo[]): Vaults => {
  const providers = useProvidersByChain()

  const vaults = new Vaults(allVaultInfo, providers)

  return vaults
}
