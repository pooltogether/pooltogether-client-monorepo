import { NETWORK } from 'pt-utilities'

/**
 * Supported networks
 */
export const SUPPORTED_NETWORKS = Object.freeze({
  mainnets: [NETWORK.mainnet, NETWORK.polygon, NETWORK.optimism, NETWORK.arbitrum],
  testnets: [NETWORK.goerli, NETWORK.mumbai, NETWORK['optimism-goerli'], NETWORK['arbitrum-goerli']]
})
