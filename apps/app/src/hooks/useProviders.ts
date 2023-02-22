import { providers } from 'ethers'
import { NETWORK } from 'pt-utilities'
import { useProvider } from 'wagmi'

/**
 * Returns providers for all SUPPORTED_NETWORKS
 * @returns
 */
export const useProviders = (): providers.Provider[] => {
  // TODO: need a better way to get providers for all SUPPORTED_NETWORKS
  const ethProvider = useProvider({ chainId: NETWORK.mainnet })
  const polyProvider = useProvider({ chainId: NETWORK.polygon })
  const opProvider = useProvider({ chainId: NETWORK.optimism })
  const arbProvider = useProvider({ chainId: NETWORK.arbitrum })
  const providers = [ethProvider, polyProvider, opProvider, arbProvider]
  return providers
}
