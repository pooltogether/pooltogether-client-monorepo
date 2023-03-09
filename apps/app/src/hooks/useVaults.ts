import { useProvider } from 'wagmi'
import { Vault, Vaults } from 'pt-client-js'
import { VaultInfo } from 'pt-types'
import { getVaultId } from 'pt-utilities'
import defaultVaultList from '@constants/defaultVaultList'
import { useProvidersByChain } from './useProviders'

/**
 * Returns an instance of a `Vaults` class
 * @returns
 */
export const useVaults = (): Vaults => {
  const providers = useProvidersByChain()

  const vaults = new Vaults(defaultVaultList, providers)

  return vaults
}

/**
 * Returns an instance of a `Vault` class
 * @param vaultInfo
 * @returns
 */
export const useVault = (vaultInfo: VaultInfo): Vault => {
  const vaults = useVaults()
  const provider = useProvider({ chainId: vaultInfo.chainId })

  const vaultId = getVaultId(vaultInfo)
  const vault = vaults.vaults[vaultId]

  if (!!vault) {
    return vault
  }

  return new Vault(
    vaultInfo.chainId,
    vaultInfo.address,
    vaultInfo.decimals,
    provider,
    vaultInfo.extensions.underlyingAsset.address
  )
}
