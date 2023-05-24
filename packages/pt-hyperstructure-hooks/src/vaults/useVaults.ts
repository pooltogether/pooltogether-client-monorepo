import { Vaults } from 'pt-client-js'
import { VaultInfo } from 'pt-types'
import { usePublicClientsByChain } from '..'

/**
 * Returns an instance of a `Vaults` class
 * @param allVaultInfo array of vaults' info
 * @returns
 */
export const useVaults = (allVaultInfo: VaultInfo[]): Vaults => {
  const publicClients = usePublicClientsByChain()

  const vaults = new Vaults(allVaultInfo, publicClients)

  return vaults
}
