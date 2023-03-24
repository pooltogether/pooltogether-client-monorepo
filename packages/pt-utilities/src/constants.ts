import { getVaultListId } from './utils/vaults'
import { defaultVaultList } from './vaultLists/defaultVaultList'

/**
 * Network IDs
 */
export enum NETWORK {
  'mainnet' = 1,
  'goerli' = 5,
  'sepolia' = 11155111,
  'bsc' = 56,
  'bsc-testnet' = 97,
  'xdai' = 100,
  'polygon' = 137,
  'mumbai' = 80001,
  'optimism' = 10,
  'optimism-goerli' = 420,
  'avalanche' = 43114,
  'fuji' = 43113,
  'celo' = 42220,
  'celo-testnet' = 44787,
  'arbitrum' = 42161,
  'arbitrum-goerli' = 421613
}
export type NETWORK_NAME = keyof typeof NETWORK

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
  [NETWORK.bsc]: 'binance-smart-chain',
  [NETWORK.xdai]: 'xdai',
  [NETWORK.polygon]: 'polygon-pos',
  [NETWORK.optimism]: 'optimistic-ethereum',
  [NETWORK.avalanche]: 'avalanche',
  [NETWORK.celo]: 'celo',
  [NETWORK.arbitrum]: 'arbitrum-one'
})
export type COINGECKO_PLATFORM = keyof typeof COINGECKO_PLATFORMS

/**
 * CoinGecko native token IDs
 */
export const COINGECKO_NATIVE_TOKEN_IDS: Record<NETWORK, string> = Object.freeze({
  [NETWORK.mainnet]: 'ethereum',
  [NETWORK.goerli]: 'ethereum',
  [NETWORK.sepolia]: 'ethereum',
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

/**
 * PoolTogether API URL
 */
export const POOLTOGETHER_API_URL = 'https://pooltogether-api.com'

/**
 * Block explorer URLs
 */
export const BLOCK_EXPLORERS: Record<NETWORK, string> = Object.freeze({
  [NETWORK.mainnet]: 'https://etherscan.io/',
  [NETWORK.goerli]: 'https://goerli.etherscan.io/',
  [NETWORK.sepolia]: 'https://sepolia.etherscan.io/',
  [NETWORK.bsc]: 'https://bscscan.com/',
  [NETWORK['bsc-testnet']]: 'https://testnet.bscscan.com/',
  [NETWORK.xdai]: 'https://gnosisscan.io/',
  [NETWORK.polygon]: 'https://polygonscan.com/',
  [NETWORK.mumbai]: 'https://mumbai.polygonscan.com/',
  [NETWORK.optimism]: 'https://optimistic.etherscan.io/',
  [NETWORK['optimism-goerli']]: 'https://goerli-optimism.etherscan.io/',
  [NETWORK.avalanche]: 'https://snowtrace.io/',
  [NETWORK.fuji]: 'https://testnet.snowtrace.io/',
  [NETWORK.celo]: 'https://celoscan.io/',
  [NETWORK['celo-testnet']]: 'https://alfajores.celoscan.io/',
  [NETWORK.arbitrum]: 'https://arbiscan.io/',
  [NETWORK['arbitrum-goerli']]: 'https://goerli.arbiscan.io/'
})

/**
 * Stablecoin addresses
 *
 * NOTE: All addresses are lowercase
 */
export const STABLECOIN_ADDRESSES: Record<NETWORK, string[]> = Object.freeze({
  [NETWORK.mainnet]: [
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
    '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
    '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd' // GUSD
  ],
  [NETWORK.goerli]: [],
  [NETWORK.sepolia]: [],
  [NETWORK.bsc]: [],
  [NETWORK['bsc-testnet']]: [],
  [NETWORK.xdai]: [],
  [NETWORK.polygon]: [],
  [NETWORK.mumbai]: [],
  [NETWORK.optimism]: [],
  [NETWORK['optimism-goerli']]: [],
  [NETWORK.avalanche]: [],
  [NETWORK.fuji]: [],
  [NETWORK.celo]: [],
  [NETWORK['celo-testnet']]: [],
  [NETWORK.arbitrum]: [],
  [NETWORK['arbitrum-goerli']]: []
})

/**
 * Default Vault list ID
 */
export const defaultVaultListId = getVaultListId(defaultVaultList)
