import { NETWORK } from 'pt-utilities'

/**
 * Supported networks
 */
export const SUPPORTED_NETWORKS = Object.freeze({
  mainnets: [NETWORK.mainnet, NETWORK.polygon, NETWORK.optimism, NETWORK.arbitrum],
  testnets: [NETWORK.goerli, NETWORK.mumbai, NETWORK['optimism-goerli'], NETWORK['arbitrum-goerli']]
})

/**
 * Stablecoin symbols
 */
export const STABLECOIN_SYMBOLS = Object.freeze(['USDC', 'DAI', 'GUSD'])

/**
 * Prize Pools
 */
export const PRIZE_POOLS = Object.freeze({
  [NETWORK.goerli]: '0x29A2C67a6F3bEF9c77B59B135E528d8A49b9b1F1'
})
