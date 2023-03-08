import { providers } from 'ethers'
import { useProvider } from 'wagmi'
import { useIsTestnets } from 'pt-generic-hooks'
import { NETWORK } from 'pt-utilities'

/**
 * Returns providers for SUPPORTED_NETWORKS
 * @returns
 */
export const useProviders = (): providers.Provider[] => {
  const { isTestnets } = useIsTestnets()

  const providers: { mainnets: providers.Provider[]; testnets: providers.Provider[] } = {
    mainnets: [
      useProvider({ chainId: NETWORK.mainnet }),
      useProvider({ chainId: NETWORK.polygon }),
      useProvider({ chainId: NETWORK.optimism }),
      useProvider({ chainId: NETWORK.arbitrum })
    ],
    testnets: [
      useProvider({ chainId: NETWORK.goerli }),
      useProvider({ chainId: NETWORK.sepolia }),
      useProvider({ chainId: NETWORK.mumbai }),
      useProvider({ chainId: NETWORK['optimism-goerli'] }),
      useProvider({ chainId: NETWORK['arbitrum-goerli'] })
    ]
  }

  if (isTestnets) {
    return providers.testnets
  }

  return providers.mainnets
}
