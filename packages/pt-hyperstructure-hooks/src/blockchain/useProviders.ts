import { providers } from 'ethers'
import { useProvider } from 'wagmi'
import { useIsTestnets } from 'pt-generic-hooks'
import { NETWORK } from 'pt-utilities'

/**
 * Returns providers
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

/**
 * Returns providers keyed by chain
 * @returns
 */
export const useProvidersByChain = (): { [chainId: number]: providers.Provider } => {
  const { isTestnets } = useIsTestnets()

  const providers: {
    mainnets: { [chainId: number]: providers.Provider }
    testnets: { [chainId: number]: providers.Provider }
  } = {
    mainnets: {
      [NETWORK.mainnet]: useProvider({ chainId: NETWORK.mainnet }),
      [NETWORK.polygon]: useProvider({ chainId: NETWORK.polygon }),
      [NETWORK.optimism]: useProvider({ chainId: NETWORK.optimism }),
      [NETWORK.arbitrum]: useProvider({ chainId: NETWORK.arbitrum })
    },
    testnets: {
      [NETWORK.goerli]: useProvider({ chainId: NETWORK.goerli }),
      [NETWORK.sepolia]: useProvider({ chainId: NETWORK.sepolia }),
      [NETWORK.mumbai]: useProvider({ chainId: NETWORK.mumbai }),
      [NETWORK['optimism-goerli']]: useProvider({ chainId: NETWORK['optimism-goerli'] }),
      [NETWORK['arbitrum-goerli']]: useProvider({ chainId: NETWORK['arbitrum-goerli'] })
    }
  }

  if (isTestnets) {
    return providers.testnets
  }

  return providers.mainnets
}
