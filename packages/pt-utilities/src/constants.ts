/**
 * Network IDs
 */
export const NETWORK = Object.freeze({
  'mainnet': 1,
  'goerli': 5,
  'bsc': 56,
  'bsc-testnet': 97,
  'xdai': 100,
  'polygon': 137,
  'mumbai': 80001,
  'optimism': 10,
  'optimism-goerli': 420,
  'avalanche': 43114,
  'fuji': 43113,
  'celo': 42220,
  'celo-testnet': 44787,
  'arbitrum': 42161,
  'arbitrum-goerli': 421613
})
export type NETWORK_NAME = keyof typeof NETWORK
export type NETWORK_ID = typeof NETWORK[NETWORK_NAME]

/**
 * Multicall contract addresses
 */
export const MULTICALL = Object.freeze({
  [NETWORK.mainnet]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [NETWORK.bsc]: '0xc50f4c1e81c873b2204d7eff7069ffec6fbe136d',
  [NETWORK.polygon]: '0x275617327c958bd06b5d6b871e7f491d76113dd8',
  [NETWORK.optimism]: '0xeaa6877139d436dc6d1f75f3af15b74662617b2c',
  [NETWORK.avalanche]: '0xed386fe855c1eff2f843b910923dd8846e45c5a4',
  [NETWORK.arbitrum]: '0x842ec2c7d803033edf55e478f461fc547bc54eb2'
})
export type MULTICALL_NETWORK = keyof typeof MULTICALL

/**
 * POOL token addresses
 */
export const POOL_TOKEN_ADDRESSES = Object.freeze({
  [NETWORK.mainnet]: '0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e',
  [NETWORK.polygon]: '0x25788a1a171ec66Da6502f9975a15B609fF54CF6',
  [NETWORK.optimism]: '0x395ae52bb17aef68c2888d941736a71dc6d4e125'
})

/**
 * Second constants
 */
export const SECONDS_PER_MINUTE = 60
export const SECONDS_PER_HOUR = 3_600
export const SECONDS_PER_DAY = 86_400
export const SECONDS_PER_YEAR = 31_536_000

/**
 * Minute constants
 */
export const MINUTES_PER_HOUR = 60
export const MINUTES_PER_DAY = 1_440

/**
 * CoinGecko API URL
 */
export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'

/**
 * CoinGecko platform IDs
 */
export const COINGECKO_PLATFORMS = Object.freeze({
  [NETWORK.mainnet]: 'ethereum',
  [NETWORK.goerli]: 'goerli',
  [NETWORK.bsc]: 'binance-smart-chain',
  [NETWORK.xdai]: 'xdai',
  [NETWORK.polygon]: 'polygon-pos',
  [NETWORK.mumbai]: 'mumbai',
  [NETWORK.optimism]: 'optimistic-ethereum',
  [NETWORK['optimism-goerli']]: 'optimistic-ethereum',
  [NETWORK.avalanche]: 'avalanche',
  [NETWORK.celo]: 'celo',
  [NETWORK.arbitrum]: 'arbitrum-one'
})
export type COINGECKO_PLATFORM = keyof typeof COINGECKO_PLATFORMS

/**
 * CoinGecko native token IDs
 */
export const COINGECKO_NATIVE_TOKEN_IDS: Record<NETWORK_ID, string> = Object.freeze({
  [NETWORK.mainnet]: 'ethereum',
  [NETWORK.goerli]: 'ethereum',
  [NETWORK.bsc]: 'binancecoin',
  [NETWORK['bsc-testnet']]: 'binancecoin',
  [NETWORK.xdai]: 'xdai',
  [NETWORK.polygon]: 'matic-network',
  [NETWORK.mumbai]: 'matic-network',
  [NETWORK.optimism]: 'ethereum',
  [NETWORK['optimism-goerli']]: 'ethereum',
  [NETWORK.avalanche]: 'avalanche-2',
  [NETWORK.fuji]: 'avalanche-2',
  [NETWORK.celo]: 'celo',
  [NETWORK['celo-testnet']]: 'celo',
  [NETWORK.arbitrum]: 'ethereum',
  [NETWORK['arbitrum-goerli']]: 'ethereum'
})
