import { useProvider } from 'wagmi'
import { Vault, Vaults } from 'pt-client-js'
import { VaultInfo, VaultList } from 'pt-types'
import { useProvidersByChain } from '../blockchain/useProviders'

/**
 * Returns an instance of a `Vaults` class
 * @returns
 */
export const useVaults = (vaultList: VaultList): Vaults => {
  const providers = useProvidersByChain()

  const vaults = new Vaults(vaultList, providers)

  return vaults
}

/**
 * Returns an instance of a `Vault` class
 * @param vaultInfo
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
