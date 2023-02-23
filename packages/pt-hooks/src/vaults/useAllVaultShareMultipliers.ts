import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { BigNumber, providers } from 'ethers'
import { VaultList } from 'pt-types'
import { getAllVaultShareMultipliers } from 'pt-utilities'
import { QUERY_KEYS } from '../constants'

/**
 * Returns multipliers to calculate 1 share -> X assets in all vaults from a vault list
 * @param readProviders read-capable providers from any chains that should be queried
 * @param vaultList a vault list to query through vaults in
 * @returns
 */
export const useAllVaultShareMultipliers = (
  readProviders: providers.Provider[],
  vaultList: VaultList
): UseQueryResult<{ [vaultId: string]: BigNumber }, unknown> => {
  return useQuery([QUERY_KEYS.allVaultShareMultipliers], async () => {
    const vaultShareMultipliers = await getAllVaultShareMultipliers(readProviders, vaultList)
    return vaultShareMultipliers
  })
}
