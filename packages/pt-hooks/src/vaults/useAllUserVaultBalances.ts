import { providers } from 'ethers'
import { VaultInfoWithBalance, VaultList } from 'pt-types'
import { getAllUserVaultBalances } from 'pt-utilities'
import { useQuery, UseQueryResult } from 'react-query'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a user's share balance in all vaults from a vault list
 * @param readProviders read-capable providers from any chains that should be queried
 * @param userAddress a user's address to check balances for
 * @param vaultList a vault list to check balances in
 * @returns
 */
export const useAllUserVaultBalances = (
  readProviders: providers.Provider[],
  userAddress: string,
  vaultList: VaultList
): UseQueryResult<{ [vaultId: string]: VaultInfoWithBalance }, unknown> => {
  return useQuery([QUERY_KEYS.allUserVaultBalances], async () => {
    const vaultBalances = await getAllUserVaultBalances(readProviders, userAddress, vaultList)
    return vaultBalances
  })
}
