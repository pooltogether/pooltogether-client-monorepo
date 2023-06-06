import { VaultList } from '@pooltogether/types'
import { JSONSchemaType } from 'ajv'

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
  [NETWORK.optimism]: '0x395ae52bb17aef68c2888d941736a71dc6d4e125',
  [NETWORK.sepolia]: '0x7cB28bB4cDbBA6F509D5b9022108138D662042Bf',
  [NETWORK.mumbai]: '0xC138A7C89C357d8FA5A9b7CE775e612b766153e7'
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
 * Prize Pools
 */
export const PRIZE_POOLS: {
  chainId: NETWORK
  address: `0x${string}`
  options: { prizeTokenAddress: `0x${string}`; drawPeriodInSeconds: number; tierShares: number }
}[] = [
  {
    chainId: NETWORK.sepolia,
    address: '0xa77D6014e77F294C3297a18363f9951b3d57Eb95',
    options: {
      prizeTokenAddress: '0x7cB28bB4cDbBA6F509D5b9022108138D662042Bf',
      drawPeriodInSeconds: 43_200,
      tierShares: 100
    }
  },
  {
    chainId: NETWORK.mumbai,
    address: '0xA32C8f94191c9295634f0034eb2b0e2749e77974',
    options: {
      prizeTokenAddress: '0xC138A7C89C357d8FA5A9b7CE775e612b766153e7',
      drawPeriodInSeconds: 43_200,
      tierShares: 100
    }
  }
]

/**
 * Prize Pool Graph API URLs
 */
export const PRIZE_POOL_GRAPH_API_URLS = Object.freeze({
  [NETWORK.sepolia]: 'https://api.studio.thegraph.com/query/41211/v5-prize-pool-eth-sepolia/v0.0.1',
  [NETWORK.mumbai]:
    'https://api.thegraph.com/subgraphs/name/pooltogether/v5-polygon-mumbai-prize-pool'
})

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
 * Block explorer mapping
 */
