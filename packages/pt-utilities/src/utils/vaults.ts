import { VaultList } from 'pt-types'

/**
 * Returns vaults from a vault list that match with a given chain ID
 * @param chainId the chain to filter vaults from
 * @param vaultList a list of vaults
 * @returns
 */
export const getVaultsByChainId = (chainId: number, vaultList: VaultList) => {
  return vaultList.tokens.filter((vault) => vault.chainId === chainId)
}
