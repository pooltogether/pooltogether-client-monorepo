import { BigNumber } from 'ethers'
import { VaultList } from 'pt-types'
import { getAllVaultShareMultipliers, NETWORK } from 'pt-utilities'
import { useQuery, UseQueryResult } from 'react-query'
import { useProvider } from 'wagmi'
import { QUERY_KEYS } from '../constants'

export const useAllVaultShareMultipliers = (
  vaultList: VaultList
): UseQueryResult<{ [vaultId: string]: BigNumber }, unknown> => {
  // TODO: need a better way to get providers from all SUPPORTED_NETWORKS
  const ethProvider = useProvider({ chainId: NETWORK.mainnet })
  const polyProvider = useProvider({ chainId: NETWORK.polygon })
  const opProvider = useProvider({ chainId: NETWORK.optimism })
  const arbProvider = useProvider({ chainId: NETWORK.arbitrum })
  const providers = [ethProvider, polyProvider, opProvider, arbProvider]

  const enabled = providers.every((provider) => !!provider)

  return useQuery(
    [QUERY_KEYS.allVaultShareMultipliers],
    async () => {
      const vaultShareMultipliers = await getAllVaultShareMultipliers(providers, vaultList)
      return vaultShareMultipliers
    },
    {
      enabled
    }
  )
}
