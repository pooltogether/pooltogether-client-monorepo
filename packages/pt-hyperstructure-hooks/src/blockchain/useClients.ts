import { PublicClient } from 'viem'
import { usePublicClient } from 'wagmi'
import { useIsTestnets } from 'pt-generic-hooks'
import { NETWORK } from 'pt-utilities'

/**
 * Returns Viem clients
 * @returns
 */
export const usePublicClients = (): PublicClient[] => {
  const { isTestnets } = useIsTestnets()

  const publicClients: { mainnets: PublicClient[]; testnets: PublicClient[] } = {
    mainnets: [
      usePublicClient({ chainId: NETWORK.mainnet }),
      usePublicClient({ chainId: NETWORK.polygon }),
      usePublicClient({ chainId: NETWORK.optimism }),
      usePublicClient({ chainId: NETWORK.arbitrum })
    ],
    testnets: [usePublicClient({ chainId: NETWORK.mumbai })]
  }

  if (isTestnets) {
    return publicClients.testnets
  }

  return publicClients.mainnets
}

/**
 * Returns Viem clients keyed by chain
 * @returns
 */
export const usePublicClientsByChain = (): Record<number, PublicClient> => {
  const { isTestnets } = useIsTestnets()

  const publicClients: {
    mainnets: { [chainId: number]: PublicClient }
    testnets: { [chainId: number]: PublicClient }
  } = {
    mainnets: {
      [NETWORK.mainnet]: usePublicClient({ chainId: NETWORK.mainnet }),
      [NETWORK.polygon]: usePublicClient({ chainId: NETWORK.polygon }),
      [NETWORK.optimism]: usePublicClient({ chainId: NETWORK.optimism }),
      [NETWORK.arbitrum]: usePublicClient({ chainId: NETWORK.arbitrum })
    },
    testnets: {
      [NETWORK.mumbai]: usePublicClient({ chainId: NETWORK.mumbai })
    }
  }

  if (isTestnets) {
    return publicClients.testnets
  }

  return publicClients.mainnets
}