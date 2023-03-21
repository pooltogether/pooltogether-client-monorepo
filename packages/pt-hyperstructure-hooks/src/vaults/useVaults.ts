import { useProvider } from 'wagmi'
import { Vault, Vaults } from 'pt-client-js'
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

/**
 * Returns an instance of a `Vault` class
 * @param vaultInfo a vault's info
 * @returns
 */
export const useVault = (vaultInfo: VaultInfo): Vault => {
  const provider = useProvider({ chainId: vaultInfo.chainId })

  return new Vault(
    vaultInfo.chainId,
    vaultInfo.address,
    vaultInfo.decimals,
    provider,
    vaultInfo.extensions.underlyingAsset.address
  )
}
