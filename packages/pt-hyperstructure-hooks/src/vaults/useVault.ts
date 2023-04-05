import { useProvider } from 'wagmi'
import { Vault } from 'pt-client-js'
import { VaultInfo } from 'pt-types'

/**
 * Returns an instance of a `Vault` class
 * @param vaultInfo a vault's info
 * @returns
 */
export const useVault = (vaultInfo: VaultInfo): Vault => {
  const provider = useProvider({ chainId: vaultInfo.chainId })

  return new Vault(vaultInfo.chainId, vaultInfo.address, provider, {
    decimals: vaultInfo.decimals,
    tokenAddress: vaultInfo.extensions?.underlyingAsset?.address
  })
}
