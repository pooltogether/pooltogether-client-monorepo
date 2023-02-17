import { VaultInfoWithBalance, VaultList } from 'pt-types'
import { getAllUserVaultBalances, NETWORK } from 'pt-utilities'
import { useQuery, UseQueryResult } from 'react-query'
import { useProvider } from 'wagmi'
import { QUERY_KEYS } from '../constants'

export const useAllUserVaultBalances = (
  userAddress: string,
  vaultList: VaultList
): UseQueryResult<{ [vaultId: string]: VaultInfoWithBalance }, unknown> => {
  // TODO: need a better way to get providers from all SUPPORTED_NETWORKS
  const ethProvider = useProvider({ chainId: NETWORK.mainnet })
  const polyProvider = useProvider({ chainId: NETWORK.polygon })
  const opProvider = useProvider({ chainId: NETWORK.optimism })
  const arbProvider = useProvider({ chainId: NETWORK.arbitrum })
  const providers = [ethProvider, polyProvider, opProvider, arbProvider]

  const enabled = providers.every((provider) => !!provider)

  return useQuery(
    [QUERY_KEYS.allUserVaultBalances],
    async () => {
      const vaultBalances = getAllUserVaultBalances(providers, userAddress, vaultList)
      return vaultBalances
    },
    {
      enabled
    }
  )
}