export const BLOCK_EXPLORERS: Record<NETWORK, { name: string; url: string }> = Object.freeze({
  [NETWORK.mainnet]: { name: 'Etherscan', url: 'https://etherscan.io/' },
  [NETWORK.goerli]: { name: 'Etherscan', url: 'https://goerli.etherscan.io/' },
  [NETWORK.sepolia]: { name: 'Etherscan', url: 'https://sepolia.etherscan.io/' },
  [NETWORK.bsc]: { name: 'BscScan', url: 'https://bscscan.com/' },
  [NETWORK['bsc-testnet']]: { name: 'BscScan', url: 'https://testnet.bscscan.com/' },
  [NETWORK.xdai]: { name: 'GnosisScan', url: 'https://gnosisscan.io/' },
  [NETWORK.polygon]: { name: 'PolygonScan', url: 'https://polygonscan.com/' },
  [NETWORK.mumbai]: { name: 'PolygonScan', url: 'https://mumbai.polygonscan.com/' },
  [NETWORK.optimism]: { name: 'Etherscan', url: 'https://optimistic.etherscan.io/' },
  [NETWORK['optimism-goerli']]: { name: 'Etherscan', url: 'https://goerli-optimism.etherscan.io/' },
  [NETWORK.avalanche]: { name: 'Snowtrace', url: 'https://snowtrace.io/' },
  [NETWORK.fuji]: { name: 'Snowtrace', url: 'https://testnet.snowtrace.io/' },
  [NETWORK.celo]: { name: 'CeloScan', url: 'https://celoscan.io/' },
  [NETWORK['celo-testnet']]: { name: 'CeloScan', url: 'https://alfajores.celoscan.io/' },
  [NETWORK.arbitrum]: { name: 'ArbiScan', url: 'https://arbiscan.io/' },
  [NETWORK['arbitrum-goerli']]: { name: 'ArbiScan', url: 'https://goerli.arbiscan.io/' }
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
  [NETWORK.sepolia]: [
    '0x501b79e61843b3432e5b48d59cb7e6a93185e50c', // DAI
    '0x1977822061d8a394726803e2c2f6524a4e3e7aff', // USDC
    '0xa577c58435e0334b5039f5e71ccb4a45641c3495' // GUSD
  ],
  [NETWORK.bsc]: [],
  [NETWORK['bsc-testnet']]: [],
  [NETWORK.xdai]: [],
  [NETWORK.polygon]: [],
  [NETWORK.mumbai]: [
    '0x2990cf846ec4738a672273df204cd93196d98d5f', // DAI
    '0xa7e7dc95b2cf9311c8be9a96e8e111ccf0408add', // USDC
    '0x0e3ca10c2e675ee8a93a1331d54981d99107e6e8' // GUSD
  ],
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
 * Hardcoded testnet token prices
 *
 * NOTE: All addresses are lowercase
 */
export const TESTNET_TOKEN_PRICES = Object.freeze({
  [NETWORK.sepolia]: {
    '0x501b79e61843b3432e5b48d59cb7e6a93185e50c': { eth: 0.00052681 }, // DAI
    '0x1977822061d8a394726803e2c2f6524a4e3e7aff': { eth: 0.0005265 }, // USDC
    '0xa577c58435e0334b5039f5e71ccb4a45641c3495': { eth: 0.00052792 }, // GUSD
    '0x3bd2312250c67ca96c442fe8490a27d24d70e41c': { eth: 15.450051 }, // WBTC
    '0xa4de6eb323dd2f8a8b4d07b6b295dc57bb1de30a': { eth: 0.99838028 }, // WETH
    '0x7cb28bb4cdbba6f509d5b9022108138d662042bf': { eth: 0.00045293 } // POOL
  },
  [NETWORK.mumbai]: {
    '0x2990cf846ec4738a672273df204cd93196d98d5f': { eth: 0.00052681 }, // DAI
    '0xa7e7dc95b2cf9311c8be9a96e8e111ccf0408add': { eth: 0.0005265 }, // USDC
    '0x0e3ca10c2e675ee8a93a1331d54981d99107e6e8': { eth: 0.00052792 }, // GUSD
    '0x14e8733e7f178c77ed99faa08bbf042100da4268': { eth: 15.450051 }, // WBTC
    '0x5617889c4030db7c3fad0e4a015460e0430b454c': { eth: 0.99838028 }, // WETH
    '0xc138a7c89c357d8fa5a9b7ce775e612b766153e7': { eth: 0.00045293 } // POOL
  }
})

/**
 * Vault list schema
 */
export const VAULT_LIST_SCHEMA: JSONSchemaType<VaultList> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    version: {
      type: 'object',
      properties: {
        major: { type: 'integer' },
        minor: { type: 'integer' },
        patch: { type: 'integer' }
      },
      required: ['major', 'minor', 'patch']
    },
    timestamp: { type: 'string' },
    tokens: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          chainId: { type: 'integer' },
          address: { type: 'string' },
          name: { type: 'string', nullable: true },
          decimals: { type: 'integer', nullable: true },
          symbol: { type: 'string', nullable: true },
          extensions: {
            type: 'object',
            properties: {
              underlyingAsset: {
                type: 'object',
                properties: {
                  address: { type: 'string', nullable: true },
                  symbol: { type: 'string', nullable: true },
                  name: { type: 'string', nullable: true },
                  logoURI: { type: 'string', nullable: true }
                },
                nullable: true
              }
            },
            nullable: true
          },
          tags: { type: 'array', items: { type: 'string' }, nullable: true },
          logoURI: { type: 'string', nullable: true }
        },
        required: ['chainId', 'address']
      }
    },
    keywords: { type: 'array', items: { type: 'string' }, nullable: true },
    tags: { type: 'object', properties: {}, required: [], nullable: true },
    logoURI: { type: 'string', nullable: true }
  },
  required: ['name', 'version', 'timestamp', 'tokens']
}

/**
 * Max uint256 value
 */
export const MAX_UINT_256 = 2n ** 256n - 1n
